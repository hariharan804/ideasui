import fs from 'fs-extra'
import path from 'path'
import { componentTemplate, testTemplate, storyTemplate } from '../templates'

export interface GenerateOptions {
  type: 'component' | 'primitive' | 'hook'
  name: string
  template: string
  outputDir: string
  includeStories: boolean
  includeTests: boolean
  variant?: string
}

export async function generateComponent(options: GenerateOptions) {
  const { type, name, outputDir, includeStories, includeTests, variant } = options
  
  const componentDir = path.join(outputDir, name.toLowerCase())
  await fs.ensureDir(componentDir)

  // Generate main component file
  const componentContent = componentTemplate(name, variant || 'basic')
  await fs.writeFile(
    path.join(componentDir, `${name.toLowerCase()}.tsx`),
    componentContent
  )

  // Generate index file
  const indexContent = `export { ${name} } from './${name.toLowerCase()}'
export type { ${name}Props } from './${name.toLowerCase()}'
`
  await fs.writeFile(path.join(componentDir, 'index.ts'), indexContent)

  // Generate tests
  if (includeTests) {
    const testContent = testTemplate(name)
    await fs.writeFile(
      path.join(componentDir, `${name.toLowerCase()}.test.tsx`),
      testContent
    )
  }

  // Generate stories
  if (includeStories) {
    const storyContent = storyTemplate(name)
    await fs.writeFile(
      path.join(componentDir, `${name.toLowerCase()}.stories.tsx`),
      storyContent
    )
  }

  // Generate package.json for workspace
  const packageContent = {
    name: `@iui/${name.toLowerCase()}`,
    version: '0.0.0',
    description: `${name} component`,
    main: './index.ts',
    peerDependencies: {
      react: '>=18.0.0'
    },
    dependencies: {
      '@iui/utils': 'workspace:*',
      'tailwind-variants': '^0.1.20'
    }
  }
  
  await fs.writeFile(
    path.join(componentDir, 'package.json'),
    JSON.stringify(packageContent, null, 2)
  )
}