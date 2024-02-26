import type { Content } from "../../types/Content";
import meta from "./partials/meta";

const post = (obj: Content): string => {
    return String.raw`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${meta}
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