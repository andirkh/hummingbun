import { hummingbunBuild } from 'hummingbun';
import Template from './template';

await hummingbunBuild(
  {
    title: '$PROJECT_NAME',
    subtitle: 'My beautiful site',
    description: 'A site built with Hummingbun',
    copyright: '© Your Name',
    authorName: 'Your Name',
    authorUrl: 'https://example.com',
    language: 'en',
    siteUrl: 'https://example.com',
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
