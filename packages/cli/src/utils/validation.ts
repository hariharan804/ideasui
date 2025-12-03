export function validateComponentName(name: string): boolean {
  // Check if name is PascalCase
  const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/
  return pascalCaseRegex.test(name)
}

export function validateProjectStructure(): boolean {
  // Check if current directory has package.json
  const fs = require('fs')
  return fs.existsSync('./package.json')
}

export function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}