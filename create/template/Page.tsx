import Head from './Head';
import type { PageProps } from 'hummingbun';

function Page({
  title,
  description,
  site,
  canonicalUrl,
  imageUrl,
  pageType,
  publishedTime,
  children,
}: PageProps) {
  return (
    <html lang={site.language || 'en'}>
      <head>
        <Head
          title={title}
          description={description}
          site={site}
          canonicalUrl={canonicalUrl}
          imageUrl={imageUrl}
          pageType={pageType}
          publishedTime={publishedTime}
        />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/main.css" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <header class="site-header">
          <div class="site-header-content">
            <a href="/" class="site-title">
              {site.title}
            </a>
            <p class="site-subtitle">{site.subtitle}</p>
          </div>
        </header>
        {children}
        <footer class="site-footer">
          <p>{site.copyright}</p>
        </footer>
      </body>
    </html>
  );
}

export default Page;
