import { hummingbunBuild } from 'hummingbun';
import Template from './template';

await hummingbunBuild(
  {
    title: 'Hummingbun',
    subtitle: 'A minimalist static site generator',
    description: 'Fast, elegant, and delightfully simple',
    copyright: '© Hummingbun',
    authorName: 'Hummingbun',
    authorUrl: 'https://hummingbun.pouffer.com',
    language: 'en',
    siteUrl: 'https://hummingbun.pouffer.com',
    contentDir: 'content',
    staticDir: 'static',
    distributionDir: 'dist',
    kinuStylesheetPath: 'node_modules/kinu/dist/index.css',
    stylesheetPath: 'static/main.css',
    menu: [{ name: 'Home', url: '/' }],
    pageSize: 10,
  },
  Template,
);
