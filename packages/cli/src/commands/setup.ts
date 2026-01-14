/* eslint-disable no-console */

import type { PackageInfo } from '../utils/registry';

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';

import { getAvailablePackages } from '../utils/registry';

export const setupCommand = new Command()
  .name('setup')
  .description('Setup IdeasUI in your project')
  .option('--skip-install', 'Skip package installation')
  .action(async (options) => {
    const cwd = process.cwd();

    console.log(chalk.cyan.bold('🎨 IdeasUI Setup\n'));

    // Check if package.json exists
    if (!existsSync(join(cwd, 'package.json'))) {
      console.error(
        chalk.red('❌ No package.json found. Please run this in a valid project directory.'),
      );
      process.exit(1);
    }

    // Get available packages dynamically
    const spinner = ora('Fetching available packages...').start();
    const availablePackages = await getAvailablePackages();

    spinner.stop();

    // Create choices from available packages
    const packageChoices = Object.entries(availablePackages).map(([key, info]) => ({
      name: `${info.description} (${info.name})`,
      value: key,
      checked: key === 'utils', // Utils checked by default
    }));

    // Interactive setup
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'packages',
        message: 'Which packages would you like to install?',
        choices: packageChoices,
      },
      {
        type: 'confirm',
        name: 'setupTailwind',
        message: 'Setup Tailwind CSS configuration?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'createExample',
        message: 'Create example component?',
        default: true,
      },
    ]);

    if (!options.skipInstall && answers.packages.length > 0) {
      const installSpinner = ora('Installing packages...').start();

      try {
        const packageManager = detectPackageManager();
        // eslint-disable-next-line security/detect-object-injection
        const packages = answers.packages.map((p: string) => availablePackages[p].name);
        const installCmd = buildInstallCommand(packageManager, packages);

        execSync(installCmd, { stdio: 'pipe', cwd });
        installSpinner.succeed('✅ Packages installed');
      } catch (error) {
        installSpinner.fail('❌ Installation failed');
        console.error(error);
      }
    }

    // Setup Tailwind config
    if (answers.setupTailwind) {
      setupTailwindConfig(cwd);
    }

    // Create example component
    if (answers.createExample) {
      createExampleComponent(cwd, answers.packages, availablePackages);
    }

    console.log(chalk.green.bold('\n🎉 Setup complete!'));
    console.log(chalk.cyan('\n📚 Next steps:'));
    console.log(chalk.gray("  • Import components: import {Button} from '@ideasui/button'"));
    console.log(chalk.gray('  • Check documentation: https://ideasui.dev'));
    console.log(chalk.gray('  • Join community: https://discord.gg/ideasui'));
  });

function detectPackageManager(): string {
  if (existsSync('pnpm-lock.yaml')) {
    return 'pnpm';
  }
  if (existsSync('yarn.lock')) {
    return 'yarn';
  }
  if (existsSync('bun.lockb')) {
    return 'bun';
  }

  return 'npm';
}

function buildInstallCommand(pm: string, packages: string[]): string {
  switch (pm) {
    case 'pnpm':
      return `pnpm add ${packages.join(' ')}`;
    case 'yarn':
      return `yarn add ${packages.join(' ')}`;
    case 'bun':
      return `bun add ${packages.join(' ')}`;
    default:
      return `npm install ${packages.join(' ')}`;
  }
}

function setupTailwindConfig(cwd: string): void {
  const configPath = join(cwd, 'tailwind.config.js');

  if (existsSync(configPath)) {
    console.log(chalk.yellow('⚠️  Tailwind config already exists, skipping...'));

    return;
  }

  const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

  writeFileSync(configPath, config);
  console.log(chalk.green('✅ Created tailwind.config.js'));
}

function createExampleComponent(
  cwd: string,
  packages: string[],
  _availablePackages: Record<string, PackageInfo>,
): void {
  const examplePath = join(cwd, 'example-component.tsx');

  if (existsSync(examplePath)) {
    console.log(chalk.yellow('⚠️  Example component already exists, skipping...'));

    return;
  }

  const imports: string[] = [];
  const jsx: string[] = [];

  if (packages.includes('button')) {
    imports.push(`import {Button} from "@ideasui/button";`);
    jsx.push(`      <Button variant="solid" color="primary">
        Click me
      </Button>`);
  }

  if (packages.includes('box')) {
    imports.push(`import {Box} from "@ideasui/box";`);
    jsx.push(`      <Box className="p-4 bg-gray-100 rounded">
        Box container
      </Box>`);
  }

  if (packages.includes('touchable')) {
    imports.push(`import {Touchable} from "@ideasui/touchable";`);
    jsx.push(`      <Touchable rippleColor="blue">
        Touchable with ripple
      </Touchable>`);
  }

  const example = `import React from "react";
${imports.join('\n')}

export function ExampleComponent() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">IdeasUI Example</h1>
${jsx.join('\n\n')}
    </div>
  );
}`;

  writeFileSync(examplePath, example);
  console.log(chalk.green('✅ Created example-component.tsx'));
}
