import type { CSSProperties, ReactNode } from 'react'

export type LogoLoopItem =
  | {
      node: ReactNode
      title?: string
      href?: string
      ariaLabel?: string
    }
  | {
      src: string
      alt?: string
      title?: string
      href?: string
      width?: number
      height?: number
      srcSet?: string
      sizes?: string
    }

export interface LogoLoopProps {
  logos: LogoLoopItem[]
  speed?: number
  direction?: 'left' | 'right' | 'up' | 'down'
  width?: string | number
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  hoverSpeed?: number
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  renderItem?: (item: LogoLoopItem, key: string | number) => ReactNode
  ariaLabel?: string
  className?: string
  style?: CSSProperties
}
