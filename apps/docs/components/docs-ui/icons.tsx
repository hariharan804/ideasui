/**
 * @license lucide-react - ISC
 *
 * All copyright belongs to https://github.com/lucide-icons/lucide, we bundle it as part of library to avoid upstream issues.
 */
import type { ComponentProps } from 'react';

import { createElement, forwardRef } from 'react';

const defaultAttributes: LucideProperties = {
  fill: 'none',
  height: 24,
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 2,
  viewBox: '0 0 24 24',
  width: 24,
  xmlns: 'http://www.w3.org/2000/svg',
};

type SVGElementType =
  'circle' | 'ellipse' | 'g' | 'line' | 'path' | 'polygon' | 'polyline' | 'rect';

export interface LucideProperties extends ComponentProps<'svg'> {
  size?: string | number;
}

export type IconNode = [elementName: SVGElementType, attrs: Record<string, string>][];

const createLucideIcon = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef<SVGSVGElement, LucideProperties>(
    ({ children, color = 'currentColor', size = 24, ...properties }, reference) => {
      return (
        <svg
          ref={reference}
          {...defaultAttributes}
          height={size}
          stroke={color}
          width={size}
          {...properties}
        >
          {iconNode.map(([tag, attribute]) => createElement(tag, attribute))}
          {children}
        </svg>
      );
    },
  );

  Component.displayName = iconName;

  return Component;
};

export const ChevronDown = createLucideIcon('chevron-down', [
  ['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }],
]);

export const Languages = createLucideIcon('languages', [
  ['path', { d: 'm5 8 6 6', key: '1wu5hv' }],
  ['path', { d: 'm4 14 6-6 2-3', key: '1k1g8d' }],
  ['path', { d: 'M2 5h12', key: 'or177f' }],
  ['path', { d: 'M7 2h1', key: '1t2jsx' }],
  ['path', { d: 'm22 22-5-10-5 10', key: 'don7ne' }],
  ['path', { d: 'M14 18h6', key: '1m8k6r' }],
]);

export const Sidebar = createLucideIcon('panel-left', [
  ['rect', { height: '18', key: 'afitv7', rx: '2', width: '18', x: '3', y: '3' }],
  ['path', { d: 'M9 3v18', key: 'fh3hqa' }],
]);

export const ChevronsUpDown = createLucideIcon('chevrons-up-down', [
  ['path', { d: 'm7 15 5 5 5-5', key: '1hf1tw' }],
  ['path', { d: 'm7 9 5-5 5 5', key: 'sgt6xg' }],
]);

export const Search = createLucideIcon('search', [
  ['circle', { cx: '11', cy: '11', key: '4ej97u', r: '8' }],
  ['path', { d: 'm21 21-4.3-4.3', key: '1qie3q' }],
]);

export const ExternalLink = createLucideIcon('external-link', [
  ['path', { d: 'M15 3h6v6', key: '1q9fwt' }],
  ['path', { d: 'M10 14 21 3', key: 'gplh6r' }],
  [
    'path',
    {
      d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
      key: 'a6xqqp',
    },
  ],
]);

export const Moon = createLucideIcon('moon', [
  ['path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z', key: 'a7tn18' }],
]);

export const Sun = createLucideIcon('sun', [
  ['circle', { cx: '12', cy: '12', key: '4exip2', r: '4' }],
  ['path', { d: 'M12 2v2', key: 'tus03m' }],
  ['path', { d: 'M12 20v2', key: '1lh1kg' }],
  ['path', { d: 'm4.93 4.93 1.41 1.41', key: '149t6j' }],
  ['path', { d: 'm17.66 17.66 1.41 1.41', key: 'ptbguv' }],
  ['path', { d: 'M2 12h2', key: '1t8f8n' }],
  ['path', { d: 'M20 12h2', key: '1q8mjw' }],
  ['path', { d: 'm6.34 17.66-1.41 1.41', key: '1m8zz5' }],
  ['path', { d: 'm19.07 4.93-1.41 1.41', key: '1shlcs' }],
]);

export const Airplay = createLucideIcon('airplay', [
  [
    'path',
    {
      d: 'M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1',
      key: 'ns4c3b',
    },
  ],
  ['path', { d: 'm12 15 5 6H7Z', key: '14qnn2' }],
]);

