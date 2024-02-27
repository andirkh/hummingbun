import type { Content } from '../../types/Content';
import footer from './partials/footer';
import header from './partials/header';
import meta from './partials/meta';

import { theme } from '../../constants';

const post = (obj: Content): string => {
  return String.raw`
      <!DOCTYPE html>
      <html lang="en" theme="${theme}">
      <head>
        ${meta}
        <title>${obj.title}</title>
      </head>
      <body>
        ${header}
        <h1>${obj.title}</h1>
        <p>date: ${obj.date}<p>
        <p>author: ${obj.author}</p>
        <div>${obj.content}</div>
        <div>categories: ${obj.categories.join(', ')}</div>
        ${footer}
      </body>
      </html>
    `;
};

export default post;
