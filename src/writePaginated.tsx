import render from 'preact-render-to-string';

import { absoluteUrl, joinPath } from './helpers/helpers';
import type { Post, SiteConfig, TemplateConfig } from './types';
import { write } from 'bun';

async function writePaginated({
  site,
  templates,
  basePath,
  title,
  items,
}: {
  site: SiteConfig;
  templates: TemplateConfig;
  basePath: string;
  title: string;
  items: Post[];
}) {
  const totalPages = Math.max(1, Math.ceil(items.length / site.pageSize));
  for (let page = 1; page <= totalPages; page++) {
    const slice = items.slice((page - 1) * site.pageSize, page * site.pageSize);
    const pagePath =
      page === 1
        ? basePath
          ? joinPath(basePath, 'index.html')
          : '/'
        : joinPath(basePath, 'page', `${page}.html`);
    const html =
      '<!doctype html>' +
      render(
        <templates.PostListTemplate
          site={site}
          title={title}
          posts={slice}
          page={page}
          totalPages={totalPages}
          basePath={basePath}
          canonicalUrl={absoluteUrl(pagePath, site.siteUrl)}
        />,
      );
    const outPath =
      page === 1
        ? `${site.distributionDir}/${basePath}/index.html`
        : `${site.distributionDir}/${basePath}/page/${page}.html`;
    await write(outPath, html);
  }
}

export default writePaginated;
