import { skillLogos } from '../data/skills'

/** Skills grid using full skillLogos list with cosmic card style. */
export function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 px-4 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-12 bg-gradient-to-r from-[#ff61d8] to-[#4cc9f0] bg-clip-text text-center text-4xl font-bold text-transparent">
          Skills &amp; Technologies
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {skillLogos.map((skill, index) => (
            <article
              key={skill.title}
              className="group animate-fade-in rounded-lg border border-white/5 bg-[#0b0f2b]/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-[#4b2d8d]/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mx-auto mb-4 h-16 w-16">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff61d8]/10 to-[#4cc9f0]/10 transition-transform duration-300 group-hover:scale-110" />
                <img
                  src={skill.src}
                  alt={skill.alt}
                  className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-[#ff61d8]/5 to-[#4cc9f0]/5" />
              </div>
              <h3 className="font-semibold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#ff61d8] group-hover:to-[#4cc9f0] group-hover:bg-clip-text group-hover:text-transparent">
                {skill.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
