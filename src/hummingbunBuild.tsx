import { Glob, TOML, YAML, markdown, write, file } from 'bun';
import render from 'preact-render-to-string';
import type { Post, SiteConfig, TemplateConfig } from './types';
import { stripHtml, toArray, toBoolean } from './helpers/helpers';
import writePaginated from './writePaginated';
import buildTaxonomy from './buildTaxonomy';
import buildSitemap from './buildSitemap';
import buildRobotsTxt from './buildRobotsTxt';

async function hummingbunBuild(site: SiteConfig, templates: TemplateConfig) {
  const buildStartedAt = performance.now();

  const glob = new Glob('**/*.md');
  const posts: Post[] = [];
  const pages: Post[] = [];

  for await (const path of glob.scan(site.contentDir)) {
    const raw = await file(`${site.contentDir}/${path}`).text();
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) continue;
    const frontMatter = match[1] as string;
    const fm = (
      frontMatter.includes('=')
        ? TOML.parse(frontMatter)
        : YAML.parse(frontMatter)
    ) as Record<string, unknown>;
    if (toBoolean(fm.draft)) continue;
    const body = markdown.html(match[2] as string);
    const slug = path.replace(/\.md$/, '');
    const title = String(fm.title || slug);
    const words = stripHtml(body).split(/\s+/).filter(Boolean).length;
    const categories = toArray(fm.category ?? fm.categories);
    const tags = toArray(fm.tags);
    const entry: Post = {
      title,
      date: String(fm.date ?? ''),
      slug,
      body,
      description: String(fm.description ?? ''),
      image: String(fm.image ?? ''),
      authorAvatar: String(fm.authorAvatar ?? site.authorAvatar),
      categories,
      tags,
      readingTime: Math.max(1, Math.ceil(words / 200)),
      isPage: fm.type === 'page',
      island: typeof fm.island === 'string' ? fm.island : undefined,
      menuName: fm.menu === 'main' ? title : undefined,
      menuWeight: typeof fm.weight === 'number' ? fm.weight : undefined,
    };
    if (entry.isPage) {
      pages.push(entry);
    } else {
      posts.push(entry);
    }
  }

  site.menu.push(
    ...pages
      .filter((page) => page.menuName)
      .sort((a, b) => (b.menuWeight ?? 0) - (a.menuWeight ?? 0))
      .map((page) => ({
        name: page.menuName as string,
        url: `/${page.slug}.html`,
      })),
  );

  // ---------- 2. Sort newest first ----------
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  pages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  for (let index = 0; index < posts.length; index++) {
    const post = posts[index] as Post;
    const html =
      '<!doctype html>' +
      render(
        <templates.PostTemplate
          site={site}
          post={post}
          previous={posts[index + 1]}
          next={posts[index - 1]}
        />,
      );
    await write(`${site.distributionDir}/${post.slug}.html`, html);
  }

  for (const page of pages) {
    const html =
      '<!doctype html>' +
      render(<templates.PostTemplate site={site} post={page} />);
    await write(`${site.distributionDir}/${page.slug}.html`, html);
  }

  // ---------- 3. Main paginated index ----------
  await writePaginated({
    site,
    templates,
    basePath: '',
    title: 'Posts',
    items: posts,
  });

  // ---------- 4. Category & tag pages, paginated ----------
  const categoryNames = await buildTaxonomy({
    site,
    templates,
    posts,
    label: 'categories',
    key: 'categories',
  });

  const tagNames = await buildTaxonomy({
    site,
    templates,
    posts,
    label: 'tags',
    key: 'tags',
  });

  await write(
    `${site.distributionDir}/404.html`,
    '<!doctype html>' + render(<templates.NotFoundTemplate site={site} />),
  );

  // ---------- 5. Build Sitemap ----------
  await buildSitemap({ site, posts, categoryNames, tagNames });
  await buildRobotsTxt({ site });

  // ---------- 6. Copy static assets and Kinu styles ----------
  const staticGlob = new Glob('**/*');
  for await (const path of staticGlob.scan(site.staticDir)) {
    const src = file(`${site.staticDir}/${path}`);
    if (await src.exists()) {
      await write(`${site.distributionDir}/${path}`, src);
    }
  }

  const styleSheets = [
    await file(site.kinuStylesheetPath).text(),
    await file(site.stylesheetPath).text(),
  ].join('\n');

  await write(`${site.distributionDir}/styles.css`, styleSheets);

  for (const entrypoint of site.islandEntrypoints ?? []) {
    const islandBuild = await Bun.build({
      entrypoints: [entrypoint],
      outdir: site.distributionDir,
      naming: `${entrypoint
        .split('/')
        .pop()
        ?.replace(/\.tsx?$/, '')}.js`,
      target: 'browser',
      minify: true,
    });

    if (!islandBuild.success) {
      throw new Error(islandBuild.logs.map((log) => log.message).join('\n'));
    }
  }

  const buildDurationMs = performance.now() - buildStartedAt;
  console.log(`Build completed in ${(buildDurationMs / 1000).toFixed(2)}s`);
}

export default hummingbunBuild;
