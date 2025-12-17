import * as React from 'react'
import { getUniqueID } from '@ideasui/utils'
import type { RippleItem, UseRippleProps } from './ripple-types'

export function useRipple(props: UseRippleProps = {}) {
  const [ripples, setRipples] = React.useState<RippleItem[]>([])

  const onPress = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    const trigger = event.currentTarget
    const rect = trigger.getBoundingClientRect()
    const size = Math.max(trigger.clientWidth, trigger.clientHeight)

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: getUniqueID(prevRipples.length.toString()),
        size,
        x: x - size / 2,
        y: y - size / 2,
      },
    ])
  }, [])

  const onClear = React.useCallback((key: React.Key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key))
  }, [])

  return { ripples, onClear, onPress, ...props }
}

export type UseRippleReturn = ReturnType<typeof useRipple>
