import { Prose, Badge } from 'kinu';
import { absoluteUrl, excerpt, toISODate } from 'hummingbun';
import type { Post, SiteConfig } from 'hummingbun';
import Page from './Page';

function PostPage({ site, post }: { site: SiteConfig; post: Post }) {
  return (
    <Page
      title={post.title}
      description={post.description || excerpt(post)}
      site={site}
      canonicalUrl={absoluteUrl(`${post.slug}.html`, site.siteUrl)}
      imageUrl={absoluteUrl('/favicon.png', site.siteUrl)}
      pageType={post.isPage ? 'website' : 'article'}
      publishedTime={toISODate(post.date)}
    >
      <main class="site-main">
        <article class="post">
          <header class="post-header">
            <div class="post-tags">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
            <h1 class="post-title">{post.title}</h1>
            <div class="post-meta">
              <time datetime={toISODate(post.date)}>
                {toISODate(post.date)}
              </time>
            </div>
          </header>
          <Prose
            class="post-content"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
        <nav class="post-nav">
          <a href="/" class="nav-link">
            ← Back to Home
          </a>
        </nav>
      </main>
    </Page>
  );
}

export default PostPage;
