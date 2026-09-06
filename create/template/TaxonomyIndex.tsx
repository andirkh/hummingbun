import type { SiteConfig, TaxonomyIndexProps } from 'hummingbun';
import Page from './Page';

function TaxonomyIndex({ site, label, names }: TaxonomyIndexProps) {
  return (
    <Page
      title={`${label} - Tags`}
      description={`Browse posts by ${label}`}
      site={site}
      canonicalUrl={`${site.siteUrl}/${label}/`}
    >
      <main class="site-main">
        <h1 class="taxonomy-title">{label}</h1>
        <div class="taxonomy-list">
          {names.map((name) => (
            <a key={name} href={`/${label}/${name}/`} class="taxonomy-item">
              {name}
            </a>
          ))}
        </div>
      </main>
    </Page>
  );
}

export default TaxonomyIndex;
