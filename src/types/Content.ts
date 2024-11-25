import type { Page } from '../enums/Page';
import type { Post } from '../enums/Post';

interface Content {
  content: string;
  title: string;
  date: Date;
  author: string;
  categories: string[];
  slug: string;
  image: string;
  draft: boolean;
  type: Post.text | Page.text;
}

export type { Content };
