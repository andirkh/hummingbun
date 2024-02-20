import type { ParsedFile } from "../../types/ParsedFile";

const page = (obj: ParsedFile): string => {
    return String.raw`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${obj.data.title}</title>
      </head>
      <body>
        <img src="${obj.data.image}" alt="${obj.data.title}">
        <h1>${obj.data.title}</h1>
        <p>date: ${obj.data.date}<p>
        <p>author: ${obj.data.author}</p>
        <div>${obj.content}</div>
        <div>categories: ${obj.data.categories.join(', ')}</div>
      </body>
      </html>
    `
}

export default page;