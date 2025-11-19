'use client'

import { Button, buildCompoundVariants } from '@your-org/button'

type Variant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link'
type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'gray'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'

const variants: Variant[] = ['solid', 'outline', 'ghost', 'soft', 'link']
const colors: Color[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'gray',
]
const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl', 'icon']

const ButtonShowcase = () => {
  console.debug(
    '🚀 ~ buildCompoundVariants ~ compound:',
    buildCompoundVariants()
  )
  return (
    <div className="space-y-8 p-4">
      {/* Variants Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Variants</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {variants.map((variant) => (
            <div key={variant} className="space-y-2 rounded-lg border p-4">
              <h3 className="font-semibold capitalize">{variant}</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant={variant} color="primary">
                  {variant}
                </Button>
                <Button variant={variant} color="primary" disabled>
                  Disabled
                </Button>
                <Button variant={variant} color="primary" loading>
                  Loading
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colors Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Colors</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {colors.map((color) => (
            <div key={color} className="space-y-2 rounded-lg border p-4">
              <h3 className="font-semibold capitalize">{color}</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="solid" color={color}>
                  {color}
                </Button>
                <Button variant="outline" color={color}>
                  Outline
                </Button>
                <Button variant="ghost" color={color}>
                  Ghost
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Sizes</h2>
        <div className="space-y-4 rounded-lg border p-4">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="w-16 text-sm font-medium capitalize">
                {size}:
              </span>
              <div className="flex flex-1 flex-wrap items-center gap-2">
                <Button
                  size={size}
                  variant="solid"
                  color="primary"
                  iconOnly={size === 'icon'}
                >
                  {size === 'icon' ? '★' : 'Button'}
                </Button>
                <Button
                  size={size}
                  variant="outline"
                  color="primary"
                  iconOnly={size === 'icon'}
                >
                  {size === 'icon' ? '★' : 'Outline'}
                </Button>
                <Button
                  size={size}
                  variant="ghost"
                  color="primary"
                  iconOnly={size === 'icon'}
                >
                  {size === 'icon' ? '★' : 'Ghost'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Width */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Full Width</h2>
        <div className="space-y-2">
          <Button fullWidth variant="solid" color="primary">
            Full Width Button
          </Button>
          <Button fullWidth variant="outline" color="primary">
            Full Width Outline
          </Button>
          <Button fullWidth variant="ghost" color="primary">
            Full Width Ghost
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ButtonPreview() {
  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Button Component</h1>
      <ButtonShowcase />
    </div>
  )
}
