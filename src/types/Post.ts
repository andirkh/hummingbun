type Post = {
  title: string;
  date: string;
  slug: string;
  body: string;
  description: string;
  image: string;
  authorAvatar: string;
  categories: string[];
  tags: string[];
  readingTime: number;
  isPage: boolean;
  island?: string;
  menuName?: string;
  menuWeight?: number;
};

export type { Post };