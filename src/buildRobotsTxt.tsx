import { write } from 'bun';
import type { SiteConfig } from './types';

async function buildRobotsTxt({ site }: { site: SiteConfig }) {
  const aiUserAgents = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'anthropic-ai',
    'Google-Extended',
    'Applebot-Extended',
    'Bytespider',
    'CCBot',
    'PerplexityBot',
    'Amazonbot',
  ];
  const rules = aiUserAgents
    .map((userAgent) => `User-agent: ${userAgent}\nDisallow: /`)
    .join('\n\n');
  const robots = `${rules}\n\nUser-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`;
  await write(`${site.distributionDir}/robots.txt`, robots);
}

export default buildRobotsTxt;
