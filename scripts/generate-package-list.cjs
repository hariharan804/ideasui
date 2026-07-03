#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Helper to extract brace content linearly without backtracking regex
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

/**
 * Extract component documentation from TypeScript files
 */
function extractComponentDocs(filePath) {
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf8');

  // Extract comprehensive documentation
  const interfaces = extractInterfaces(content);
  const types = extractTypes(content);
  const props = extractProps(content);
  const events = extractEvents(content);
  const importInstructions = generateImportInstructions(filePath);

  return {
    interfaces,
    types,
    props,
    events,
    importInstructions,
  };
}

function extractInterfaces(content) {
  // Simpler regex to match interface export and find its opening brace
  const interfaceRegex = /export interface (\w+)\s*(?:extends[^{]*)?\s*({)/g;
  const interfaces = [];
  let match;

  while ((match = interfaceRegex.exec(content)) !== null) {
    const name = match[1];
    const startIndex = match.index + match[0].length - 1;
    const body = getBraceContent(content, startIndex);
    if (body !== null) {
      const props = extractPropsFromInterface(body);
      interfaces.push({ name, props });
    }
  }

  return interfaces;
}

function extractTypes(content) {
  // Linear regex that avoids nested quantifier backtracking
  const typeRegex = /export type (\w+)\s*=\s*([^;]+);/g;
  const types = [];
  let match;

  while ((match = typeRegex.exec(content)) !== null) {
    types.push({
      name: match[1],
      definition: match[2].trim().replaceAll(/\n\s*/g, ' '),
    });
  }

  return types;
}

function extractVariants(content) {
  // Look for variant props in interfaces and tailwind-variants
  const variants = new Set();

  // Extract from tailwind-variants tv() calls
  const tvRegex = /variants:\s*{([^}]+)}/g;
  let tvMatch;
  while ((tvMatch = tvRegex.exec(content)) !== null) {
    const variantBody = tvMatch[1];
    const variantKeyRegex = /(\w+):\s*{/g;
    let keyMatch;
    while ((keyMatch = variantKeyRegex.exec(variantBody)) !== null) {
      variants.add(keyMatch[1]);
    }
  }

  // Extract from interface prop types
  const variantRegex =
    /\*\s*@default\s+["'](\w+)["']|variant\??\s*:\s*["'](\w+)["']\s*\|\s*["'](\w+)["']/g;
  let match;
  while ((match = variantRegex.exec(content)) !== null) {
    if (match[1]) variants.add(match[1]);
    if (match[2]) variants.add(match[2]);
    if (match[3]) variants.add(match[3]);
  }

  // Extract variant values from union types
  const unionRegex = /:\s*["'](\w+)["'](?:\s*\|\s*["'](\w+)["'])*/g;
  while ((match = unionRegex.exec(content)) !== null) {
    if (match[1]) variants.add(match[1]);
    if (match[2]) variants.add(match[2]);
  }

  return Array.from(variants);
}

function extractConstants(content) {
  // Linear regex that avoids nested quantifier backtracking
  const constantRegex = /export const (\w+)\s*=\s*([^;]+);/g;
  const constants = [];
  let match;

  while ((match = constantRegex.exec(content)) !== null) {
    constants.push({
      name: match[1],
      value: match[2].trim().replaceAll(/\n\s*/g, ' '),
    });
  }

  return constants;
}

function extractFunctions(content) {
  // Non-greedy comment matching to prevent super-linear backtracking
  const functionRegex = /\/\*\*([\s\S]*?)\*\/\s*export\s+(?:const|function)\s+(\w+)/g;
  const functions = [];
  let match;

  while ((match = functionRegex.exec(content)) !== null) {
    const description = match[1]
      .replaceAll(/\*/g, '')
      .replaceAll(/@\w+\s+[^\n]*/g, '')
      .trim();

    functions.push({
      name: match[2],
      description,
    });
  }

  return functions;
}

function generateImportInstructions(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));

  // Convert kebab-case and camelCase to PascalCase
  const componentName = fileName
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
    .replace(/^use/, 'use'); // Keep 'use' prefix lowercase for hooks

  // Get package name from file path
  const pathParts = filePath.split(path.sep);
  const packageIndex = pathParts.findIndex((part) => part === 'packages');
  if (packageIndex === -1) return [];

  const category = pathParts[packageIndex + 1];
  const packageName = pathParts[packageIndex + 2];

  if (category === 'components') {
    return [
      {
        method: 'global',
        code: `import { ${componentName} } from "@ideasui/react";`,
        description: 'Import from the main package (recommended)',
      },
      {
        method: 'individual',
        code: `import { ${componentName} } from "@ideasui/${packageName}";`,
        description: 'Import from individual package',
      },
    ];
  }

  return [
    {
      method: 'individual',
      code: `import { ${componentName} } from "@ideasui/${packageName}";`,
      description: 'Import from package',
    },
  ];
}

function extractClassNames(content) {
  const classRegex = /className[s]?\s*[=:]\s*["'`]([^"'`]+)["'`]/g;
  const classes = new Set();
  let match;

  while ((match = classRegex.exec(content)) !== null) {
    const classNames = match[1].split(/\s+/).filter((cls) => cls.length > 0);
    classNames.forEach((cls) => classes.add(cls));
  }

  return Array.from(classes);
}

function extractAnimations(content) {
  const animations = [];

  // Look for framer-motion props
  const motionRegex =
    /(initial|animate|exit|transition|variants)\s*[=:]\s*({[^}]+}|["'][^"']+["'])/g;
  let match;

  while ((match = motionRegex.exec(content)) !== null) {
    animations.push({
      prop: match[1],
      value: match[2],
    });
  }

  // Look for CSS animations
  const cssAnimationRegex = /animation[s]?\s*[=:]\s*["'`]([^"'`]+)["'`]/g;
  while ((match = cssAnimationRegex.exec(content)) !== null) {
    animations.push({
      prop: 'animation',
      value: match[1],
    });
  }

  return animations;
}

function extractPropsFromInterface(interfaceBody) {
  // Non-greedy and linear matching for prop definitions with comments
  const propRegex = /\/\*\*([\s\S]*?)\*\/\s*(\w+)\??\s*:\s*([^;]+);/g;
  const props = [];
  let match;

  while ((match = propRegex.exec(interfaceBody)) !== null) {
    const comment = match[1];
    const propName = match[2];
    const propType = match[3].trim().replaceAll(/\n\s*/g, ' ');
    const isOptional = interfaceBody.includes(propName + '?:');

    // Extract description
    const description = comment
      .replaceAll(/\*/g, '')
      .replaceAll(/@\w+\s+[^\n]*/g, '') // Remove @tags
      .trim();

    // Extract @default value
    const defaultMatch = comment.match(/@default\s+([^\n]+)/);
    const defaultValue = defaultMatch ? defaultMatch[1].trim().replaceAll(/["']/g, '') : undefined;

    // Check if deprecated
    const isDeprecated = /@deprecated/i.test(comment);

    // Handle event types with proper signature
    let finalType = propType;
    if (propName.startsWith('on') && propType.includes('=>')) {
      // Extract event signature: (param: type) => void
      const eventMatch = propType.match(/\(([^)]*)\)\s*=>\s*(\w+)/);
      if (eventMatch) {
        finalType = `(${eventMatch[1]}) => ${eventMatch[2]}`;
      }
    }

    // Handle ElementType for 'as' prop
    if (
      propName === 'as' &&
      (propType.includes('ElementType') || propType.includes('React.ElementType'))
    ) {
      finalType = 'ElementType';
    }

    props.push({
      name: propName,
      type: finalType,
      description,
      optional: isOptional,
      default: defaultValue,
      isDeprecated,
    });
  }

  // Also extract simple props without JSDoc in linear complexity
  const simplePropRegex = /^\s*(\w+)\??\s*:\s*([^;]+);/gm;
  let simpleMatch;

  while ((simpleMatch = simplePropRegex.exec(interfaceBody)) !== null) {
    const propName = simpleMatch[1];
    // Skip if already found with JSDoc
    if (!props.find((p) => p.name === propName)) {
      let propType = simpleMatch[2].trim().replaceAll(/\n\s*/g, ' ');

      // Handle ElementType for 'as' prop
      if (
        propName === 'as' &&
        (propType.includes('ElementType') || propType.includes('React.ElementType'))
      ) {
        propType = 'ElementType';
      }

      props.push({
        name: propName,
        type: propType,
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
    props.push({
      name: match[1],
      description: match[2].trim(),
    });
  }

  return props;
}

function extractEvents(content) {
  const eventRegex = /on(\w+)\??\s*:\s*\(([^)]*)\)\s*=>\s*(\w+)/g;
  const events = [];
  let match;

  while ((match = eventRegex.exec(content)) !== null) {
    const eventName = `on${match[1]}`;
    const params = match[2].trim();
    const returnType = match[3];

    events.push({
      name: eventName,
      type: `(${params}) => ${returnType}`,
      description: `Event handler for ${match[1].toLowerCase()} events`,
    });
  }

  return events;
}

function extractImports(content) {
  const importRegex = /import\s+{([^}]+)}\s+from\s+["']([^"']+)["']/g;
  const imports = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const components = match[1].split(',').map((c) => c.trim());
    imports.push({
      components,
      from: match[2],
    });
  }

  return imports;
}

function extractUsageExamples(content) {
  const exampleRegex = /@example\s*```([^`]+)```/g;
  const examples = [];
  let match;

  while ((match = exampleRegex.exec(content)) !== null) {
    examples.push(match[1].trim());
  }

  return examples;
}

/**
 * Process a package directory to extract metadata and documentation
 */
function processPackage(pkgPath, category, displayName) {
  const packageJsonPath = path.join(pkgPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) return null;

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const readmePath = path.join(pkgPath, 'README.md');
  const srcPath = path.join(pkgPath, 'src');

  // Get component files and extract docs
  const componentFiles = [];
  const documentation = {};

  if (fs.existsSync(srcPath)) {
    const files = fs
      .readdirSync(srcPath)
      .filter((file) => file.endsWith('.tsx') || file.endsWith('.ts'))
      .filter(
        (file) => !file.includes('.test.') && !file.includes('.stories.') && file !== 'index.ts',
      );

    for (const file of files) {
      componentFiles.push(file);
      const filePath = path.join(srcPath, file);
      const docs = extractComponentDocs(filePath);
      if (docs) {
        documentation[file] = docs;
      }
    }
  }

  // Generate installation commands
  const installCommands = {
    npm: `npm install ${packageJson.name}`,
    pnpm: `pnpm add ${packageJson.name}`,
    yarn: `yarn add ${packageJson.name}`,
    bun: `bun add ${packageJson.name}`,
  };

  const relativePath = path.relative(path.join(__dirname, '..'), pkgPath).replaceAll(/\\/g, '/');

  return {
    name: packageJson.name,
    displayName,
    version: packageJson.version,
    description: packageJson.description || '',
    path: relativePath,
    keywords: packageJson.keywords || [],
    hasReadme: fs.existsSync(readmePath),
    componentFiles,
    installCommands,
    installNote:
      'The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.',
    documentation,
  };
}

/**
 * Generate package list for docs repository
 */
function generatePackageList() {
  const packagesDir = path.join(__dirname, '../packages');
  const output = {
    components: [],
    core: [],
    hooks: [],
    utils: [],
    icons: [],
    cli: [],
  };

  // Read all package directories
  const categories = fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const category of categories) {
    const categoryPath = path.join(packagesDir, category);

    if (category === 'components' || category === 'hooks') {
      // These have subdirectories for each package
      const packages = [];
      const packageDirs = fs
        .readdirSync(categoryPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory());

      for (const dirent of packageDirs) {
        const pkgPath = path.join(categoryPath, dirent.name);
        const pkgData = processPackage(pkgPath, category, dirent.name);
        if (pkgData) {
          packages.push(pkgData);
        }
      }

      output[category] = packages;
    } else {
      // Single package directories (utils, icons, cli, core subdirs)
      const packageJsonPath = path.join(categoryPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const pkgData = processPackage(categoryPath, category, category);
        if (pkgData) {
          output[category].push(pkgData);
        }
      } else {
        // Check for subdirectories (like core/variants, core/theme-controller)
        const subDirs = [];
        const subDirsEntries = fs
          .readdirSync(categoryPath, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory());

        for (const dirent of subDirsEntries) {
          const pkgPath = path.join(categoryPath, dirent.name);
          const pkgData = processPackage(pkgPath, category, dirent.name);
          if (pkgData) {
            subDirs.push(pkgData);
          }
        }

        output[category] = subDirs;
      }
    }
  }

  return output;
}

// Generate and save the package list
const packageList = generatePackageList();

// Save as JSON
fs.writeFileSync(
  path.join(__dirname, '../package-list.json'),
  JSON.stringify(packageList, null, 2),
);

// Save as markdown for docs
const markdown = generateMarkdown(packageList);
fs.writeFileSync(path.join(__dirname, '../PACKAGE_LIST.md'), markdown);

console.log('✅ Package list generated:');
console.log('  - package-list.json');
console.log('  - PACKAGE_LIST.md');

function generateMarkdown(packageList) {
  let markdown = '# IdeasUI Package List\n\n';
  markdown += `Generated on: ${new Date().toISOString()}\n\n`;

  for (const [category, packages] of Object.entries(packageList)) {
    if (packages.length === 0) continue;

    markdown += `## ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;

    for (const pkg of packages) {
      markdown += `### ${pkg.displayName || pkg.name}\n\n`;
      markdown += `**${pkg.description}**\n\n`;

      // Installation
      markdown += `#### Installation\n\n`;
      markdown += `\`\`\`bash\n`;
      markdown += `# npm\n${pkg.installCommands.npm}\n\n`;
      markdown += `# pnpm\n${pkg.installCommands.pnpm}\n\n`;
      markdown += `# yarn\n${pkg.installCommands.yarn}\n\n`;
      markdown += `# bun\n${pkg.installCommands.bun}\n`;
      markdown += `\`\`\`\n\n`;
      markdown += `> ${pkg.installNote}\n\n`;

      // Import
      if (pkg.documentation && Object.keys(pkg.documentation).length > 0) {
        const mainFile = Object.keys(pkg.documentation)[0];
        const docs = pkg.documentation[mainFile];

        // Import Instructions
        if (docs.importInstructions && docs.importInstructions.length > 0) {
          markdown += `#### Import\n\n`;
          for (const instruction of docs.importInstructions) {
            markdown += `**${instruction.description}**\n`;
            markdown += `\`\`\`tsx\n${instruction.code}\n\`\`\`\n\n`;
          }
        }

        // Usage Examples
        if (docs.usage && docs.usage.length > 0) {
          markdown += `#### Usage\n\n`;
          for (const example of docs.usage) {
            markdown += `\`\`\`tsx\n${example}\n\`\`\`\n\n`;
          }
        }

        // Props/API
        if (docs.interfaces && docs.interfaces.length > 0) {
          markdown += `#### API Reference\n\n`;
          for (const iface of docs.interfaces) {
            markdown += `##### ${iface.name}\n\n`;
            if (iface.props && iface.props.length > 0) {
              markdown += `| Prop | Type | Description | Optional |\n`;
              markdown += `|------|------|-------------|----------|\n`;
              for (const prop of iface.props) {
                markdown += `| ${prop.name} | \`${prop.type}\` | ${prop.description} | ${prop.optional ? '✓' : '✗'} |\n`;
              }
              markdown += `\n`;
            }
          }
        }

        // Events
        if (docs.events && docs.events.length > 0) {
          markdown += `#### Events\n\n`;
          markdown += `| Event | Type |\n`;
          markdown += `|-------|------|\n`;
          for (const event of docs.events) {
            markdown += `| ${event.name} | \`${event.type}\` |\n`;
          }
          markdown += `\n`;
        }

        // Types
        if (docs.types && docs.types.length > 0) {
          markdown += `#### Types\n\n`;
          for (const type of docs.types) {
            markdown += `\`\`\`tsx\n`;
            markdown += `type ${type.name} = ${type.definition}\n`;
            markdown += `\`\`\`\n\n`;
          }
        }
      }

      markdown += `#### Package Details\n\n`;
      markdown += `- **Version:** ${pkg.version}\n`;
      markdown += `- **Path:** \`${pkg.path}\`\n`;
      if (pkg.keywords && pkg.keywords.length > 0) {
        markdown += `- **Keywords:** ${pkg.keywords.join(', ')}\n`;
      }
      if (pkg.componentFiles && pkg.componentFiles.length > 0) {
        markdown += `- **Files:** ${pkg.componentFiles.join(', ')}\n`;
      }
      markdown += `\n---\n\n`;
    }
  }

  return markdown;
}
