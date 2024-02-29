import markdownit from 'markdown-it';
import hljs from 'highlight.js';

export const convertUsingMarkdownIt = (mdString: string): string => {
  const markdown = markdownit({
    html: false,
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    },
  });
  return markdown.render(mdString);
};
