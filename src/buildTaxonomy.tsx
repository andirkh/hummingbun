import render from 'preact-render-to-string';

import type { Post, SiteConfig, TemplateConfig } from './types';
import { write } from 'bun';
import writePaginated from './writePaginated';

async function buildTaxonomy({
  site,
  templates,
  posts,
  label,
  key,
}: {
  site: SiteConfig;
  templates: TemplateConfig;
  posts: Post[];
  label: 'categories' | 'tags';
  key: 'categories' | 'tags';
}) {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const name of post[key]) {
      if (!map.has(name)) map.set(name, []);
      map.get(name)!.push(post);
    }
  }
  for (const [name, group] of map) {
    await writePaginated({
      site,
      templates,
      basePath: `${label}/${name}`,
      title: name,
      items: group,
    });
  }

  const names = [...map.keys()].sort();

  const indexHtml =
    '<!doctype html>' +
    render(
      <templates.TaxonomyTemplate
        site={site}
        label={label}
        names={[...map.keys()].sort()}
      />,
    );
  await write(`${site.distributionDir}/${label}/index.html`, indexHtml);

  return names;
}

export default buildTaxonomy;
