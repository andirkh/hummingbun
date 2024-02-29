import { expect, test, describe } from 'bun:test';

import { convertUsingMarkdownIt } from '../converter';

const removeTabsInString = (multilineString: string): string => {
  return multilineString.replace(/^\s+/gm, '');
};

type TestData = {
  [key: string]: {
    text: string;
    result: string;
  };
};

const testCases: TestData = {
  'heading 1': {
    text: '# hello',
    result: '<h1>hello</h1>\n',
  },
  'heading 2': {
    text: '## hello',
    result: '<h2>hello</h2>\n',
  },
  'heading 3': {
    text: '### hello',
    result: '<h3>hello</h3>\n',
  },
  'heading 4': {
    text: '#### hello',
    result: '<h4>hello</h4>\n',
  },
  'heading 5': {
    text: '##### hello',
    result: '<h5>hello</h5>\n',
  },
  'heading 6': {
    text: '###### hello',
    result: '<h6>hello</h6>\n',
  },
  'block text': {
    text: '**hello**',
    result: '<p><strong>hello</strong></p>\n',
  },
  'italic text': {
    text: '*hello*',
    result: '<p><em>hello</em></p>\n',
  },
  'strike through': {
    text: '~~hello~~',
    result: '<p><s>hello</s></p>\n',
  },
  'unordered list': {
    text: '- hello',
    result: '<ul>\n<li>hello</li>\n</ul>\n',
  },
  'ordered list': {
    text: String.raw`
    1. hello
    2. llo
    3. velo
  `,
    result: '<pre><code>1. hello\n2. llo\n3. velo\n</code></pre>\n',
  },
  'code block': {
    text: removeTabsInString(`
      \`\`\`
      cd memo
      \`\`\``),
    result: '<pre><code>cd memo\n</code></pre>\n',
  },
  'code bloc multiline js': {
    text: `
\`\`\`js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\``,
    result:
      '<pre><code class="language-js"><span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">function</span> (<span class="hljs-params">bar</span>) {\n  <span class="hljs-keyword">return</span> bar++;\n};\n\n<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">foo</span>(<span class="hljs-number">5</span>));\n</code></pre>\n',
  },
  'inline block': {
    text: removeTabsInString(`hello \`mycode\``),
    result: '<p>hello <code>mycode</code></p>\n',
  },
  'image no title': {
    text: removeTabsInString(`![funny picture](http://funny.picture.com/asd)`),
    result: `<p><img src=\"http://funny.picture.com/asd\" alt=\"funny picture\"></p>\n`,
  },
  'image with title title': {
    text: removeTabsInString(
      `![funny picture](http://funny.picture.com/asd "my title")`,
    ),
    result: `<p><img src=\"http://funny.picture.com/asd\" alt=\"funny picture\" title=\"my title\"></p>\n`,
  },
  'link no title': {
    text: removeTabsInString(`[my picture link](http://funny.picture.com/asd)`),
    result: `<p><a href=\"http://funny.picture.com/asd\">my picture link</a></p>\n`,
  },
  'link with title': {
    text: removeTabsInString(
      `[my picture link](http://funny.picture.com/asd "my title")`,
    ),
    result: `<p><a href=\"http://funny.picture.com/asd\" title=\"my title\">my picture link</a></p>\n`,
  },
  'horizontal rules': {
    text: removeTabsInString(`---`),
    result: `<hr>\n`,
  },
  'paragpraph inline': {
    text: removeTabsInString(`
    This is the first paragraph.
    `),
    result: `<p>This is the first paragraph.</p>\n`,
  },
  'paragraph multi line': {
    text: removeTabsInString(`
    This is the first paragraph.

    This is the second paragraph, 
    which spans multiple lines.

    And here is the third paragraph.
    `),
    result: `<p>This is the first paragraph.\nThis is the second paragraph,\nwhich spans multiple lines.\nAnd here is the third paragraph.</p>\n`,
  },
};

describe('Convert Markdown to HTML', () => {
  Object.keys(testCases).forEach((t) => {
    const { text, result } = testCases[t];
    test(t, () => {
      expect(convertUsingMarkdownIt(text)).toBe(result);
    });
  });
});
