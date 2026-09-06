import { write } from 'bun';
import { escapeXml, toISODate } from './helpers/helpers';
import type { Post, SiteConfig } from './types';

async function buildSitemap({
  site,
  posts,
  categoryNames,
  tagNames,
}: {
  site: SiteConfig;
  posts: Post[];
  categoryNames: string[];
  tagNames: string[];
}) {
  const urls: {
    loc: string;
    lastmod?: string;
    changefreq: string;
    priority: string;
  }[] = [];
  // homepage
  urls.push({ loc: `${site.siteUrl}/`, changefreq: 'daily', priority: '1.0' });
  // each post
  for (const post of posts) {
    urls.push({
      loc: `${site.siteUrl}/${post.slug}.html`,
      lastmod: toISODate(post.date),
      changefreq: 'monthly',
      priority: '0.8',
    });
  }
  // category pages
  urls.push({
    loc: `${site.siteUrl}/categories/`,
    changefreq: 'weekly',
    priority: '0.5',
  });
  for (const name of categoryNames) {
    urls.push({
      loc: `${site.siteUrl}/categories/${name}/`,
      changefreq: 'weekly',
      priority: '0.5',
    });
  }
  // tag pages
  urls.push({
    loc: `${site.siteUrl}/tags/`,
    changefreq: 'weekly',
    priority: '0.5',
  });
  for (const name of tagNames) {
    urls.push({
      loc: `${site.siteUrl}/tags/${name}/`,
      changefreq: 'weekly',
      priority: '0.5',
    });
  }
  const xmlBody = urls
    .map((url) => {
      const lastmod = url.lastmod
        ? `\n    <lastmod>${escapeXml(url.lastmod)}</lastmod>`
        : '';
      return `  <url>\n    <loc>${escapeXml(url.loc)}</loc>${lastmod}\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlBody}\n</urlset>\n`;
  await write(`${site.distributionDir}/sitemap.xml`, xml);
}

export default buildSitemap;
