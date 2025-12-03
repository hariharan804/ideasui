import * as React from 'react'

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string
  color?: string
}