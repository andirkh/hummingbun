import footer from './partials/footer'
import header from './partials/header'
import meta from './partials/meta';

import type { Content } from '../../types/Content';

const home = (contents: Content[], prev: string, next: string): string => String.raw`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    ${meta}
    <title>Home</title>
  </head>
  <body>
    ${header}
    <div>
      ${contents.map((obj, index) => {
        return String.raw`
          <div index="${index}">
            <a href="/post/${obj.slug}">${obj.title}</a>
            <br />
          </div>
        `
      }).join('')}
    </div>
    <div>
      ${prev ? String.raw`<a href="${prev}">previous link</a>` : ''}
    </div>
    <div>
      ${next ? String.raw`<a href="${next}">next link</a>` : ''}
    </div>
    ${footer}
  </body>
  </html>
`

export default home;