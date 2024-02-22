interface Content {
  content: string;
  title: string;
  date: Date;
  author: string;
  categories: string[];
  slug: string;
  image: string;
  draft: boolean;
  type: 'post' | 'pages'
}

export type { Content }