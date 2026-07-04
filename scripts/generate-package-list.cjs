#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/* --------------------------------------------------------------------------
 * Low-level helpers
 * ----------------------------------------------------------------------- */

/**
 * Linear brace-depth parser. Returns the content between the opening '{' at
 * startIndex and its balanced closing '}'.
 */
function getBraceContent(str, startIndex) {
  let depth = 0;
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === '{') {
      depth++;
    } else if (str[i] === '}') {
      depth--;
      if (depth === 0) {
        return str.slice(startIndex + 1, i);
      }
    }
  }
  return null;
}

/** Trim and collapse internal newlines in a string */
function collapseWhitespace(str) {
  return str.trim().split('\n').map((l) => l.trim()).join(' ');
}

/* --------------------------------------------------------------------------
 * Content extractors (all regexes are linear / non-backtracking)
 * ----------------------------------------------------------------------- */

function extractComponentDocs(filePath) {
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf8');

  return {
    interfaces: extractInterfaces(content),
    types: extractTypes(content),
    props: extractProps(content),
    events: extractEvents(content),
    importInstructions: generateImportInstructions(filePath),
  };
}

function extractInterfaces(content) {
  // Find "export interface Name" then locate its opening brace linearly
  const headerRegex = /export interface (\w+)[^{]*?\{/g;
  const interfaces = [];
  let match;

  while ((match = headerRegex.exec(content)) !== null) {
    const name = match[1];
    const braceStart = match.index + match[0].length - 1;
    const body = getBraceContent(content, braceStart);
    if (body !== null) {
      interfaces.push({ name, props: extractPropsFromInterface(body) });
    }
  }

  return interfaces;
}

function extractTypes(content) {
  // [^;\n]+ avoids cross-line backtracking
  const typeRegex = /export type (\w+)\s*=\s*([^;\n]*?);/g;
  const types = [];
  let match;

  while ((match = typeRegex.exec(content)) !== null) {
    types.push({ name: match[1], definition: collapseWhitespace(match[2]) });
  }

  return types;
}

function extractConstants(content) {
  const constantRegex = /export const (\w+)\s*=\s*([^;\n]*?);/g;
  const constants = [];
  let match;

  while ((match = constantRegex.exec(content)) !== null) {
    constants.push({ name: match[1], value: collapseWhitespace(match[2]) });
  }

  return constants;
}

function extractFunctions(content) {
  const functionRegex = /\/\*\*([\s\S]*?)\*\/\s*export\s+(?:const|function)\s+(\w+)/g;
  const functions = [];
  let match;

  while ((match = functionRegex.exec(content)) !== null) {
    const description = match[1]
      .replaceAll('*', '')
      .replaceAll(/@\w+\s+[^\n]*/g, '')
      .trim();

    functions.push({ name: match[2], description });
  }

  return functions;
}

/* --------------------------------------------------------------------------
 * Prop / event extractors
 * ----------------------------------------------------------------------- */

/** Resolve event-handler or ElementType shorthands for a prop type */
function resolvePropType(propName, rawType) {
  if (propName.startsWith('on') && rawType.includes('=>')) {
    const m = rawType.match(/\(([^)]*?)\)\s*=>\s*(\w+)/);
    if (m) return `(${m[1]}) => ${m[2]}`;
  }
  if (propName === 'as' && rawType.includes('ElementType')) {
    return 'ElementType';
  }
  return rawType;
}

/** Parse a single JSDoc comment block attached to a prop */
function parseJsDocComment(comment) {
  const description = comment
    .replaceAll('*', '')
    .replaceAll(/@\w+\s+[^\n]*/g, '')
    .trim();

  const defaultMatch = comment.match(/@default\s+([^\n]+)/);
  const defaultValue = defaultMatch
    ? defaultMatch[1].trim().replaceAll('"', '').replaceAll("'", '')
    : undefined;

  const isDeprecated = /@deprecated/i.test(comment);

  return { description, defaultValue, isDeprecated };
}

function extractPropsFromInterface(interfaceBody) {
  // JSDoc-annotated props (non-greedy [\s\S]*? avoids backtracking)
  const propRegex = /\/\*\*([\s\S]*?)\*\/\s*(\w+)\??\s*:\s*([^;\n]*?);/g;
  const props = [];
  let match;

  while ((match = propRegex.exec(interfaceBody)) !== null) {
    const { description, defaultValue, isDeprecated } = parseJsDocComment(match[1]);
    const propName = match[2];
    const propType = collapseWhitespace(match[3]);

    props.push({
      name: propName,
      type: resolvePropType(propName, propType),
      description,
      optional: interfaceBody.includes(propName + '?:'),
      default: defaultValue,
      isDeprecated,
    });
  }

  // Simple props without JSDoc
  const simplePropRegex = /^\s*(\w+)\??\s*:\s*([^;\n]*?);/gm;
  let simpleMatch;

  while ((simpleMatch = simplePropRegex.exec(interfaceBody)) !== null) {
    const propName = simpleMatch[1];
    if (!props.find((p) => p.name === propName)) {
      const propType = collapseWhitespace(simpleMatch[2]);
      props.push({
        name: propName,
        type: resolvePropType(propName, propType),
        description: '',
        optional: interfaceBody.includes(propName + '?:'),
        default: undefined,
        isDeprecated: false,
      });
    }
  }

  return props;
}

function extractProps(content) {
  const propRegex = /@param\s+(\w+)\s+-\s+([^\n]+)/g;
  const props = [];
  let match;

  while ((match = propRegex.exec(content)) !== null) {
    props.push({ name: match[1], description: match[2].trim() });
  }

  return props;
}

function extractEvents(content) {
  const eventRegex = /on(\w+)\??\s*:\s*\(([^)]*)\)\s*=>\s*(\w+)/g;
  const events = [];
  let match;

  while ((match = eventRegex.exec(content)) !== null) {
    events.push({
      name: `on${match[1]}`,
      type: `(${match[2].trim()}) => ${match[3]}`,
      description: `Event handler for ${match[1].toLowerCase()} events`,
    });
  }

  return events;
}

