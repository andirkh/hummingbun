# HummingBun

Can a static site generator be simple yet versatile?

![header](readme_header.png)

## How to run

The requirement of this Repo is just a Bun runtime (at this time). Make sure you have one in your system. Get the Bun toolkit here when you don't have one: https://bun.sh/docs/installation

![header2](readme_header2.png)

When you starting fresh :

```
bun install
```

Open `configuration.json`, set the entryDir. You can use any folder but the default is example for development.
The expected blog structure in HummingBun is :

```
📁 content (md)
📁 assets (js, css, img)
📁 ui
|--- home.ts, page.ts, post.js
|---- 📁 partial
|--------- header.ts, footer.ts, side.ts,
```

```js
bun run serve
```

or, use hot-reloading :

```js
bun run hot
```

Those command above will generate the static file html.

## How to write partial component

The partial component is a part of your html page that is just a multi-line `string`. No templating language such as Pug, Jinja, or Handlebar is needed. You can use `${prop}` to pass the value just like a normal multi-liner string.

```typescript
const footer: string = String.raw`
<div>footer</div>
`;

const header = (obj: Content): string => String.raw`
<div>${obj.title}</div>
`;
```

## Code Editor

We recommend to use VSCode (it's free) and install the following extension:

- `lit-html` vscode extension: https://marketplace.visualstudio.com/items?itemName=bierner.lit-html . With this extension the Html Syntax would be available if you write a string of HTML.
- `Prettier`

# Roadmap :

1. static site generator (build) ✅
2. release the Hummingbun page that generated by this repo to GHpage or netlify ✅
3. hypermedia admin page and server with htmx ⏳ (week 1)
4. build for unix like system and windows (week 2)
5. release
