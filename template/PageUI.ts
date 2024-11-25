import footer from './partials/footer';
import header from './partials/header';
import meta from './partials/meta';

import { theme } from '../src/constants';

type Props = {
  content: string;
  title: string;
}

export type PageUIType = ({
  content,
  title,
}: Props) => string;

const PageUI: PageUIType = ({ content, title }) => String.raw`
  <!DOCTYPE html>
  <html lang="en" theme="${theme}">
  <head>
    ${meta}
    <title>${title}</title>
  </head>
  <body>
    ${header}
    <div class="card bg-base-100">
      <h2>${title}</h2>
      ${content}
      ${footer}
    </div>
  </body>
  </html>
`;

export default PageUI;
