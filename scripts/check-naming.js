#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Kebab-case segment regex
const kebabPart = '[a-z][a-z0-9]*(-[a-z0-9]+)*';
// Dot-separated kebab-case segments regex
const dotSeparatedKebab = `${kebabPart}(\\.${kebabPart})*`;

// Naming convention rules
const rules = {
  files: {
    components: new RegExp(`^${dotSeparatedKebab}\\.(tsx|ts|js|mjs|cjs|d\\.ts)$`),
    tests: new RegExp(`^${dotSeparatedKebab}\\.(test|spec)\\.(tsx|ts)$`),
    stories: new RegExp(`^${dotSeparatedKebab}\\.stories\\.(tsx|ts)$`),
    configs: new RegExp(`^${dotSeparatedKebab}\\.config\\.(js|ts|mjs|cjs)$`),
  },
  folders: new RegExp(`^${dotSeparatedKebab}$`),
  packageName: new RegExp(`^@${kebabPart}\\/${kebabPart}$`),
};

class NamingChecker {
  constructor() {
    this.errors = [];
  }

  checkFile(filePath) {
    const fileName = path.basename(filePath);

    // Ignore start with dot or index files
    if (fileName.startsWith('.') || fileName === 'index.ts' || fileName === 'index.tsx') {
      return;
    }

    // Ignore specific config files
    if (
      fileName.includes('config.') ||
      fileName === 'jest.d.ts' ||
      fileName === 'setupTests.ts' ||
      fileName === 'globals.d.ts' ||
      fileName === 'env.d.ts'
    ) {
      return;
    }

    let isValid = false;

    if (fileName.includes('.test.') || fileName.includes('.spec.')) {
      isValid = rules.files.tests.test(fileName);
    } else if (fileName.includes('.stories.')) {
      isValid = rules.files.stories.test(fileName);
    } else if (fileName.includes('.config.')) {
      isValid = rules.files.configs.test(fileName);
    } else if (
      fileName.endsWith('.tsx') ||
      fileName.endsWith('.ts') ||
      fileName.endsWith('.js') ||
      fileName.endsWith('.mjs') ||
      fileName.endsWith('.cjs') ||
      fileName.endsWith('.d.ts')
    ) {
      isValid = rules.files.components.test(fileName);
    } else {
      return;
    }

    if (!isValid) {
      this.errors.push(`❌ File: ${filePath} - should be kebab-case`);
    }
  }

  checkFolder(folderPath) {
    const folderName = path.basename(folderPath);

    if (folderName.startsWith('.') || folderName === 'node_modules' || folderName === '__tests__') {
      return;
    }

    // Ignore Next.js route groups
    if (folderName.startsWith('(') && folderName.endsWith(')')) {
      return;
    }

    // Ignore Next.js dynamic routing folder name shapes, e.g., [...slug] or [[...slug]]
    if (folderName.startsWith('[') && folderName.endsWith(']')) {
      return;
    }

    if (!rules.folders.test(folderName)) {
      this.errors.push(`❌ Folder: ${folderPath} - should be kebab-case`);
    }
  }

  checkPackageJson(packagePath) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

      // Ignore template package.json names which often contain handlebars
      if (packageJson.name && packageJson.name.includes('{{')) {
        return;
      }

      if (packageJson.name && !rules.packageName.test(packageJson.name)) {
        this.errors.push(`❌ Package: ${packagePath} - name should be @org/kebab-case`);
      }
    } catch (error) {
      // Skip invalid package.json files
    }
  }

  walkDirectory(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (
          item !== 'node_modules' &&
          item !== '.git' &&
          item !== 'dist' &&
          item !== '.next' &&
          item !== '.husky' &&
          item !== 'storybook-static' &&
          item !== '.github' &&
          item !== '.chrome-profile' &&
          item !== 'plop-templates'
        ) {
          this.checkFolder(fullPath);
          this.walkDirectory(fullPath);
        }
      } else {
        this.checkFile(fullPath);

        if (item === 'package.json') {
          this.checkPackageJson(fullPath);
        }
      }
    }
  }

  run() {
    console.log('🔍 Checking naming conventions...\n');

    this.walkDirectory('.');

    if (this.errors.length === 0) {
      console.log('✅ All naming conventions are correct!');
    } else {
      console.log('Naming Convention Errors:\n');
      this.errors.forEach((error) => console.log(error));
      console.log(`\n${this.errors.length} errors found`);
      process.exit(1);
    }
  }
}

const checker = new NamingChecker();
checker.run();
