import markdownit from 'markdown-it';
import hljs from 'highlight.js';

// Parse Markdown to HTML
export const parseMarkdownToHtml = (mdString: string): string => {
  const markdown = markdownit({
    html: true,
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return '';
    },
  })

  return markdown.render(mdString);
};