export const Menu = createLucideIcon('menu', [
  ['line', { key: '1e0a9i', x1: '4', x2: '20', y1: '12', y2: '12' }],
  ['line', { key: '1owob3', x1: '4', x2: '20', y1: '6', y2: '6' }],
  ['line', { key: 'yk5zj1', x1: '4', x2: '20', y1: '18', y2: '18' }],
]);

export const X = createLucideIcon('x', [
  ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
  ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
]);

export const LoaderCircle = createLucideIcon('loader-circle', [
  ['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }],
]);

export const CircleCheck = createLucideIcon('circle-check', [
  ['circle', { cx: '12', cy: '12', key: '1mglay', r: '10' }],
  ['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
]);

export const CircleX = createLucideIcon('circle-x', [
  ['circle', { cx: '12', cy: '12', key: '1mglay', r: '10' }],
  ['path', { d: 'm15 9-6 6', key: '1uzhvr' }],
  ['path', { d: 'm9 9 6 6', key: 'z0biqf' }],
]);

export const Check = createLucideIcon('check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);

export const TriangleAlert = createLucideIcon('triangle-alert', [
  [
    'path',
    {
      d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3',
      key: 'wmoenq',
    },
  ],
  ['path', { d: 'M12 9v4', key: 'juzpu7' }],
  ['path', { d: 'M12 17h.01', key: 'p32p05' }],
]);

export const Info = createLucideIcon('info', [
  ['circle', { cx: '12', cy: '12', key: '1mglay', r: '10' }],
  ['path', { d: 'M12 16v-4', key: '1dtifu' }],
  ['path', { d: 'M12 8h.01', key: 'e9boi3' }],
]);

export const Copy = createLucideIcon('copy', [
  [
    'rect',
    {
      height: '14',
      key: '17jyea',
      rx: '2',
      ry: '2',
      width: '14',
      x: '8',
      y: '8',
    },
  ],
  [
    'path',
    {
      d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2',
      key: 'zix9uf',
    },
  ],
]);

export const Clipboard = createLucideIcon('clipboard', [
  [
    'rect',
    {
      height: '4',
      key: '1',
      rx: '1',
      ry: '1',
      width: '8',
      x: '8',
      y: '2',
    },
  ],
  [
    'path',
    {
      d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2',
      key: '2',
    },
  ],
]);

export const FileText = createLucideIcon('file-text', [
  [
    'path',
    {
      d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z',
      key: '1rqfz7',
    },
  ],
  ['path', { d: 'M14 2v4a2 2 0 0 0 2 2h4', key: 'tnqrlb' }],
  ['path', { d: 'M10 9H8', key: 'b1mrlr' }],
  ['path', { d: 'M16 13H8', key: 't4e002' }],
  ['path', { d: 'M16 17H8', key: 'z1uh3a' }],
]);

export const Hash = createLucideIcon('hash', [
  ['line', { key: '4lhtct', x1: '4', x2: '20', y1: '9', y2: '9' }],
  ['line', { key: 'vyu0kd', x1: '4', x2: '20', y1: '15', y2: '15' }],
  ['line', { key: '1ggp8o', x1: '10', x2: '8', y1: '3', y2: '21' }],
  ['line', { key: 'weycgp', x1: '16', x2: '14', y1: '3', y2: '21' }],
]);

export const Text = createLucideIcon('text', [
  ['path', { d: 'M15 18H3', key: 'olowqp' }],
  ['path', { d: 'M17 6H3', key: '16j9eg' }],
  ['path', { d: 'M21 12H3', key: '2avoz0' }],
]);

export const File = createLucideIcon('file', [
  [
    'path',
    {
      d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z',
      key: '1rqfz7',
    },
  ],
  ['path', { d: 'M14 2v4a2 2 0 0 0 2 2h4', key: 'tnqrlb' }],
]);

export const Folder = createLucideIcon('folder', [
  [
    'path',
    {
      d: 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
      key: '1kt360',
    },
  ],
]);

export const FolderOpen = createLucideIcon('folder-open', [
  [
    'path',
    {
      d: 'm6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2',
      key: 'usdka0',
    },
  ],
]);

export const Star = createLucideIcon('star', [
  [
    'path',
    {
      d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
      key: 'r04s7s',
    },
  ],
]);

export const Link = createLucideIcon('link', [
  [
    'path',
    {
      d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
      key: '1cjeqo',
    },
  ],
  [
    'path',
    {
      d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
      key: '19qd67',
    },
  ],
]);

export const Edit = createLucideIcon('square-pen', [
  [
    'path',
    {
      d: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
      key: '1m0v6g',
    },
  ],
  [
    'path',
    {
      d: 'M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z',
      key: 'ohrbg2',
    },
  ],
]);

export const ChevronRight = createLucideIcon('chevron-right', [
  ['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }],
]);

export const ChevronLeft = createLucideIcon('chevron-left', [
  ['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }],
]);

export const Plus = createLucideIcon('plus', [
  ['path', { d: 'M5 12h14', key: '1ays0h' }],
  ['path', { d: 'M12 5v14', key: 's699le' }],
]);

export const Trash2 = createLucideIcon('trash-2', [
  ['path', { d: 'M3 6h18', key: 'd0wm0j' }],
  ['path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', key: '4alrt4' }],
  ['path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2', key: 'v07s0e' }],
  ['line', { key: '1uufr5', x1: '10', x2: '10', y1: '11', y2: '17' }],
  ['line', { key: 'xtxkd', x1: '14', x2: '14', y1: '11', y2: '17' }],
]);

export const ChevronUp = createLucideIcon('chevron-up', [
  ['path', { d: 'm18 15-6-6-6 6', key: '153udz' }],
]);

export const Github = createLucideIcon('github', [
  [
    'path',
    {
      d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
      key: 'github-path-1',
    },
  ],
  ['path', { d: 'M9 18c-4.51 2-5-2-7-2', key: 'github-path-2' }],
]);

export const Chrome = createLucideIcon('chrome', [
  ['circle', { cx: '12', cy: '12', r: '10', key: 'chrome-circle-1' }],
  ['circle', { cx: '12', cy: '12', r: '4', key: 'chrome-circle-2' }],
  ['line', { x1: '21.17', x2: '12', y1: '8', y2: '8', key: 'chrome-line-1' }],
  ['line', { x1: '3.95', x2: '8.54', y1: '6.06', y2: '14', key: 'chrome-line-2' }],
  ['line', { x1: '10.88', x2: '15.46', y1: '21.94', y2: '14', key: 'chrome-line-3' }],
]);

export const Figma = createLucideIcon('figma', [
  ['path', { d: 'M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z', key: 'figma-path-1' }],
  ['path', { d: 'M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z', key: 'figma-path-2' }],
  ['path', { d: 'M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z', key: 'figma-path-3' }],
  ['path', { d: 'M5 12.5A3.5 3.5 0 0 1 8.5 9H12v3.5a3.5 3.5 0 1 1-7 0z', key: 'figma-path-4' }],
  ['path', { d: 'M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 1 1 5 18.5z', key: 'figma-path-5' }],
]);

// ─── Brand / App SVG Icons ────────────────────────────────────────────────────

export const CursorIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg className={properties.className} fill="currentColor" viewBox="0 0 24 24" {...properties}>
    <path d="M5.5 2v20l5.83-5.83 5.34 5.34 2.83-2.83-5.34-5.34L20 7.5z" />
  </svg>
);

export const VSCodeIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg className={properties.className} fill="currentColor" viewBox="0 0 24 24" {...properties}>
    <path d="M23.985 6.53a.5.5 0 0 0-.07-.17l-3.3-3.2a.5.5 0 0 0-.68-.03L12 10.92 5.065 3.13a.5.5 0 0 0-.68.03l-3.3 3.2a.5.5 0 0 0-.07.17.5.5 0 0 0 .15.5L5.4 12l-4.235 4.77a.5.5 0 0 0-.15.5.5.5 0 0 0 .07.17l3.3 3.2a.5.5 0 0 0 .68.03L12 13.08l6.935 7.79a.5.5 0 0 0 .68-.03l3.3-3.2a.5.5 0 0 0 .07-.17.5.5 0 0 0-.15-.5L18.6 12l4.235-4.77a.5.5 0 0 0 .15-.5z" />
  </svg>
);

export const ChatGPTIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="16"
    role="img"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...properties}
  >
    <title>OpenAI</title>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
);

