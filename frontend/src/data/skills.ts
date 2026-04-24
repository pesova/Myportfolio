export type SkillLogo = {
  src: string
  alt: string
  title: string
}

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

/** Tech stack logos (horizontal marquee). */
export const skillLogos: SkillLogo[] = [
  {
    src: `${D}/typescript/typescript-plain.svg`,
    alt: 'TypeScript',
    title: 'TypeScript',
  },
  {
    src: `${D}/nodejs/nodejs-original-wordmark.svg`,
    alt: 'Node.js',
    title: 'Node.js',
  },
  {
    src: `${D}/laravel/laravel-original-wordmark.svg`,
    alt: 'Laravel',
    title: 'Laravel',
  },
  {
    src: `${D}/javascript/javascript-plain.svg`,
    alt: 'JavaScript',
    title: 'JavaScript',
  },
  {
    src: `${D}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    alt: 'AWS',
    title: 'AWS',
  },
  {
    src: `${D}/mysql/mysql-original-wordmark.svg`,
    alt: 'MySQL',
    title: 'MySQL',
  },
  {
    src: `${D}/redis/redis-original-wordmark.svg`,
    alt: 'Redis',
    title: 'Redis',
  },
  {
    src: `${D}/postgresql/postgresql-original-wordmark.svg`,
    alt: 'PostgreSQL',
    title: 'PostgreSQL',
  },
  {
    src: `${D}/mongodb/mongodb-original-wordmark.svg`,
    alt: 'MongoDB',
    title: 'MongoDB',
  },
  {
    src: `${D}/php/php-original.svg`,
    alt: 'PHP',
    title: 'PHP',
  },
  {
    src: `${D}/docker/docker-original-wordmark.svg`,
    alt: 'Docker',
    title: 'Docker',
  },
  {
    src: `${D}/nextjs/nextjs-original.svg`,
    alt: 'Nextjs',
    title: 'Nextjs',
  }
]
