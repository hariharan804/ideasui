import { colors, spacing, fontSize, boxShadow, borderRadius, breakpoints, zIndex } from '../index'

describe('Design Tokens', () => {
  describe('Colors', () => {
    it('should have primary color scale', () => {
      expect(colors.primary).toBeDefined()
      expect(colors.primary[500]).toBe('#0ea5e9')
      expect(Object.keys(colors.primary)).toHaveLength(11)
    })

    it('should have all semantic colors', () => {
      expect(colors.primary).toBeDefined()
      expect(colors.secondary).toBeDefined()
      expect(colors.success).toBeDefined()
      expect(colors.warning).toBeDefined()
      expect(colors.danger).toBeDefined()
      expect(colors.neutral).toBeDefined()
    })
  })

  describe('Spacing', () => {
    it('should have correct spacing values', () => {
      expect(spacing[0]).toBe('0px')
      expect(spacing[4]).toBe('1rem')
      expect(spacing[8]).toBe('2rem')
    })

    it('should have all spacing keys', () => {
      expect(Object.keys(spacing)).toContain('0')
      expect(Object.keys(spacing)).toContain('96')
    })
  })

  describe('Typography', () => {
    it('should have font sizes with line heights', () => {
      expect(fontSize.base).toEqual(['1rem', { lineHeight: '1.5rem' }])
      expect(fontSize.lg).toEqual(['1.125rem', { lineHeight: '1.75rem' }])
    })
  })

  describe('Shadows', () => {
    it('should have box shadow values', () => {
      expect(boxShadow.sm).toContain('rgb(0 0 0 / 0.1)')
      expect(boxShadow.none).toBe('none')
    })
  })

  describe('Border Radius', () => {
    it('should have radius values', () => {
      expect(borderRadius.none).toBe('0px')
      expect(borderRadius.md).toBe('0.375rem')
      expect(borderRadius.full).toBe('9999px')
    })
  })

  describe('Breakpoints', () => {
    it('should have responsive breakpoints', () => {
      expect(breakpoints.sm).toBe('640px')
      expect(breakpoints.lg).toBe('1024px')
    })
  })

  describe('Z-Index', () => {
    it('should have layered z-index values', () => {
      expect(zIndex.base).toBe(0)
      expect(zIndex.modal).toBe(1400)
      expect(zIndex.tooltip).toBe(1800)
    })
  })
})