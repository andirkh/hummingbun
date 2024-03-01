import markdownit from 'markdown-it';
import tm from 'markdown-it-texmath';
import hljs from 'highlight.js';

export const convertUsingMarkdownIt = (mdString: string): string => {
  const markdown = markdownit({
    html: true,
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    },
  }).use(tm, {
    engine: require('katex'),
    delimiters: 'dollars',
    katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
  });
  return markdown.render(mdString);
};
