export function componentTemplate(name: string, variant: string = 'basic'): string {
  return `'use client'
import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@iui/utils'

const ${name.toLowerCase()}Variants = tv({
  base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})

export interface ${name}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${name.toLowerCase()}Variants> {
  children?: React.ReactNode
}

export const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${name.toLowerCase()}Variants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

${name}.displayName = '${name}'
`
}

export function testTemplate(name: string): string {
  return `import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ${name} } from './${name.toLowerCase()}'

describe('${name}', () => {
  it('renders correctly', () => {
    render(<${name}>Test content</${name}>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<${name} variant="secondary">Test</${name}>)
    const element = screen.getByText('Test')
    expect(element).toHaveClass('bg-secondary')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<${name} ref={ref}>Test</${name}>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
`
}

export function storyTemplate(name: string): string {
  return `import type { Meta, StoryObj } from '@storybook/react'
import { ${name} } from './index'

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '${name} Component'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary ${name}'
  }
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <${name} size="sm">Small</${name}>
      <${name} size="md">Medium</${name}>
      <${name} size="lg">Large</${name}>
    </div>
  )
}
`
}
`