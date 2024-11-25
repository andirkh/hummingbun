![header](readme.avif)

Simple Static Site Generator for everyone, built upon Bun.

## How to Start

Open `configuration.json`, set the entryDir. You can use any folder, however the default is `example`.

Here's the `/blog` dir :
```
📁 content (md files)
📁 asset (js, css, img)
```

Here's how to run :

```js
bun run serve
# or
bun run hot-serve
```

production build (/dist) :

```js
bun run build
```

## How to Update the UI :

The Mother HTML is just a text. So, the UI component here is just a multi-line `string`. As long as you know how to modify a string in javascript/typescript, you're good to go 👍. No templating language needed. 

Here's some example :

```typescript
const footer: string = String.raw`
<div>footer</div>
`;

const header = (obj: Content): string => String.raw`
<div>${obj.title}</div>
`;
```

The entry point of the whole blog are `HomeUI` (home page), `PostUI` (individual post page), and `PageUI` (custom page for categories, single page post, etc). In some case you probably want to hack more. Go to the `/src` folder to extends the logic.

## Code Editor

We recommend to use VSCode (it's free) and use the following extension:

- [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) : the Html Syntax would be available if you write in a string variable.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) : code formatter

# Support :
just mention me on [X](https://x.com/andirkh) 
