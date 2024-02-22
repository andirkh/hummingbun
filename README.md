# HummingBun
simple static site generator

## Background 
This static site generator is my open source personal project that I work when I have a time. The [story started](https://github.com/andirkh/andirkh/issues/5) when I want to move to another SSG. I used Hugo as my personal web blog, however my `go` and `hugo` version on that blog was 5-6 years behind. So I decided to create a simple and reliable SSG by myself using [Bun](https://bun.sh/). 

Bun is javascript runtime written in [Zig](https://ziglang.org/) that execute Javascript or Typescript, a *lingua franca* in the web technology domain. Another motivation is to exercise using Typescript more. The target audience of this SSG would be myself, my wife or even my neighbors. I want to exercise my software development skill by creating a SSG that can be used by non-technical people as well, since I'm the only person who can write a code in my neighborhood. So I think it would be an interesting Journey.

## Workflow
I've got an inspiration by the co-creator of Django Framework that every [new feature should started with a github issue](https://simonwillison.net/2022/Jan/12/how-i-build-a-feature/). He use that method not only for large audience project, but also his 190+ his personal projects. So I decided to implement that methodology as well. The other benefit is to have a documentation ready at first. I treat it as a Jira ticket as well.

So, When there's a need to change the code:
- write a github issue with `story` or `bug` label
- add actionable title. the description consist of Background and Acceptance Criteria (AC). The AC is the mini to do list or a breakdown of the background story idea
- create a branch based on the issue (right sidebar of the page) checkout to that branch locally
- when there's a consideration or decision, write it to the Issue (even) it's only you who read the page. Add screenshot or Code snippet or even video. Because all that things are easily forgettable in the future. It will also help you to starting back and not feel guilty to starting up the project.
- make a Pull Request to the main branch
- the issue would be closed automatically

We use that method because our job is not to write a code, but to change a code in a software.

# Learn

## How to run 
The requirement of this Repo is just a Bun runtime (at this time). Make sure you have one in your system. Get the Bun toolkit here when you don't have one: https://bun.sh/docs/installation

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
`

const header = (obj: ParsedFile): string => String.raw`
<div>${obj.title}</div>
`
```

## Code Editor
We recommend to use VSCode (it's free) and install the following extension: 
- `lit-html` vscode extension: https://marketplace.visualstudio.com/items?itemName=bierner.lit-html . With this extension the Html Syntax would be available if you write a string of HTML.
