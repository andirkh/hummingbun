import type { SiteConfig } from 'hummingbun';
import Page from './Page';

function NotFoundPage({ site }: { site: SiteConfig }) {
  return (
    <Page
      title="Not Found"
      description="The page you're looking for doesn't exist."
      site={site}
      canonicalUrl={`${site.siteUrl}/404.html`}
    >
      <main class="site-main">
        <div class="not-found">
          <h1>404</h1>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/" class="cta-button">
            Go back home
          </a>
        </div>
      </main>
    </Page>
  );
}

export default NotFoundPage;
