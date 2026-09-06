import type { ComponentChildren } from "preact";
import type { SiteConfig } from "./SiteConfig";

type PageProps = {
  title: string;
  description?: string;
  site: SiteConfig;
  canonicalUrl?: string;
  imageUrl?: string;
  pageType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
  hasTimerIsland?: boolean;
  children: ComponentChildren;
};

export type { PageProps };