/** LogoLoop image entries — wordmarks from devicon CDN (no links). */
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
    src: `${D}/javascript/javascript-plain.svg`,
    alt: 'JavaScript',
    title: 'JavaScript',
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
    src: `${D}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    alt: 'AWS',
    title: 'AWS',
  },
  {
    src: `${D}/githubactions/githubactions-original-wordmark.svg`,
    alt: 'GitHub Actions',
    title: 'CI/CD',
  },
  {
    src: `${D}/mysql/mysql-original-wordmark.svg`,
    alt: 'MySQL',
    title: 'MySQL',
  },
  {
    src: `${D}/web3js/web3js-original.svg`,
    alt: 'Web3.js',
    title: 'Web3.js',
  },
  {
    src: `${D}/redis/redis-original-wordmark.svg`,
    alt: 'Redis',
    title: 'Redis',
  },
  {
    src: `${D}/git/git-original-wordmark.svg`,
    alt: 'Git',
    title: 'Git',
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
    src: `${D}/tailwindcss/tailwindcss-original-wordmark.svg`,
    alt: 'Tailwind CSS',
    title: 'Tailwind CSS',
  },
  {
    src: `${D}/php/php-original.svg`,
    alt: 'PHP',
    title: 'PHP',
  },
  {
    src: `${D}/react/react-original-wordmark.svg`,
    alt: 'React',
    title: 'React',
  },
  {
    src: `${D}/docker/docker-original-wordmark.svg`,
    alt: 'Docker',
    title: 'Docker',
  },
  {
    src: `${D}/express/express-original-wordmark.svg`,
    alt: 'Express',
    title: 'Express',
  },
  {
    src: `${D}/adonisjs/adonisjs-original-wordmark.svg`,
    alt: 'AdonisJS',
    title: 'AdonisJS',
  },
  {
    src: `${D}/solidity/solidity-original.svg`,
    alt: 'Solidity',
    title: 'Solidity',
  }
]
