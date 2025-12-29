#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Naming convention rules
const rules = {
  files: {
    components: /^[a-z][a-z0-9]*(-[a-z0-9]+)*\.(tsx|ts)$/,
    tests: /^[a-z][a-z0-9]*(-[a-z0-9]+)*\.(test|spec)\.(tsx|ts)$/,
    stories: /^[a-z][a-z0-9]*(-[a-z0-9]+)*\.stories\.(tsx|ts)$/,
    configs: /^[a-z][a-z0-9]*(-[a-z0-9]+)*\.config\.(js|ts)$/,
  },
  folders: /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,
  packageName: /^@[a-z][a-z0-9]*(-[a-z0-9]+)*\/[a-z][a-z0-9]*(-[a-z0-9]+)*$/,
};

class NamingChecker {
  constructor() {
    this.errors = [];
  }

  checkFile(filePath) {
    const fileName = path.basename(filePath);

    if (fileName.startsWith(".") || fileName === "index.ts" || fileName === "index.tsx") {
      return;
    }

    let isValid = false;

    if (fileName.includes(".test.") || fileName.includes(".spec.")) {
      isValid = rules.files.tests.test(fileName);
    } else if (fileName.includes(".stories.")) {
      isValid = rules.files.stories.test(fileName);
    } else if (fileName.includes(".config.")) {
      isValid = rules.files.configs.test(fileName);
    } else if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) {
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

    if (folderName.startsWith(".") || folderName === "node_modules" || folderName === "__tests__") {
      return;
    }

    if (!rules.folders.test(folderName)) {
      this.errors.push(`❌ Folder: ${folderPath} - should be kebab-case`);
    }
  }

  checkPackageJson(packagePath) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

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
        if (item !== "node_modules" && item !== ".git" && item !== "dist" && item !== ".next") {
          this.checkFolder(fullPath);
          this.walkDirectory(fullPath);
        }
      } else {
        this.checkFile(fullPath);

        if (item === "package.json") {
          this.checkPackageJson(fullPath);
        }
      }
    }
  }

  run() {
    console.log("🔍 Checking naming conventions...\n");

    this.walkDirectory(".");

    if (this.errors.length === 0) {
      console.log("✅ All naming conventions are correct!");
    } else {
      console.log("Naming Convention Errors:\n");
      this.errors.forEach((error) => console.log(error));
      console.log(`\n${this.errors.length} errors found`);
      process.exit(1);
    }
  }
}

const checker = new NamingChecker();
checker.run();
