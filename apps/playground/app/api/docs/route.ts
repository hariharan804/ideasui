import type { NextRequest } from 'next/server';

import fs from 'node:fs';
import path from 'node:path';

import { NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const file = request.nextUrl.searchParams.get('file');

    if (!file) {
      return NextResponse.json({ error: 'File parameter required' }, { status: 400 });
    }

    // Resolve the file path from project root
    const filePath = path.join(process.cwd(), file);

    // Security: prevent directory traversal outside of the monorepo root
    const resolvedPath = path.resolve(filePath);

    // Get the root of the monorepo (2 levels up from apps/playground)
    const monorepoRoot = path.resolve(process.cwd(), '../..');

    if (!resolvedPath.startsWith(monorepoRoot)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
    }

    // Check if file exists
    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const content = fs.readFileSync(resolvedPath, 'utf8');

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading file:', error);

    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
