import { NextResponse } from 'next/server';
import { source } from '@/lib/source';
import { siteConfig } from '@/config/site';

export function GET() {
  const pages = source.getPages();

  let content = `# ${siteConfig.name} — Full Documentation Reference\n\n`;

  content += `> ${siteConfig.description}\n\n`;
  content += `Website: ${siteConfig.url}\nRepository: ${siteConfig.links.github}\n\n`;

  for (const page of pages) {
    content += `\n---\n\n# ${page.data.title}\n\n`;
    if (page.data.description) {
      content += `> ${page.data.description}\n\n`;
    }
    content += `URL: ${siteConfig.url}/react/docs/${page.slugs.join('/')}\n\n`;
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
