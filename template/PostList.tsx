import type { Post, SiteConfig } from 'hummingbun';
import Page from './Page';

function PostList({
  site,
  title,
  posts,
  canonicalUrl,
}: {
  site: SiteConfig;
  title: string;
  posts: Post[];
  page: number;
  totalPages: number;
  basePath: string;
  canonicalUrl: string;
}) {
  return (
    <Page title={title} site={site} canonicalUrl={canonicalUrl}>
      <main class="site-main">
        <div class="post-list">
          {posts.map((post) => (
            <article key={post.slug} class="post-card">
              <header class="post-card-header">
                <a href={`/${post.slug}.html`} class="post-card-link">
                  <h2 class="post-card-title">{post.title}</h2>
                </a>
                <div class="post-card-meta">
                  <time datetime={post.date}>{post.date}</time>
                </div>
              </header>
              <p class="post-card-excerpt">
                {post.description || post.body.substring(0, 160)}
              </p>
              <a href={`/${post.slug}.html`} class="post-card-read-more">
                Read more →
              </a>
            </article>
          ))}
        </div>
      </main>
    </Page>
  );
}

export default PostList;
