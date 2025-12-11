import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert boolean to data attribute value
 */
export function toDataAttr(condition: boolean | undefined): string | undefined {
  return condition ? 'true' : undefined
}

/**
 * Merge multiple props objects
 */
export function mergeProps(...props: Record<string, any>[]): Record<string, any> {
  const result: Record<string, any> = {}
  
  for (const prop of props) {
    for (const key in prop) {
      if (key === 'className' || key === 'class') {
        result.className = cn(result.className, prop[key])
      } else if (typeof prop[key] === 'function' && typeof result[key] === 'function') {
        const prevHandler = result[key]
        const currentHandler = prop[key]
        result[key] = (...args: any[]) => {
          prevHandler(...args)
          currentHandler(...args)
        }
      } else {
        result[key] = prop[key]
      }
    }
  }
  
  return result
}
