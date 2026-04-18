import LogoLoop from './LogoLoop'
import { skillLogos } from '../data/skills'

/** Tech stack marquee only (LogoLoop). */
export function SkillsSection() {
  return (
    <section id="skills" className=" bg-black/25 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative  w-full overflow-hidden rounded-2xl bg-black/40"
          style={{ position: 'relative' }}
        >
          <LogoLoop
            logos={skillLogos}
            speed={95}
            direction="left"
            logoHeight={60}
            gap={72}
            hoverSpeed={0}     
            scaleOnHover
            fadeOut
            fadeOutColor="#050508"
            ariaLabel="Technologies and tools"
            className="h-full py-3"
            width="100%"
          />
        </div>
      </div>
    </section>
  )
}
