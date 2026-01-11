import { execSync } from 'child_process';
import chalk from 'chalk';

export interface PackageInfo {
  name: string;
  description: string;
  version: string;
  keywords?: string[];
}

/**
 * Fetch available IdeasUI packages from npm registry
 */
export async function getAvailablePackages(): Promise<Record<string, PackageInfo>> {
  try {
    // Search for all @ideasui packages
    const result = execSync('npm search @ideasui --json', { encoding: 'utf8' });
    const packages = JSON.parse(result);

    const packageMap: Record<string, PackageInfo> = {};

    packages.forEach((pkg: any) => {
      if (pkg.name.startsWith('@ideasui/')) {
        const shortName = pkg.name.replace('@ideasui/', '');
        packageMap[shortName] = {
          name: pkg.name,
          description: pkg.description || 'IdeasUI component',
          version: pkg.version,
          keywords: pkg.keywords,
        };
      }
    });

    return packageMap;
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Could not fetch packages from registry, using fallback'));
    return getFallbackPackages();
  }
}

/**
 * Fallback package list when registry is unavailable
 */
function getFallbackPackages(): Record<string, PackageInfo> {
  return {
    utils: {
      name: '@ideasui/utils',
      description: 'Utility functions and helpers',
      version: '0.1.0',
    },
    button: {
      name: '@ideasui/button',
      description: 'Interactive button component with variants',
      version: '0.1.0',
    },
    ripple: {
      name: '@ideasui/ripple',
      description: 'Material Design ripple effects',
      version: '0.1.0',
    },
    touchable: {
      name: '@ideasui/touchable',
      description: 'Touchable wrapper with ripple effects',
      version: '0.1.0',
    },
    box: {
      name: '@ideasui/box',
      description: 'Flexible container component',
      version: '0.1.0',
    },
    hooks: {
      name: '@ideasui/hooks',
      description: 'Collection of React hooks',
      version: '0.1.0',
    },
    icons: {
      name: '@ideasui/icons',
      description: 'SVG icon library',
      version: '0.1.0',
    },
    theme: {
      name: '@ideasui/theme',
      description: 'Theme system and tokens',
      version: '0.1.0',
    },
  };
}
