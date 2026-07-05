/**
 * API Package Detection Script
 *
 * Purpose: Automatically detects packages that expose public APIs for documentation generation
 *
 * Why this file exists:
 * - Identifies packages that need API documentation (TypeScript types)
 * - Filters out private packages and CLI tools that don't need public API docs
 * - Used by documentation build process to generate API references
 * - Ensures only relevant packages are included in API documentation
 *
 * Usage:
 * - Called by build scripts to determine which packages to document
 * - Outputs space-separated list of package names for further processing
 * - Integrates with TypeDoc or similar documentation generators
 *
 * Criteria for API packages:
 * - Must be public (not private in package.json)
 * - Must not be CLI tools (no bin field)
 * - Must expose TypeScript types (types field or exports.types)
 */

import fs from 'node:fs';
import path from 'node:path';

// Get the root directory and packages directory
const root = process.cwd();
const packagesDir = path.join(root, 'packages');

// Array to store packages that expose public APIs
const apiPackages = [];

// Build a list of package directories to scan (handles categorized packages e.g., components/* and core/*)
const packagePaths = [];

for (const item of fs.readdirSync(packagesDir)) {
  const itemPath = path.join(packagesDir, item);
  if (!fs.existsSync(itemPath) || !fs.statSync(itemPath).isDirectory()) continue;

  if (item === 'components' || item === 'core') {
    for (const subItem of fs.readdirSync(itemPath)) {
      const subItemPath = path.join(itemPath, subItem);
      if (fs.statSync(subItemPath).isDirectory()) {
        packagePaths.push(subItemPath);
      }
    }
  } else {
    packagePaths.push(itemPath);
  }
}

// Iterate through all candidate package directories
for (const pkgPath of packagePaths) {
  const pkgJsonPath = path.join(pkgPath, 'package.json');

  // Skip if package.json doesn't exist
  if (!fs.existsSync(pkgJsonPath)) continue;

  // Parse package.json
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

  // ❌ Skip private packages (internal use only)
  if (pkg.private) continue;

  // ❌ Skip CLI packages (no public API to document)
  if (pkg.bin) continue;

  // ✅ Check if package exposes TypeScript types (has public API)
  const hasTypes =
    pkg.types || // Direct types field
    (pkg.exports &&
      Object.values(pkg.exports).some(
        (e) => typeof e === 'object' && e.types, // Types in exports map
      ));

  // Skip packages without type definitions
  if (!hasTypes) continue;

  // Add to API packages list
  apiPackages.push(pkg.name);
}

// Handle case where no API packages are found
if (!apiPackages.length) {
  console.log('No API packages detected.');
  process.exit(0);
}

// Output space-separated list of API package names
// This output is consumed by documentation build scripts
console.log(apiPackages.join(' '));
