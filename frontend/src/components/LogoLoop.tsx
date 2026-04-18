import type { ComponentType } from 'react'
import RawLogoLoop from './LogoLoopImpl.jsx'
import type { LogoLoopProps } from './LogoLoop.types'

const LogoLoop = RawLogoLoop as ComponentType<LogoLoopProps>

export default LogoLoop
export type { LogoLoopItem, LogoLoopProps } from './LogoLoop.types'
