type SiteConfig = {
  title: string;
  subtitle: string;
  description: string;
  copyright: string;
  orgName: string;
  authorAvatar: string;
  authorName: string;
  authorUrl: string;
  language: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
  rssUrl?: string;
  menu: { name: string; url: string }[];
  pageSize: number;
  siteUrl: string;

  contentDir: string;
  staticDir: string;
  distributionDir: string;
  kinuStylesheetPath: string;
  stylesheetPath: string;
  islandEntrypoints?: string[];
};

export type { SiteConfig };