/* --------------------------------------------------------------------------
 * Import instruction builder
 * ----------------------------------------------------------------------- */

function generateImportInstructions(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const componentName = fileName
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
    .replace(/^use/, 'use');

  const pathParts = filePath.split(path.sep);
  const packageIndex = pathParts.findIndex((part) => part === 'packages');
  if (packageIndex === -1) return [];

  const category = pathParts[packageIndex + 1];
  const packageName = pathParts[packageIndex + 2];

  if (category === 'components') {
    return [
      { method: 'global', code: `import { ${componentName} } from "@ideasui/react";`, description: 'Import from the main package (recommended)' },
      { method: 'individual', code: `import { ${componentName} } from "@ideasui/${packageName}";`, description: 'Import from individual package' },
    ];
  }

  return [
    { method: 'individual', code: `import { ${componentName} } from "@ideasui/${packageName}";`, description: 'Import from package' },
  ];
}

/* --------------------------------------------------------------------------
 * Package processor
 * ----------------------------------------------------------------------- */

function processPackage(pkgPath, category, displayName) {
  const packageJsonPath = path.join(pkgPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) return null;

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const readmePath = path.join(pkgPath, 'README.md');
  const srcPath = path.join(pkgPath, 'src');

  const componentFiles = [];
  const documentation = {};

  if (fs.existsSync(srcPath)) {
    const files = fs
      .readdirSync(srcPath)
      .filter((f) => (f.endsWith('.tsx') || f.endsWith('.ts')) && !f.includes('.test.') && !f.includes('.stories.') && f !== 'index.ts');

    for (const file of files) {
      componentFiles.push(file);
      const docs = extractComponentDocs(path.join(srcPath, file));
      if (docs) documentation[file] = docs;
    }
  }

  const relativePath = path.relative(path.join(__dirname, '..'), pkgPath).replaceAll('\\', '/');

  return {
    name: packageJson.name,
    displayName,
    version: packageJson.version,
    description: packageJson.description || '',
    path: relativePath,
    keywords: packageJson.keywords || [],
    hasReadme: fs.existsSync(readmePath),
    componentFiles,
    installCommands: {
      npm: `npm install ${packageJson.name}`,
      pnpm: `pnpm add ${packageJson.name}`,
      yarn: `yarn add ${packageJson.name}`,
      bun: `bun add ${packageJson.name}`,
    },
    installNote: 'The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.',
    documentation,
  };
}

/* --------------------------------------------------------------------------
 * Package list generator (cognitive complexity kept low via helpers)
 * ----------------------------------------------------------------------- */

/** Scan a category that contains one sub-package per directory */
function scanMultiPackageCategory(categoryPath, category) {
  const packages = [];
  const dirs = fs
    .readdirSync(categoryPath, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const d of dirs) {
    const pkg = processPackage(path.join(categoryPath, d.name), category, d.name);
    if (pkg) packages.push(pkg);
  }
  return packages;
}

/** Scan a category that is itself a single package (has package.json) */
function scanSinglePackageCategory(categoryPath, category) {
  const pkg = processPackage(categoryPath, category, category);
  return pkg ? [pkg] : [];
}

function generatePackageList() {
  const packagesDir = path.join(__dirname, '../packages');
  const output = { components: [], core: [], hooks: [], utils: [], icons: [], cli: [] };

  const categories = fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const category of categories) {
    const categoryPath = path.join(packagesDir, category);

    if (category === 'components' || category === 'hooks') {
      output[category] = scanMultiPackageCategory(categoryPath, category);
    } else if (fs.existsSync(path.join(categoryPath, 'package.json'))) {
      output[category] = scanSinglePackageCategory(categoryPath, category);
    } else {
      output[category] = scanMultiPackageCategory(categoryPath, category);
    }
  }

  return output;
}

