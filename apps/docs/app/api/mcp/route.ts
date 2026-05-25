import { type NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

// Disable caching for Next.js route
export const dynamic = 'force-dynamic';

// In-memory active connections map: sessionId -> controller
const activeSessions = new Map<string, ReadableStreamDefaultController>();

async function getFilesRecursively(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name);

      return entry.isDirectory() ? getFilesRecursively(res) : res;
    }),
  );

  return files.flat().filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
}

async function findMdxFile(
  componentName: string,
): Promise<{ content: string; name: string } | null> {
  const contentDir = path.join(process.cwd(), 'content/react');

  // Clean up input
  const cleaned = componentName.replace(/^\//, '').replace(/\.mdx?$/, '');

  const possiblePaths = [
    path.join(contentDir, cleaned + '.mdx'),
    path.join(contentDir, cleaned + '.md'),
    path.join(contentDir, 'components', cleaned + '.mdx'),
    path.join(contentDir, 'components/(buttons)', cleaned + '.mdx'),
    path.join(contentDir, 'getting-started', cleaned + '.mdx'),
  ];

  for (const p of possiblePaths) {
    try {
      const content = await fs.readFile(p, 'utf-8');

      return { content, name: path.basename(p) };
    } catch {
      // Continue searching
    }
  }

  // Try recursive match by filename
  try {
    const files = await getFilesRecursively(contentDir);

    for (const f of files) {
      const base = path.basename(f, path.extname(f));
      const rel = path.relative(contentDir, f).replace(/\.mdx?$/, '');

      if (
        base.toLowerCase() === cleaned.toLowerCase() ||
        rel.toLowerCase() === cleaned.toLowerCase()
      ) {
        const content = await fs.readFile(f, 'utf-8');

        return { content, name: path.basename(f) };
      }
    }
  } catch (error) {
    console.error('Recursive search failed:', error);
  }

  return null;
}

export async function GET(request: NextRequest) {
  const sessionId = Math.random().toString(36).substring(2, 15);

  const stream = new ReadableStream({
    start(controller) {
      activeSessions.set(sessionId, controller);

      // Establish SSE connection and send the message endpoint URL event
      const endpointEvent = `event: endpoint\ndata: /api/mcp?sessionId=${sessionId}\n\n`;

      controller.enqueue(new TextEncoder().encode(endpointEvent));
    },
    cancel() {
      activeSessions.delete(sessionId);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

async function listComponentsTool(): Promise<unknown> {
  const contentDir = path.join(process.cwd(), 'content/react');
  const files = await getFilesRecursively(contentDir);
  const list = files.map((f) => {
    const rel = path.relative(contentDir, f);

    return rel.replace(/\.mdx?$/, '');
  });

  return {
    content: [
      {
        type: 'text',
        text: `Available IdeasUI components/pages:\n\n${list.map((item) => `- ${item}`).join('\n')}`,
      },
    ],
  };
}

async function getComponentDocTool(
  args: Record<string, unknown> | undefined,
): Promise<{ result: unknown; error: unknown }> {
  const componentName = args?.component;

  if (typeof componentName !== 'string') {
    return {
      result: null,
      error: { code: -32602, message: 'Missing or invalid component name argument' },
    };
  }

  const fileData = await findMdxFile(componentName);

  if (fileData) {
    return {
      result: {
        content: [
          {
            type: 'text',
            text: fileData.content,
          },
        ],
      },
      error: null,
    };
  }

  return {
    result: null,
    error: { code: -32602, message: `Component/page "${componentName}" was not found.` },
  };
}

async function searchDocsTool(
  args: Record<string, unknown> | undefined,
): Promise<{ result: unknown; error: unknown }> {
  const query = args?.query;

  if (typeof query !== 'string') {
    return {
      result: null,
      error: { code: -32602, message: 'Missing or invalid query argument' },
    };
  }

  const contentDir = path.join(process.cwd(), 'content/react');
  const files = await getFilesRecursively(contentDir);
  const matches = [];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');

    if (content.toLowerCase().includes(query.toLowerCase())) {
      const rel = path.relative(contentDir, file).replace(/\.mdx?$/, '');

      matches.push(rel);
    }
  }

  if (matches.length > 0) {
    return {
      result: {
        content: [
          {
            type: 'text',
            text: `Found ${matches.length} matching pages in documentation:\n\n${matches.map((m) => `- ${m}`).join('\n')}`,
          },
        ],
      },
      error: null,
    };
  }

  return {
    result: {
      content: [
        {
          type: 'text',
          text: `No matches found in documentation for search query: "${query}"`,
        },
      ],
    },
    error: null,
  };
}

async function callTool(
  name: string,
  args: Record<string, unknown> | undefined,
): Promise<{ result: unknown; error: unknown }> {
  if (name === 'list_components') {
    const result = await listComponentsTool();

    return { result, error: null };
  }

  if (name === 'get_component_doc') {
    return getComponentDocTool(args);
  }

  if (name === 'search_docs') {
    return searchDocsTool(args);
  }

  return {
    result: null,
    error: { code: -32601, message: `Method not found: ${name}` },
  };
}

async function handleMethod(
  method: string,
  params: unknown,
): Promise<{ result: unknown; error: unknown }> {
  let result: unknown = null;
  let error: unknown = null;

  if (method === 'initialize') {
    result = {
      protocolVersion: '2024-11-05',
      capabilities: {
        tools: {},
      },
      serverInfo: {
        name: 'ideasui-docs-mcp',
        version: '0.1.0',
      },
    };
  } else if (method === 'tools/list') {
    result = {
      tools: [
        {
          name: 'list_components',
          description: 'List all available components and documentation pages inside IdeasUI.',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'get_component_doc',
          description:
            'Get the full Markdown/MDX documentation of a component or page containing definitions and code snippets.',
          inputSchema: {
            type: 'object',
            properties: {
              component: {
                type: 'string',
                description:
                  "The name or path of the component (e.g. 'button', 'button-group', or 'getting-started/design-tokens').",
              },
            },
            required: ['component'],
          },
        },
        {
          name: 'search_docs',
          description:
            'Search the component library docs recursively for matching keywords or text snippets.',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'The search query or keyword to look for.',
              },
            },
            required: ['query'],
          },
        },
      ],
    };
  } else if (method === 'tools/call') {
    const { name, arguments: args } = params as {
      name: string;
      arguments?: Record<string, unknown>;
    };

    const outcome = await callTool(name, args);

    result = outcome.result;

    error = outcome.error;
  } else {
    result = {};
  }

  return { result, error };
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId || !activeSessions.has(sessionId)) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const controller = activeSessions.get(sessionId);

  if (!controller) {
    return NextResponse.json({ error: 'Session controller not found' }, { status: 500 });
  }

  let body;

  try {
    body = await request.json();
  } catch (error_) {
    return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
  }

  const { jsonrpc, method, id, params } = body;

  if (jsonrpc !== '2.0') {
    return NextResponse.json({ error: 'Invalid JSON-RPC version' }, { status: 400 });
  }

  // If notification (no ID), just acknowledge
  if (id === undefined || id === null) {
    return new Response('Notification accepted', { status: 200 });
  }

  let result: unknown = null;
  let error: unknown = null;

  try {
    const outcome = await handleMethod(method, params);

    result = outcome.result;

    error = outcome.error;
  } catch (error_) {
    const message = error_ instanceof Error ? error_.message : 'Internal error';

    error = { code: -32603, message };
  }

  // Format the JSON-RPC reply
  const jsonRpcResponse = error ? { jsonrpc: '2.0', id, error } : { jsonrpc: '2.0', id, result };

  // Write event to client stream
  const sseMessage = `event: message\ndata: ${JSON.stringify(jsonRpcResponse)}\n\n`;

  try {
    controller.enqueue(new TextEncoder().encode(sseMessage));
  } catch (error_) {
    console.error('Failed to write message to connection stream:', error_);
    activeSessions.delete(sessionId);

    return NextResponse.json({ error: 'Connection closed' }, { status: 410 });
  }

  return new Response('Accepted', { status: 200 });
}
