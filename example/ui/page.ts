import footer from './partials/footer'
import header from './partials/header'

const page = (content: string, title: string):string => (String.raw`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
  </head>
  <body>
    ${header}
    ${content}
    ${footer}
  </body>
  </html>
`)

export default page;