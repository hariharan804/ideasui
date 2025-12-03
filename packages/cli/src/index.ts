#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { createComponent } from './commands/create'
import { initProject } from './commands/init'

const program = new Command()

program
  .name('iui')
  .description('CLI for IdeasUI component library')
  .version('0.0.0')

program
  .command('create <type> <name>')
  .description('Create a new component')
  .option('-t, --template <template>', 'Component template', 'default')
  .option('-d, --dir <directory>', 'Output directory', './src/components')
  .action(createComponent)

program
  .command('init')
  .description('Initialize IdeasUI in your project')
  .option('-t, --typescript', 'Use TypeScript', true)
  .option('-s, --styled', 'Include styled components', false)
  .action(initProject)

program.on('command:*', () => {
  console.error(chalk.red(`Invalid command: ${program.args.join(' ')}`))
  console.log(chalk.yellow('See --help for a list of available commands.'))
  process.exit(1)
})

program.parse()

if (!process.argv.slice(2).length) {
  program.outputHelp()
}