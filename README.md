# HummingBun
simple static site generator

## How to run 
open `configuration.json`, set the entryDir. you can use any folder but the default is example for development.
The expected blog structure in Humming bun is :
```
📁 content (mds)
📁 assets (js, css, imgs)
📁 ui
|--- index.js, page.js, 404.js, custom-custom.js
|---- 📁 partial
|--------- header, footer, side,
```

```js
// get the Bun toolkit : https://bun.sh/docs/installation
// bun install
bun run serve
```

## How to write partial component
```typescript
const footer: string = String.raw`
<div>footer</div>
`

const header = (title: string): string => String.raw`
<div>footer</div>
```

we strongly recommend to use VSCode (it's free) and install the following extension: use lit-html vscode extension: https://marketplace.visualstudio.com/items?itemName=bierner.lit-html


## How to generate static file
```
to be continued
```