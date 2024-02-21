import type { ParsedFile } from "../../types/ParsedFile";

const post = (obj: ParsedFile): string => {
    return String.raw`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${obj.title}</title>
      </head>
      <body>
        <img src="${obj.image}" alt="${obj.title}">
        <h1>${obj.title}</h1>
        <p>date: ${obj.date}<p>
        <p>author: ${obj.author}</p>
        <div>${obj.content}</div>
        <div>categories: ${obj.categories.join(', ')}</div>
      </body>
      </html>
    `
}

export default post;