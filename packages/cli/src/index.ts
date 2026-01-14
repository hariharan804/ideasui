#!/usr/bin/env node

/* eslint-disable no-console */

import { Command } from 'commander';
import chalk from 'chalk';

import { addCommand } from './commands/add';
import { listCommand } from './commands/list';
import { setupCommand } from './commands/setup';
import { initProject } from './commands/init';

const program = new Command();

program.name('ideasui').description('CLI for IdeasUI component library').version('0.1.0');

// Add commands
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(setupCommand);

program
  .command('init')
  .description('Initialize IdeasUI in your project')
  .option('-t, --typescript', 'Use TypeScript', true)
  .option('-s, --styled', 'Include styled components', false)
  .action(initProject);

// Default help
program.on('--help', () => {
  console.log('');
  console.log(chalk.cyan('Examples:'));
  console.log(chalk.gray('  $ ideasui setup          # Interactive setup'));
  console.log(chalk.gray('  $ ideasui add button     # Add button component'));
  console.log(chalk.gray('  $ ideasui list           # List all packages'));
  console.log('');
});

program.on('command:*', () => {
  console.error(chalk.red(`Invalid command: ${program.args.join(' ')}`));
  console.log(chalk.yellow('See --help for a list of available commands.'));
  process.exit(1);
});

program.parse();

if (process.argv.slice(2).length === 0) {
  program.outputHelp();
}
