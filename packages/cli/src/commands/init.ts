/* eslint-disable no-console */
import path from 'path';

import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';

interface InitOptions {
  typescript?: boolean;
  styled?: boolean;
}

export async function initProject(options: InitOptions): Promise<void> {
  const spinner = ora('Initializing IdeasUI...').start();

  try {
    // Check if package.json exists
    const packageJsonPath = path.join(process.cwd(), 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      spinner.fail('No package.json found. Run npm init first.');

      return;
    }

    // Ask for configuration
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _options = options;
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'componentsDir',
        message: 'Components directory:',
        default: './src/components',
      },
      {
        type: 'confirm',
        name: 'installDeps',
        message: 'Install IdeasUI dependencies?',
        default: true,
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Package manager:',
        choices: ['npm', 'yarn', 'pnpm'],
        default: 'npm',
        when: (answers) => answers.installDeps,
      },
    ]);

    // Create directories
    await fs.ensureDir(answers.componentsDir);
    await fs.ensureDir(path.join(answers.componentsDir, 'ui'));

    // Create config files
    await createConfigFiles(answers.componentsDir);

    // Install dependencies
    if (answers.installDeps) {
      spinner.text = 'Installing dependencies...';
      await installDependencies(answers.packageManager);
    }

    spinner.succeed(chalk.green('✨ IdeasUI initialized successfully!'));

    console.log(chalk.cyan('\nNext steps:'));
    console.log('  iui create component Button');
  } catch (error) {
    spinner.fail(chalk.red(`Failed to initialize: ${error}`));
    process.exit(1);
  }
}

async function createConfigFiles(componentsDir: string): Promise<void> {
  // Create components index
  const indexContent = `// Export your components here
export * from './ui'
`;

  await fs.writeFile(path.join(componentsDir, 'index.ts'), indexContent);

  // Create UI index
  const uiIndexContent = `// UI components will be exported here
`;

  await fs.writeFile(path.join(componentsDir, 'ui', 'index.ts'), uiIndexContent);
}

async function installDependencies(packageManager: string): Promise<void> {
  const { spawn } = require('child_process');

  const deps = [
    '@ideasui/provider',
    '@ideasui/tokens',
    '@ideasui/utils',
    'tailwind-variants',
    'react-aria',
  ];

  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, ['install', ...deps], {
      stdio: 'inherit',
    });

    child.on('close', (code: number) => {
      if (code !== 0) {
        reject(new Error(`${packageManager} install failed`));
      } else {
        resolve(void 0);
      }
    });
  });
}
