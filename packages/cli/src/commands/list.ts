/* eslint-disable no-console */
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';

import { getAvailablePackages } from '../utils/registry';

export const listCommand = new Command()
  .name('list')
  .alias('ls')
  .description('List all available IdeasUI packages')
  .option('-d, --detailed', 'Show detailed information')
  .action(async (options) => {
    const spinner = ora('Fetching packages...').start();
    const packages = await getAvailablePackages();

    spinner.stop();

    console.log(chalk.cyan.bold('📦 Available IdeasUI Packages\n'));

    Object.entries(packages).forEach(([key, info]) => {
      if (options.detailed) {
        console.log(chalk.green(`${key}`));
        console.log(chalk.gray(`  Package: ${info.name}`));
        console.log(chalk.gray(`  Description: ${info.description}`));
        console.log(chalk.gray(`  Version: ${info.version}\n`));
      } else {
        const padding = 12;

        console.log(chalk.green(`${key.padEnd(padding)}`), chalk.gray(info.description));
      }
    });

    if (!options.detailed) {
      console.log(chalk.yellow('\n💡 Use --detailed for more information'));
    }

    console.log(chalk.cyan('\n🚀 Install with: ideasui add <component>'));
  });
