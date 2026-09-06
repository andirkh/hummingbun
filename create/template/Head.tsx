import type { PageProps } from 'hummingbun';

function Head({
  title,
  description,
  site,
  canonicalUrl = site.siteUrl,
  imageUrl,
  pageType = 'website',
  publishedTime,
}: Pick<
  PageProps,
  | 'title'
  | 'description'
  | 'site'
  | 'canonicalUrl'
  | 'imageUrl'
  | 'pageType'
  | 'publishedTime'
>) {
  const isHome =
    canonicalUrl === site.siteUrl || canonicalUrl === `${site.siteUrl}/`;
  const pageTitle = isHome ? site.title : `${title} · ${site.title}`;
  const pageDescription = description || site.description;
  const socialImage = imageUrl || `${site.siteUrl}/favicon.png`;

  const structuredData =
    pageType === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description: pageDescription,
          image: socialImage,
          datePublished: publishedTime,
          author: { '@type': 'Person', name: site.authorName },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: site.title,
          url: site.siteUrl,
        };

  return (
    <>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="author" content={site.authorName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={socialImage} />
      <meta
        property="og:type"
        content={pageType === 'article' ? 'article' : 'website'}
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={socialImage} />
      <link rel="canonical" href={canonicalUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

export default Head;