/* --------------------------------------------------------------------------
 * Markdown generator (split into small helpers to reduce complexity)
 * ----------------------------------------------------------------------- */

function mdInstallSection(pkg) {
  let md = '#### Installation\n\n';
  md += '```bash\n';
  md += `# npm\n${pkg.installCommands.npm}\n\n`;
  md += `# pnpm\n${pkg.installCommands.pnpm}\n\n`;
  md += `# yarn\n${pkg.installCommands.yarn}\n\n`;
  md += `# bun\n${pkg.installCommands.bun}\n`;
  md += '```\n\n';
  md += `> ${pkg.installNote}\n\n`;
  return md;
}

function mdImportSection(docs) {
  if (!docs.importInstructions || docs.importInstructions.length === 0) return '';
  let md = '#### Import\n\n';
  for (const instr of docs.importInstructions) {
    md += `**${instr.description}**\n`;
    md += `\`\`\`tsx\n${instr.code}\n\`\`\`\n\n`;
  }
  return md;
}

function mdUsageSection(docs) {
  if (!docs.usage || docs.usage.length === 0) return '';
  let md = '#### Usage\n\n';
  for (const example of docs.usage) {
    md += `\`\`\`tsx\n${example}\n\`\`\`\n\n`;
  }
  return md;
}

function mdApiSection(docs) {
  if (!docs.interfaces || docs.interfaces.length === 0) return '';
  let md = '#### API Reference\n\n';
  for (const iface of docs.interfaces) {
    md += `##### ${iface.name}\n\n`;
    if (iface.props && iface.props.length > 0) {
      md += '| Prop | Type | Description | Optional |\n';
      md += '|------|------|-------------|----------|\n';
      for (const prop of iface.props) {
        md += `| ${prop.name} | \`${prop.type}\` | ${prop.description} | ${prop.optional ? '✓' : '✗'} |\n`;
      }
      md += '\n';
    }
  }
  return md;
}

function mdEventsSection(docs) {
  if (!docs.events || docs.events.length === 0) return '';
  let md = '#### Events\n\n';
  md += '| Event | Type |\n';
  md += '|-------|------|\n';
  for (const event of docs.events) {
    md += `| ${event.name} | \`${event.type}\` |\n`;
  }
  md += '\n';
  return md;
}

function mdTypesSection(docs) {
  if (!docs.types || docs.types.length === 0) return '';
  let md = '#### Types\n\n';
  for (const type of docs.types) {
    md += `\`\`\`tsx\ntype ${type.name} = ${type.definition}\n\`\`\`\n\n`;
  }
  return md;
}

function mdDocsSection(pkg) {
  if (!pkg.documentation || Object.keys(pkg.documentation).length === 0) return '';
  const mainFile = Object.keys(pkg.documentation)[0];
  const docs = pkg.documentation[mainFile];

  let md = '';
  md += mdImportSection(docs);
  md += mdUsageSection(docs);
  md += mdApiSection(docs);
  md += mdEventsSection(docs);
  md += mdTypesSection(docs);
  return md;
}

function mdDetailsSection(pkg) {
  let md = '#### Package Details\n\n';
  md += `- **Version:** ${pkg.version}\n`;
  md += `- **Path:** \`${pkg.path}\`\n`;
  if (pkg.keywords && pkg.keywords.length > 0) {
    md += `- **Keywords:** ${pkg.keywords.join(', ')}\n`;
  }
  if (pkg.componentFiles && pkg.componentFiles.length > 0) {
    md += `- **Files:** ${pkg.componentFiles.join(', ')}\n`;
  }
  md += '\n---\n\n';
  return md;
}

function generateMarkdown(packageList) {
  let markdown = '# IdeasUI Package List\n\n';
  markdown += `Generated on: ${new Date().toISOString()}\n\n`;

  for (const [category, packages] of Object.entries(packageList)) {
    if (packages.length === 0) continue;
    markdown += `## ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;

    for (const pkg of packages) {
      markdown += `### ${pkg.displayName || pkg.name}\n\n`;
      markdown += `**${pkg.description}**\n\n`;
      markdown += mdInstallSection(pkg);
      markdown += mdDocsSection(pkg);
      markdown += mdDetailsSection(pkg);
    }
  }

  return markdown;
}

/* --------------------------------------------------------------------------
 * Main
 * ----------------------------------------------------------------------- */

const packageList = generatePackageList();

fs.writeFileSync(
  path.join(__dirname, '../package-list.json'),
  JSON.stringify(packageList, null, 2),
);

const markdown = generateMarkdown(packageList);
fs.writeFileSync(path.join(__dirname, '../PACKAGE_LIST.md'), markdown);

console.log('✅ Package list generated:');
console.log('  - package-list.json');
console.log('  - PACKAGE_LIST.md');
