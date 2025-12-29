/**
 * Convert boolean to data attribute value
 * @param condition
 */
export function toDataAttr(condition: boolean | undefined): string | undefined {
  return condition ? "true" : undefined;
}
