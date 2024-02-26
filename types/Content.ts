type PostType = 'post';
type PageType = 'page';

interface Content {
  content: string;
  title: string;
  date: Date;
  author: string;
  categories: string[];
  slug: string;
  image: string;
  draft: boolean;
  type: PostType | PageType
}

export type { Content, PostType, PageType }