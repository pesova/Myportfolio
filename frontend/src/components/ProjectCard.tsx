import type { KeyboardEvent } from 'react'
import { useEffect, useState } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import { projectHeroSrc, type Project } from '../data/projects'
import TiltedCard from './TiltedCard/TiltedCard'

/** Bottom of image fade — matches card face so image + text read as one lane */
const IMAGE_FADE =
  'linear-gradient(to bottom, transparent 0%, transparent 18%, rgba(12,12,18,0.35) 48%, rgba(12,12,18,0.82) 76%, rgb(12,12,18) 100%)'

type ProjectCardProps = {
  project: Project
  onOpenDetails: (project: Project) => void
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const fallbackSrc = `/assets/img/logos/${project.image}.webp`
  const [imgSrc, setImgSrc] = useState(() => projectHeroSrc(project))

  useEffect(() => {
    setImgSrc(projectHeroSrc(project))
  }, [project])

  function onKeyOpen(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpenDetails(project)
    }
  }

  function onImgError() {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <article className="overflow-visible rounded-2xl">
      <TiltedCard
        rotateAmplitude={11}
        scaleOnHover={1.03}
        className="w-full"
        innerClassName="origin-center"
      >
        <div className="group/card flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c12]/95 text-left shadow-xl shadow-black/30 ring-1 ring-white/[0.04]">
          <div
            role="button"
            tabIndex={0}
            aria-label={`${project.name} — open details`}
            className="cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
            onClick={() => onOpenDetails(project)}
            onKeyDown={onKeyOpen}
          >
            {/* Image lane: fixed aspect so object-cover never looks vertically squashed */}
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[5/3]">
              <img
                src={imgSrc}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
                onError={onImgError}
                loading="lazy"
                decoding="async"
              />
              {/* Fade image into text lane — single soft blend (reference: Kanish layout) */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: IMAGE_FADE }}
                aria-hidden
              />
            </div>

            <div className="relative z-[1] space-y-3 px-4 pt-1 pb-4">
              <h3 className="text-base font-semibold text-white transition-[color,filter,text-shadow] duration-300 ease-out group-hover/card:text-[#e9d5ff] group-hover/card:[text-shadow:0_0_20px_rgba(196,181,253,0.45),0_0_40px_rgba(232,121,249,0.15)]">
                {project.name}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/15 bg-black/35 px-2.5 py-0.5 text-xs text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.07] px-4 pb-4 pt-3">
            {project.siteUrl ? (
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-fuchsia-400 transition hover:text-fuchsia-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="size-4 shrink-0" aria-hidden />
                Live site
              </a>
            ) : null}
            {project.docsUrl ? (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 transition hover:text-sky-300"
                onClick={(e) => e.stopPropagation()}
              >
                <BookOpen className="size-4 shrink-0" aria-hidden />
                API docs
              </a>
            ) : null}
          </div>
        </div>
      </TiltedCard>
    </article>
  )
}
