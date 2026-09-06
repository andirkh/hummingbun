import type { Post } from "./Post";
import type { SiteConfig } from "./SiteConfig";

type PostPageProps = {
  site: SiteConfig;
  post: Post;
  previous?: Post;
  next?: Post;
};

export type { PostPageProps };