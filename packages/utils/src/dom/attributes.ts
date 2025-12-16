/**
 * Convert boolean to data attribute value
 */
export function toDataAttr(condition: boolean | undefined): string | undefined {
  return condition ? 'true' : undefined
}