export const GeminiIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="16"
    role="img"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...properties}
  >
    <title>Google Gemini</title>
    <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z" />
  </svg>
);

export const ClaudeIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...properties}
  >
    <path
      d="M3.74677 10.3076L6.50057 8.76276L6.54712 8.62846L6.50057 8.55386H6.36705L5.90589 8.52577L4.33266 8.48364L2.96762 8.42658L1.64563 8.35636L1.31183 8.28527L1 7.87448L1.03162 7.66909L1.31271 7.48125L1.71239 7.51636L2.5987 7.57693L3.92772 7.66909L4.89133 7.72527L6.31961 7.87448H6.54712L6.57874 7.78232L6.50057 7.72527L6.44083 7.66909L5.06525 6.73693L3.57636 5.75298L2.79721 5.18596L2.37558 4.89893L2.16213 4.63034L2.07077 4.04226L2.45288 3.62094L2.96675 3.65605L3.09851 3.69116L3.6194 4.09141L4.73234 4.95248L6.18522 6.02157L6.39779 6.19887L6.483 6.13918L6.49354 6.09618L6.39779 5.9373L5.60723 4.51009L4.76396 3.05743L4.388 2.4553L4.28874 2.09455C4.25153 1.95591 4.23147 1.81323 4.22901 1.66972L4.6647 1.07812L4.90538 1L5.48689 1.07812L5.73196 1.29053L6.09299 2.11561L6.678 3.41467L7.58539 5.18245L7.85067 5.70646L7.99297 6.19185L8.04568 6.34107H8.13791V6.25592L8.21257 5.26056L8.35048 4.03875L8.48576 2.46583L8.53144 2.02345L8.75104 1.49241L9.1876 1.20539L9.52754 1.36865L9.80776 1.7689L9.76823 2.02696L9.60133 3.10658L9.27632 4.80063L9.06287 5.93292H9.1876L9.32903 5.79248L9.9035 5.0306L10.8671 3.82633L11.2923 3.34796L11.7886 2.82044L12.1074 2.56853H12.71L13.1536 3.22771L12.9551 3.90796L12.334 4.69354L11.8202 5.35975L11.0832 6.3516L10.6229 7.14508L10.6651 7.20828L10.7749 7.19774L12.4412 6.84401L13.3407 6.68075L14.415 6.49643L14.9007 6.72288L14.9534 6.95373L14.762 7.4242L13.6139 7.70771L12.2673 7.97718L10.261 8.45116L10.2364 8.46871L10.2645 8.50382L11.1684 8.58984L11.5549 8.61091H12.5009L14.2621 8.74257L14.7233 9.04627L15 9.41843L14.9534 9.70194L14.2446 10.0627L11.0551 9.3052L10.2891 9.11386H10.1837V9.17793L10.8214 9.80113L11.9906 10.8562L13.4549 12.2167L13.5287 12.5529L13.3407 12.8179L13.1422 12.7898L11.8562 11.8234L11.3599 11.3872L10.2355 10.4419H10.1618V10.5411L10.4209 10.9203L11.7886 12.9742L11.8588 13.6044L11.7604 13.8098L11.4056 13.9335L11.0156 13.8633L10.2153 12.7398L9.38964 11.4759L8.72293 10.3427L8.64124 10.3892L8.24771 14.6208L8.06325 14.8367L7.6381 15L7.2841 14.7305L7.09612 14.2952L7.2841 13.435L7.51073 12.3115L7.69519 11.4197L7.86209 10.3111L7.96047 9.94244L7.95344 9.91787L7.87263 9.9284L7.03551 11.0756L5.76358 12.7934L4.75693 13.8703L4.51625 13.966L4.09725 13.7492L4.13678 13.363L4.37044 13.0207L5.76358 11.2494L6.60334 10.1522L7.14531 9.51762L7.1418 9.42545H7.11018L3.41034 11.827L2.75154 11.9112L2.46693 11.6461L2.50207 11.2108L2.63734 11.0686L3.75028 10.3041L3.74677 10.3076Z"
      fill="currentColor"
    />
  </svg>
);

export const MarkdownIcon = (properties: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={properties.className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...properties}
  >
    <rect height="18" rx="2" width="18" x="3" y="3" />
    <path d="M7 8v8M7 8l3 4L13 8v8M17 8v5h2L16.5 17 13.5 13H16V8" />
  </svg>
);
