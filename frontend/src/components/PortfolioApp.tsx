import { useState, type SubmitEvent } from 'react'
import { projects, type Project } from '../data/projects'

const FORMSPREE_ID = 'mgozgjjj'

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
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 shadow-2xl">
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
        <img
          src={`/assets/img/logos/${project.image}.webp`}
          alt=""
          className="mt-4 w-full max-h-48 rounded-xl object-contain"
        />
        <div
          className="prose prose-invert mt-4 max-w-none text-sm prose-p:text-slate-300 prose-headings:text-white"
          dangerouslySetInnerHTML={{ __html: project.long_description }}
        />
        <ul className="mt-4 space-y-1 text-xs text-slate-400">
          <li>Date: {project.date}</li>
          <li>Client: {project.client}</li>
          <li>Category: {project.category}</li>
        </ul>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500"
        >
          View project
        </a>
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
        setFormMsg({ type: 'ok', text: 'Message sent — thank you.' })
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
    <div className="min-h-svh bg-[#050508] text-slate-200">
      <div
        className="pointer-events-none fixed inset-0 opacity-80"
        style={{
          background:
            'linear-gradient(130deg, #0c0220 0%, #050508 40%, #06122a 75%, #0a0528 100%)',
        }}
      />
      <div
        className="pointer-events-none fixed -left-40 top-0 h-[420px] w-[420px] rounded-full bg-violet-600/30 blur-[100px]"
        style={{ animation: 'blob-float 20s ease-in-out infinite' }}
      />
      <div
        className="pointer-events-none fixed -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-cyan-500/20 blur-[90px]"
        style={{ animation: 'blob-float 24s ease-in-out infinite reverse' }}
      />

      <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-[#050508]/75 backdrop-blur-xl">
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

      <main className="relative z-10">
        <section
          id="top"
          className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300/90">
            Full stack · Backend focus
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building scalable APIs, secure money flows, and clear systems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-400">
            Osueke Pesova — engineer with strong backend, API, and FinTech experience. Based in
            Nigeria; shipping products with TypeScript, Node.js, and pragmatic architecture.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 hover:bg-violet-500"
            >
              View work
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </section>

        <section id="about" className="border-t border-white/5 bg-black/20 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">About</h2>
            <div className="mt-8 space-y-6 text-slate-400">
              <p>
                Full stack developer with several years of experience building scalable, secure web
                applications. I focus on backend engineering, API design, and architecture for
                real-world domains including payments and financial workflows.
              </p>
              <p>
                Core stack includes TypeScript, Node.js, Express, AdonisJS, MongoDB, Redis, and
                RESTful APIs — plus PHP/Laravel where it fits. I care about maintainability,
                performance, and working well with teams.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Projects</h2>
            <p className="mt-2 text-slate-400">Selected work — click a card for details.</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setModal(p)}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-violet-500/40 hover:bg-white/[0.06]"
                >
                  <div className="overflow-hidden rounded-xl bg-black/40">
                    <img
                      src={`/assets/img/logos/${p.image}.webp`}
                      alt=""
                      className="h-40 w-full object-cover transition group-hover:scale-[1.02]"
                    />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{p.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{p.description}</p>
                  <span className="mt-3 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-0.5 text-xs text-violet-200">
                    {p.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-white/5 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white">Contact</h2>
              <p className="mt-2 text-slate-400">Let&apos;s talk about your next project.</p>
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

        <footer className="border-t border-white/5 py-10 text-center text-sm text-slate-500">
          <p>Osueke Pesova · Portfolio</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="https://github.com/pesova" className="hover:text-white" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/pesova-osueke-77904b1b1/"
              className="hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>

      <ProjectModal project={modal} onClose={() => setModal(null)} />
    </div>
  )
}
