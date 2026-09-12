#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { execSync } from 'node:child_process';
const __filename = fileURLToPath(import.meta.url);
// ─── Validators ───────────────────────────────────────────────────────────────
function validateConfig(config) {
  const errors = [];
  if (!config || typeof config !== 'object') {
    return ['Config must be a valid object'];
  }
  if (!config.output || typeof config.output !== 'object') {
    errors.push('"output" is required and must be an object with "path" and "filename"');
  } else {
    if (!config.output.path || typeof config.output.path !== 'string') {
      errors.push('"output.path" is required and must be a string');
    }
    if (!config.output.filename || typeof config.output.filename !== 'string') {
      errors.push('"output.filename" is required and must be a string');
    }
  }
  if (!config.interfaces || typeof config.interfaces !== 'object') {
    errors.push('"interfaces" is required and must be an object');
    return errors;
  }
  for (const [key, componentConfig] of Object.entries(config.interfaces)) {
    const prefix = `interfaces.${key}`;
    if (!componentConfig.componentName || typeof componentConfig.componentName !== 'string') {
      errors.push(`${prefix}.componentName is required and must be a string`);
    }
    if (!Array.isArray(componentConfig.interfaces) || componentConfig.interfaces.length === 0) {
      errors.push(`${prefix}.interfaces must be a non-empty array`);
      continue;
    }
    componentConfig.interfaces.forEach((iface, i) => {
      const ifacePrefix = `${prefix}.interfaces[${i}]`;
      if (!iface.name || typeof iface.name !== 'string') {
        errors.push(`${ifacePrefix}.name is required`);
      }
      if (!iface.title || typeof iface.title !== 'string') {
        errors.push(`${ifacePrefix}.title is required`);
      }
      if (!iface.filePath || typeof iface.filePath !== 'string') {
        errors.push(`${ifacePrefix}.filePath is required`);
      }
      if (!iface.interfaceName || typeof iface.interfaceName !== 'string') {
        errors.push(`${ifacePrefix}.interfaceName is required`);
      }
    });
  }
  return errors;
}
// ─── PropsExtractor ───────────────────────────────────────────────────────────
class PropsExtractor {
  constructor() {
    this.sourceFileCache = new Map();
  }
  // ─── Config ─────────────────────────────────────────────────────────────
  async loadConfig(configPath) {
    try {
      const configModule = await import('file://' + path.resolve(configPath));
      const config = configModule.extractConfig || configModule.default;
      const errors = validateConfig(config);
      if (errors.length > 0) {
        console.error('❌ Invalid config:');
        errors.forEach((e) => console.error(`   - ${e}`));
        return null;
      }
      return config;
    } catch (error) {
      console.error('❌ Failed to load config:', error.message);
      return null;
    }
  }
  // ─── Source File Cache ───────────────────────────────────────────────────
  getSourceFile(filePath) {
    if (this.sourceFileCache.has(filePath)) {
      return this.sourceFileCache.get(filePath);
    }
    const sourceCode = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true);
    this.sourceFileCache.set(filePath, sourceFile);
    return sourceFile;
  }
  // ─── Interface Extraction ────────────────────────────────────────────────
  extractInterfaceProps(filePath, interfaceName) {
    try {
      const sourceFile = this.getSourceFile(filePath);
      const props = [];
      let found = false;
      const visit = (node) => {
        if (ts.isInterfaceDeclaration(node) && node.name.text === interfaceName) {
          found = true;
          for (const member of node.members) {
            if (ts.isPropertySignature(member)) {
              const prop = this.extractProp(member, sourceFile);
              if (prop) props.push(prop);
            }
          }
          return;
        }
        ts.forEachChild(node, visit);
      };
      visit(sourceFile);
      if (!found) {
        console.warn(`  ⚠️  Interface "${interfaceName}" not found in ${path.basename(filePath)}`);
      }
      return props;
    } catch (error) {
      console.error(
        `  ❌ Failed to extract "${interfaceName}" from ${path.basename(filePath)}:`,
        error.message,
      );
      return [];
    }
  }
  // ─── Prop Extraction ─────────────────────────────────────────────────────
  extractProp(member, sourceFile) {
    const name = member.name?.text ?? member.name?.getText?.(sourceFile);
    if (!name) return null;
    const required = !member.questionToken;
    const type = member.type ? this.resolveType(member.type, sourceFile) : 'unknown';
    const { description, defaultValue, deprecated } = this.extractJSDoc(member, sourceFile);
    return { name, type, required, defaultValue, deprecated, description };
  }
  // ─── JSDoc Extraction ────────────────────────────────────────────────────
  processMultiLineComment(text, state) {
    const parsed = this.parseMultiLineComment(text);

    if (parsed.description) {
      state.description = parsed.description;
    }

    if (parsed.defaultValue) {
      state.defaultValue = parsed.defaultValue;
    }

    if (parsed.deprecated) {
      state.deprecated = true;

      if (parsed.reason) {
        state.description = state.description
          ? `${state.description} (Deprecated: ${parsed.reason})`
          : `Deprecated: ${parsed.reason}`;
      }
    }
  }

  processSingleLineComment(text, state) {
    const line = text.replace(/^\/\/\s?/, '').trim();

    if (line && !line.startsWith('@')) {
      state.description = line;
    }
  }

  extractJSDoc(member, sourceFile) {
    const state = {
      description: '',
      defaultValue: null,
      deprecated: false,
    };
    const fullText = sourceFile.getFullText();
    const leadingComments = ts.getLeadingCommentRanges(fullText, member.getFullStart());

    if (!leadingComments?.length) {
      return state;
    }

    for (const comment of leadingComments) {
      const text = fullText.slice(comment.pos, comment.end);

      if (comment.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
        this.processMultiLineComment(text, state);
      }

      if (comment.kind === ts.SyntaxKind.SingleLineCommentTrivia) {
        this.processSingleLineComment(text, state);
      }
    }

    return state;
  }

  parseMultiLineComment(text) {
    let description = '';
    let defaultValue = null;
    let deprecated = false;
    let reason = '';

    const lines = text
      .replace(/^\/\*+/, '')
      .replace(/\*\/$/, '')
      .split('\n')
      .map((line) => line.replace(/^\s*\*\s?/, '').trim())
      .filter((line) => line && !line.startsWith('@'));
    if (lines.length) description = lines.join(' ');

    const defaultMatch = text.match(/@default\s+(.+)/);
    if (defaultMatch) defaultValue = defaultMatch[1].trim();

    const deprecatedMatch = text.match(/@deprecated\s*(.*)/);
    if (deprecatedMatch) {
      deprecated = true;
      reason = deprecatedMatch[1].trim();
    }

    return { description, defaultValue, deprecated, reason };
  }
  // ─── Type Resolution ─────────────────────────────────────────────────────
  resolveType(typeNode, sourceFile) {
    switch (typeNode.kind) {
      case ts.SyntaxKind.StringKeyword:
        return 'string';
      case ts.SyntaxKind.NumberKeyword:
        return 'number';
      case ts.SyntaxKind.BooleanKeyword:
        return 'boolean';
      case ts.SyntaxKind.VoidKeyword:
        return 'void';
      case ts.SyntaxKind.NullKeyword:
        return 'null';
      case ts.SyntaxKind.UndefinedKeyword:
        return 'undefined';
      case ts.SyntaxKind.AnyKeyword:
        return 'any';
      case ts.SyntaxKind.NeverKeyword:
        return 'never';
      case ts.SyntaxKind.UnknownKeyword:
        return 'unknown';
      case ts.SyntaxKind.ObjectKeyword:
        return 'object';
      case ts.SyntaxKind.UnionType:
        return typeNode.types.map((t) => this.resolveType(t, sourceFile)).join(' | ');
      case ts.SyntaxKind.IntersectionType:
        return typeNode.types.map((t) => this.resolveType(t, sourceFile)).join(' & ');
      case ts.SyntaxKind.ArrayType:
        return `${this.resolveType(typeNode.elementType, sourceFile)}[]`;
      case ts.SyntaxKind.TupleType:
        return `[${typeNode.elements.map((t) => this.resolveType(t, sourceFile)).join(', ')}]`;
      case ts.SyntaxKind.ParenthesizedType:
        return `(${this.resolveType(typeNode.type, sourceFile)})`;
      case ts.SyntaxKind.LiteralType:
        if (ts.isStringLiteral(typeNode.literal)) return `"${typeNode.literal.text}"`;
        if (ts.isNumericLiteral(typeNode.literal)) return typeNode.literal.text;
        if (typeNode.literal.kind === ts.SyntaxKind.TrueKeyword) return 'true';
        if (typeNode.literal.kind === ts.SyntaxKind.FalseKeyword) return 'false';
        return typeNode.literal.text;
      case ts.SyntaxKind.TypeReference: {
        const typeName = ts.isQualifiedName(typeNode.typeName)
          ? this.resolveQualifiedName(typeNode.typeName)
          : typeNode.typeName.text;
        if (typeNode.typeArguments?.length) {
          const args = typeNode.typeArguments
            .map((a) => this.resolveType(a, sourceFile))
            .join(', ');
          return `${typeName}<${args}>`;
        }
        return typeName || this.getRawText(typeNode, sourceFile);
      }
      // All complex types: return raw source text
      case ts.SyntaxKind.FunctionType:
      case ts.SyntaxKind.ConstructorType:
      case ts.SyntaxKind.TypeLiteral:
      case ts.SyntaxKind.IndexedAccessType:
      case ts.SyntaxKind.ConditionalType:
      case ts.SyntaxKind.MappedType:
      case ts.SyntaxKind.TemplateLiteralType:
      default:
        return this.getRawText(typeNode, sourceFile);
    }
  }
  resolveQualifiedName(name) {
    if (ts.isQualifiedName(name)) {
      return `${this.resolveQualifiedName(name.left)}.${name.right.text}`;
    }
    return name.text;
  }
  getRawText(typeNode, sourceFile) {
    try {
      const sf = sourceFile ?? typeNode.getSourceFile();
      return sf.getFullText().slice(typeNode.getStart(sf), typeNode.getEnd()).trim();
    } catch {
      return 'unknown';
    }
  }
  // ─── Run Extraction ──────────────────────────────────────────────────────
  async run(config, configPath) {
    const results = {};
    const configDir = path.dirname(configPath);
    for (const [key, componentConfig] of Object.entries(config.interfaces)) {
      const { componentName, interfaces: interfaceArray } = componentConfig;
      results[key] = { componentName, interfaces: [] };
      for (const ifaceConfig of interfaceArray) {
        const resolvedName = ifaceConfig.componentName || componentName;
        const filePath = path.resolve(configDir, ifaceConfig.filePath);
        console.log(`  • [${resolvedName}] ${ifaceConfig.interfaceName}`);
        if (!fs.existsSync(filePath)) {
          console.warn(`    ⚠️  File not found: ${filePath}`);
          results[key].interfaces.push({
            ...ifaceConfig,
            resolvedComponentName: resolvedName,
            props: [],
          });
          continue;
        }
        const props = this.extractInterfaceProps(filePath, ifaceConfig.interfaceName);
        results[key].interfaces.push({
          ...ifaceConfig,
          resolvedComponentName: resolvedName,
          props,
        });
      }
    }
    return results;
  }
  // ─── Output ──────────────────────────────────────────────────────────────
  buildOutput(config, results) {
    const output = {};
    for (const [key] of Object.entries(config.interfaces)) {
      const result = results[key];
      if (!result) continue;
      output[key] = result.interfaces.map((iface) => ({
        componentName: iface.resolvedComponentName,
        title: iface.title,
        component: `<${iface.resolvedComponentName} />`,
        description: iface.description,
        props: iface.props,
      }));
    }
    return output;
  }
  writeOutput(outputPath, config, results) {
    const output = this.buildOutput(config, results);
    const componentList = Object.values(config.interfaces)
      .map((c) => ` * - ${c.componentName}: ${c.interfaces.map((i) => i.interfaceName).join(', ')}`)
      .join('\n');
    const docKeys = Object.keys(output)
      .map((k) => `  "${k}": ComponentDoc[];`)
      .join('\n');
    const content = [
      `// Auto-generated props documentation`,
      `// Extracted from actual TypeScript interfaces`,
      `// DO NOT EDIT MANUALLY\n`,
      `export interface PropInfo {`,
      `  name: string;`,
      `  type: string;`,
      `  required: boolean;`,
      `  defaultValue: string | null;`,
      `  deprecated: boolean;`,
      `  description: string;`,
      `}\n`,
      `export interface ComponentDoc {`,
      `  componentName: string;`,
      `  title: string;`,
      `  component: string;`,
      `  description: string;`,
      `  props: PropInfo[];`,
      `}\n`,
      `export interface PropsDocumentation {`,
      docKeys,
      `}\n`,
      `/**`,
      ` * Components extracted from TypeScript interfaces:`,
      componentList,
      ` */`,
      `export const propsDocumentation: PropsDocumentation = ${JSON.stringify(output, null, 2)};\n`,
      `export default propsDocumentation;`,
    ].join('\n');
    fs.writeFileSync(outputPath, content);

    // Format the generated file automatically using prettier
    try {
      execSync(`npx prettier --write "${outputPath}"`, { stdio: 'ignore' });
    } catch (error) {
      console.warn(
        '  ⚠️  Failed to automatically format output file using prettier:',
        error.message,
      );
    }
  }
}
// ─── CLI ──────────────────────────────────────────────────────────────────────
async function cli() {
  const args = process.argv.slice(2);
  if (args.includes('-h') || args.includes('--help')) {
    console.log(`
@ideasui/props-extractor
Extract React component props from TypeScript interfaces.
Usage:
  props-extractor [config-file]
Options:
  config-file    Path to config file (default: props-extractor.config.mjs)
  -h, --help     Show help
  -v, --version  Show version
Config format:
  export const extractConfig = {
    output: {
      path: "../../apps/docs/lib/docs",
      filename: "components-props.ts"
    },
    interfaces: {
      button: {
        componentName: "Button",
        interfaces: [
          {
            name: "Button",
            title: "Button Props",
            description: "Primary button component",
            filePath: "../src/components/Button/Button.tsx",
            interfaceName: "ButtonProps"
          }
        ]
      }
    }
  };
    `);
    return;
  }
  if (args.includes('-v') || args.includes('--version')) {
    const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    console.log(pkg.version);
    return;
  }
  const configFile = args[0] || 'props-extractor.config.mjs';
  const configPath = path.resolve(process.cwd(), configFile);
  if (!fs.existsSync(configPath)) {
    console.error(`❌ Config file not found: ${configPath}`);
    console.error(`   Create a "props-extractor.config.mjs" file or pass a custom path.`);
    process.exit(1);
  }
  const extractor = new PropsExtractor();
  const config = await extractor.loadConfig(configPath);
  if (!config) process.exit(1);
  const componentCount = Object.keys(config.interfaces).length;
  console.log(`\n@ideasui/props-extractor`);
  console.log(`─────────────────────────`);
  console.log(`Config:     ${configFile}`);
  console.log(`Output:     ${config.output.path}/${config.output.filename}`);
  console.log(`Components: ${componentCount}\n`);
  const results = await extractor.run(config, configPath);
  const outputDir = path.resolve(path.dirname(configPath), config.output.path);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, config.output.filename);
  extractor.writeOutput(outputPath, config, results);
  console.log(`\n✅ Generated: ${outputPath}`);
  console.log(`\nSummary:`);
  let totalProps = 0;
  for (const result of Object.values(results)) {
    console.log(`  📦 ${result.componentName}`);
    for (const iface of result.interfaces) {
      console.log(`     • ${iface.interfaceName}: ${iface.props.length} props`);
      totalProps += iface.props.length;
    }
  }
  console.log(`\n  Total: ${totalProps} props across ${componentCount} components\n`);
}
try {
  await cli();
} catch (error) {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
}
export { PropsExtractor, validateConfig };
