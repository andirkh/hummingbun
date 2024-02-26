import footer from './partials/footer'
import header from './partials/header'
import meta from './partials/meta';

const page = (content: string, title: string):string => (String.raw`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    ${meta}
    <title>${title}</title>
  </head>
  <body>
    ${header}
    <h2>${title}</h2>
    ${content}
    ${footer}
  </body>
  </html>
`)

export default page;