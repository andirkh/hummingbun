import type { Post } from "./Post";
import type { SiteConfig } from "./SiteConfig";

type PostListProps = {
  site: SiteConfig;
  title: string;
  posts: Post[];
  page: number;
  totalPages: number;
  basePath: string;
  canonicalUrl: string;
};

export type { PostListProps };