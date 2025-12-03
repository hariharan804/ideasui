import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'
import { generateComponent } from '../utils/generator'
import { validateComponentName } from '../utils/validation'

interface CreateOptions {
  template?: string
  dir?: string
}

export async function createComponent(
  type: string,
  name: string,
  options: CreateOptions
) {
  const spinner = ora('Creating component...').start()

  try {
    // Validate component name
    if (!validateComponentName(name)) {
      spinner.fail('Invalid component name. Use PascalCase (e.g., MyButton)')
      return
    }

    // Validate type
    const validTypes = ['component', 'primitive', 'hook']
    if (!validTypes.includes(type)) {
      spinner.fail(`Invalid type. Use: ${validTypes.join(', ')}`)
      return
    }

    // Ask for additional options
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'includeStories',
        message: 'Include Storybook stories?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeTests',
        message: 'Include unit tests?',
        default: true
      },
      {
        type: 'list',
        name: 'variant',
        message: 'Component variant:',
        choices: ['basic', 'with-variants', 'compound'],
        default: 'basic',
        when: () => type === 'component'
      }
    ])

    // Generate component
    await generateComponent({
      type,
      name,
      template: options.template || 'default',
      outputDir: options.dir || './src/components',
      includeStories: answers.includeStories,
      includeTests: answers.includeTests,
      variant: answers.variant
    })

    spinner.succeed(chalk.green(`✨ Created ${type}: ${name}`))
    
    console.log(chalk.cyan('\nNext steps:'))
    console.log(`  cd ${options.dir}/${name.toLowerCase()}`)
    console.log('  npm run dev')
    
  } catch (error) {
    spinner.fail(chalk.red(`Failed to create component: ${error}`))
    process.exit(1)
  }
}