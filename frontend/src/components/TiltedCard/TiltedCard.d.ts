import type { ReactNode } from 'react'

export type TiltedCardProps = {
  children: ReactNode
  rotateAmplitude?: number
  scaleOnHover?: number
  className?: string
  innerClassName?: string
  showMobileWarning?: boolean
}

declare function TiltedCard(props: TiltedCardProps): JSX.Element
export default TiltedCard
