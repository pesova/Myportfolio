export type Project = {
  name: string
  description: string
  long_description: string
  date: string
  client: string
  category: string
  image: string
  link: string
}

/** Ported from `js/app.js` — extend or edit here. */
export const projects: Project[] = [
  {
    name: 'LiquidRamp Infrastructure',
    description: 'Core API Development for Non-Custodial Money Movement Platform',
    long_description: `
    <h6 class="font-semibold text-violet-200">Project Overview</h6>
    <p class="text-slate-300">Core API infrastructure for LiquidRamp: global money movement, stablecoin conversions, and programmable liquidity with non-custodial, user-hosted nodes.</p>
    <h6 class="mt-4 font-semibold text-violet-200">Tech Stack</h6>
    <p class="text-slate-300">TypeScript, Node.js, MySQL, AWS, webhooks, API infrastructure.</p>`,
    date: 'August 2025 - 2026',
    client: 'LiquidRamp',
    category: 'FinTech Core Infrastructure',
    image: 'liquidramp',
    link: 'https://liquidramp.com',
  },
  {
    name: 'Fracxn Marketplace Lending API',
    description: 'Backend API for a Digital Lending Marketplace',
    long_description: `
    <p class="text-slate-300">Lending marketplace API: tests, DB locking for notifications, loan flows, RBAC. Merged 10+ PRs improving reliability.</p>`,
    date: 'June - July 2025',
    client: 'Fracxn',
    category: 'FinTech API',
    image: 'fracxn',
    link: 'https://sandbox.marketplace.fracxn.com',
  },
  {
    name: 'Dexfiat Crypto Exchange',
    description: 'Full-Stack Development of a P2P Crypto Trading Platform',
    long_description: `
    <p class="text-slate-300">P2P crypto exchange: MySQL models, AI chatbot actions, LiquidRamp integration, multi-currency fiat/crypto flows.</p>`,
    date: '2024-2025',
    client: 'Dexfiat',
    category: 'FinTech / Crypto Exchange',
    image: 'dexfiat',
    link: 'https://dexfiat.exchange',
  },
  {
    name: 'Carbon Credit Tokenization API',
    description: 'FinTech / Web3 Sustainability Platform',
    long_description: `
    <p class="text-slate-300">API for carbon credit tokenization, verification, auditing, and third-party integrations.</p>`,
    date: '2023 - Present',
    client: 'Sustainology',
    category: 'FinTech / Web3 API',
    image: 'sustainology',
    link: 'https://sustainology-dev.fracxn.com/api/docs',
  },
  {
    name: 'Sakora Platform',
    description: 'B2C Crypto-Fiat Financial Platform',
    long_description: `
    <p class="text-slate-300">Backend for crypto–fiat, cards, and finance automation integrations.</p>`,
    date: '2023',
    client: 'Sakora',
    category: 'FinTech Backend',
    image: 'sakora',
    link: 'https://dev.sakora.io',
  },
  {
    name: 'Wealth Vault API',
    description: 'Financial Data & Asset Management Platform',
    long_description: `
    <p class="text-slate-300">Financial data API with Zoho CRM and Interactive Brokers integrations, XML crypto handling, CI/CD.</p>`,
    date: '2023',
    client: 'Wealth Vault',
    category: 'Financial API',
    image: 'wealthvault',
    link: 'https://documenter.getpostman.com/view/11742809/2sA3XWdyhR',
  },
]
