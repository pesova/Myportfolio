import { useState, type SubmitEvent, type SVGProps } from 'react'
import { BookOpen, Briefcase, ExternalLink, Mail, User } from 'lucide-react'
import { projectHeroSrc, projects, type Project } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SkillsSection } from './SkillsSection'

const FORMSPREE_ID = 'mgozgjjj'

/** Same gradient + glow as hero “Pesova”; sized for section headings */
const SECTION_TITLE_CLASS =
  'bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent [filter:drop-shadow(0_0_28px_rgba(167,139,250,0.55))_drop-shadow(0_0_52px_rgba(34,211,238,0.3))] sm:text-4xl lg:text-5xl motion-reduce:[filter:none]'

function FooterIconGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.692 24 18.108 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function FooterIconLinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function FooterIconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function ModalProjectHero({ project }: { project: Project }) {
  const fallback = `/assets/img/logos/${project.image}.webp`
  const primary = projectHeroSrc(project)
  return (
    <img
      key={project.name}
      src={primary}
      alt=""
      className="mt-4 max-h-48 w-full rounded-xl object-cover"
      onError={(e) => {
        const el = e.currentTarget
        if (project.screenshot && !el.dataset.fallback) {
          el.dataset.fallback = '1'
          el.src = fallback
        }
      }}
    />
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  if (!project) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="scrollbar-themed relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 hover:bg-white/10"
        >
          Close
        </button>
        <h2 id="project-title" className="pr-12 text-xl font-semibold text-white">
          {project.name}
        </h2>
        <p className="mt-1 text-sm text-violet-300/90">{project.description}</p>
        <ModalProjectHero project={project} />
        <div
          className="prose prose-invert mt-4 max-w-none text-sm prose-p:text-slate-300 prose-headings:text-white"
          dangerouslySetInnerHTML={{ __html: project.long_description }}
        />
        <ul className="mt-4 space-y-1 text-xs text-slate-400">
          <li>Date: {project.date}</li>
          <li>Client: {project.client}</li>
          <li>Category: {project.category}</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.siteUrl ? (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500"
            >
              <ExternalLink className="size-4" aria-hidden />
              Live site
            </a>
          ) : null}
          {project.docsUrl ? (
            <a
              href={project.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-200 hover:bg-violet-500/20"
            >
              <BookOpen className="size-4" aria-hidden />
              API docs
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function PortfolioApp() {
  const [modal, setModal] = useState<Project | null>(null)
  const [formMsg, setFormMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [sending, setSending] = useState(false)

  async function onSubmitForm(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormMsg(null)
    setSending(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      })
      const data = (await res.json()) as { ok?: boolean }
      if (res.ok && data.ok) {
        setFormMsg({ type: 'ok', text: 'Thank you for contacting me.' })
        form.reset()
      } else {
        setFormMsg({ type: 'err', text: 'Could not send. Try again or email directly.' })
      }
    } catch {
      setFormMsg({ type: 'err', text: 'Network error. Try again.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="dark relative flex h-full min-h-0 flex-col text-slate-200">
      <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-black/35 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#top" className="text-lg font-semibold tracking-tight text-white">
            Pesova
          </a>
          <ul className="flex gap-6 text-sm font-medium text-slate-400">
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-white">
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-white">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div
        id="portfolio-scroll"
        className="portfolio-scroll scrollbar-themed min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain"
      >
        <main className="relative z-10">
          <section
            id="top"
            className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl flex-col items-center justify-center px-4 pb-24 pt-28 text-center sm:min-h-[calc(100dvh-5.5rem)] sm:px-6 sm:pt-32"
          >
            <h1 className="max-w-4xl">
              <span
                className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-7xl md:text-8xl font-bold tracking-tight text-transparent [filter:drop-shadow(0_0_28px_rgba(167,139,250,0.55))_drop-shadow(0_0_52px_rgba(34,211,238,0.3))] sm:text-6xl lg:text-7xl motion-reduce:[filter:none] animate-glow"
              >
                Pesova
              </span>
            </h1>
            <div className="relative inline-block">
              <h2 className="mt-5 text-4xl md:text-4xl font-bold mb-4 animate-float">
              Backend Developer</h2>
              <div
              className="absolute w-full h-0.5 bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400 opacity-95 animate-pulse"
              aria-hidden
            />
            </div>
            
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Delivering powerful backend systems driven by a passion for solving real-world challenges, scalable APIs, secure money flows, and clear architecture with TypeScript, Node.js, and
              FinTech-grade rigor. Based in Nigeria.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <a
                href="#projects"
                className="group relative inline-flex rounded-xl shadow-lg shadow-violet-600/25 outline-none transition hover:shadow-violet-500/35 focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508]"
              >
                <span
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
                  aria-hidden
                >
                  <span
                    className="absolute left-1/2 top-1/2 aspect-square w-[220%] max-w-none bg-[conic-gradient(from_0deg_at_50%_50%,#ddd6fe,#e879f9,#22d3ee,#a78bfa,#f0abfc,#ddd6fe)] motion-reduce:[animation:none] [animation:shiny-cta-border-spin_2.8s_linear_infinite]"
                  />
                </span>
                <span className="relative z-10 m-[2px] rounded-[10px] bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition group-hover:bg-violet-500">
                  View work
                </span>
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact
              </a>
            </div>
          </section>

          <section id="about" className="border-t border-white/5 bg-black/20 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className={`${SECTION_TITLE_CLASS} mb-10 sm:mb-14`}>About Me</h2>
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
                <div className="group relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl lg:mx-0 lg:max-w-none">
                  <img
                    src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&q=80"
                    alt="Osueke Pesova"
                    className="rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="text-left">
                  <div className="space-y-4 text-base leading-relaxed text-white/90 sm:text-lg">
                    <p className="leading-relaxed text-white/80">
                      I'm a full stack developer with strong backend focus, building scalable, secure web
                      applications for real-world domains including payments and financial workflows.
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="rounded-2xl border border-pink-500/45 bg-white/[0.04] p-4 sm:p-5">
                      <User
                        className="size-8 stroke-[1.5] text-pink-400 sm:size-9"
                        aria-hidden
                      />
                      <p className="mt-3 text-sm font-medium text-white">Experience</p>
                      <p className="text-white/60">6 years</p>
                    </div>
                    <div className="rounded-2xl border border-sky-500/45 bg-white/[0.04] p-4 sm:p-5">
                      <Briefcase
                        className="size-8 stroke-[1.5] text-sky-400 sm:size-9"
                        aria-hidden
                      />
                      <p className="mt-3 text-sm font-medium text-white">Projects</p>
                      <p className="text-white/60">
                        8+ Completed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SkillsSection />

          <section id="projects" className="overflow-visible py-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className={`${SECTION_TITLE_CLASS} mb-2`}>Featured Projects</h2>
              <div className="mt-10 grid gap-10 overflow-visible pb-4 pt-2 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <ProjectCard key={p.name} project={p} onOpenDetails={setModal} />
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="border-t border-white/5 py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
                <h2 className={`${SECTION_TITLE_CLASS}`}>Get In Touch</h2>
                <p className="mt-3 text-center text-slate-400">
                  Let&apos;s talk about your next project.
                </p>
                <form className="mt-8 space-y-4" onSubmit={onSubmitForm}>
                  <input type="hidden" name="_subject" value="New message from Portfolio (React)" />
                  <input type="hidden" name="_format" value="plain" />
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Name"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-violet-500/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Email"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-violet-500/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="Phone"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-violet-500/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Message"
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-violet-500/50"
                    />
                  </div>
                  {formMsg ? (
                    <p
                      className={
                        formMsg.type === 'ok' ? 'text-emerald-400' : 'text-red-300'
                      }
                      role="status"
                    >
                      {formMsg.text}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-60"
                  >
                    {sending ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              </div>
            </div>
          </section>

          <footer className="border-t border-white/10 bg-black/25 py-14 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid gap-12 sm:grid-cols-3 sm:gap-10 lg:gap-14">
                <div className="text-left">
                  <p className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-pink-500 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl">
                    Pesova
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">
                    Backend developer specializing in TypeScript, Node.js, APIs, and FinTech
                    backends.
                  </p>
                  <div className="mt-5 flex items-center gap-5 text-white/85">
                    <a
                      href="https://github.com/pesova"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                      aria-label="GitHub"
                    >
                      <FooterIconGithub />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/pesova-osueke-77904b1b1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <FooterIconLinkedIn />
                    </a>
                    <a
                      href="https://x.com/pesova2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-white"
                      aria-label="X"
                    >
                      <FooterIconX />
                    </a>
                    <a
                      href="mailto:dev@pesovatech.xyz"
                      className="transition hover:text-white"
                      aria-label="Email"
                    >
                      <Mail className="size-5" strokeWidth={1.75} />
                    </a>
                  </div>
                </div>

                <div className="text-left">
                  <h3 className="text-sm font-bold text-white">Quick Links</h3>
                  <ul className="mt-4 space-y-3 text-sm text-white/90">
                    <li>
                      <a href="#about" className="text-white/70 transition hover:text-white">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#projects" className="text-white/70 transition hover:text-white">
                        Projects
                      </a>
                    </li>
                    <li>
                      <a href="#skills" className="text-white/70 transition hover:text-white">
                        Skills
                      </a>
                    </li>
                    <li>
                      <a href="#contact" className="text-white/70 transition hover:text-white">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="text-left">
                  <h3 className="text-sm font-bold text-white">Get in Touch</h3>
                  <p className="mt-4 text-sm text-white/80">
                    Email:{' '}
                    <a
                      href="mailto:dev@pesovatech.xyz"
                      className="leading-relaxed text-white/80 underline-offset-2 transition hover:text-white hover:underline"
                    >
                      dev@pesovatech.xyz
                    </a>
                  </p>
                </div>
              </div>

              <div className="text-white/50 mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-400 sm:text-sm">
                © 2026 Osueke Pesova. All rights reserved.
              </div>
            </div>
          </footer>
        </main>
      </div>

      <ProjectModal project={modal} onClose={() => setModal(null)} />
    </div>
  )
}
