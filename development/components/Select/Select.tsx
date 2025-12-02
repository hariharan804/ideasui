'use client'
import * as React from 'react'
import { useSelect, useFocusRing } from 'react-aria'
import { useSelectState } from 'react-stately'
import { tv } from 'tailwind-variants'
import { cn } from '../../../packages/button/src/lib/utils'

const selectVariants = tv({
  base: 'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
})

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  label?: string
  onChange?: (value: string) => void
  className?: string
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ value, defaultValue, placeholder, options, disabled, label, onChange, className }, ref) => {
    const state = useSelectState({
      selectedKey: value,
      defaultSelectedKey: defaultValue,
      onSelectionChange: (key) => onChange?.(key as string),
      isDisabled: disabled,
      children: options.map((option) => ({
        key: option.value,
        textValue: option.label,
        isDisabled: option.disabled,
      })),
    })

    const selectRef = React.useRef<HTMLButtonElement>(null)
    React.useImperativeHandle(ref, () => selectRef.current!)

    const { triggerProps, valueProps, menuProps } = useSelect(
      { label, placeholder },
      state,
      selectRef
    )
    const { focusProps, isFocusVisible } = useFocusRing()

    return (
      <div className="w-full">
        {label && (
          <label className="text-sm font-medium leading-none mb-2 block">
            {label}
          </label>
        )}
        <button
          ref={selectRef}
          className={cn(
            selectVariants(),
            isFocusVisible && 'ring-2 ring-ring ring-offset-2',
            className
          )}
          {...triggerProps}
          {...focusProps}
        >
          <span {...valueProps}>
            {state.selectedItem?.textValue || placeholder}
          </span>
          <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {state.isOpen && (
          <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            <ul {...menuProps}>
              {options.map((option) => (
                <li
                  key={option.value}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'