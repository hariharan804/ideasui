import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { source } from '@/lib/source';

export async function GET(request: Request, properties: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await properties.params;

  if (!slug || slug.length === 0) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Clean the slug: remove trailing .mdx or .md from the last segment
  const cleanSlug = [...slug];
  const lastIndex = cleanSlug.length - 1;

  cleanSlug[lastIndex] = cleanSlug[lastIndex].replace(/\.(mdx|md)$/, '');

  // Retrieve the page from Fumadocs source
  const page = source.getPage(cleanSlug);

  if (!page) {
    return new NextResponse('Document Not Found', { status: 404 });
  }

  const filePath = page.absolutePath || path.join(process.cwd(), 'content/react', page.path);

  try {
    const rawMarkdown = await fs.readFile(filePath, 'utf8');

    return new NextResponse(rawMarkdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Failed to read raw markdown file in API route:', error);

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
