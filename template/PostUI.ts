import type { Content } from '../src/types/Content';
import footer from './partials/footer';
import header from './partials/header';
import meta from './partials/meta';

import { theme } from '../src/constants';

import { getFormattedDate } from '../src/utils';

type Props = {
  obj: Content;
};

export type PostUIType = ({ obj }: Props) => string;

const PostUI: PostUIType = ({ obj }) => {
  return String.raw`
      <!DOCTYPE html>
      <html lang="en" theme="${theme}">
      <head>
        ${meta}
        <title>${obj.title}</title>
      </head>
      <body>
        ${header}
        <div class="flex justify-center items-center mt-3 mb-5">
          <div class="card bg-white">
            <div class="card-body prose prose-l">
              <h1>${obj.title}</h1>
              <div>${getFormattedDate(obj.date)} by ${obj.author}</div>
              <hr />
              ${obj.content}
              <div>categories: ${obj.categories.join(', ')}</div>
            </div>
          </div>
        </div>
        ${footer}
      </body>
      </html>
    `;
};

export default PostUI;
