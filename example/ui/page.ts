const page = (
  title: string, 
  date: string, 
  author: string, 
  categories: [string], 
  image: string,
  content: string): string => {
    return String.raw`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body>
        <img src="${image}" alt="${title}">
        <h1>${title}</h1>
        <p>author: ${author}</p>
        <div>${content}</div>
        <div>categories: ${categories.join(', ')}</div>
      </body>
      </html>
    `
}

export default page;