---
title: How to Integrate Hummingbun
description: Getting started with your own Hummingbun site
date: 2025-01-02
tags: [guide, integration]
isPage: true
---

# How to Integrate Hummingbun

Setting up your Hummingbun site is as gentle as the flutter of wings.

## Quick Start

```bash
bun create hummingbun my-site
cd my-site
bun install
```

## Create Your Build Script

In your `hummingbun.tsx`, declare your site's essence:

```typescript
import { hummingbunBuild } from "hummingbun";
import Template from "./template";

await hummingbunBuild(
  {
    title: "Your Site",
    subtitle: "Your Story",
    description: "Welcome to my corner of the web",
    siteUrl: "https://your-domain.com",
    contentDir: "content",
    staticDir: "static",
    distributionDir: "dist",
  },
  Template,
);
```

## Write Your Content

Create markdown files in the `content/` directory. Each becomes a page.

## Deploy

Push to GitHub. Let the workflow handle the rest. Your site blooms on the web.
