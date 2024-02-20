interface ParsedFile {
  content: string;
  data: {
      title: string;
      date: Date;
      author: string;
      categories: string[];
      slug: string;
      image: string;
      draft: boolean;
  };
}

export { ParsedFile }