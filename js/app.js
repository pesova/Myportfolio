const TypingText = document.querySelector(".typed-text");
const AutoTyping = document.querySelector(".TypeCursor");

const textArray = [
  "build scalable systems.",
  "design clean APIs.",
  "ship real products.",
  "love backend engineering.",
  "enjoy teamwork.",
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!AutoTyping.classList.contains("typing"))
      AutoTyping.classList.add("typing");
    TypingText.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    AutoTyping.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!AutoTyping.classList.contains("typing"))
      AutoTyping.classList.add("typing");
    TypingText.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1,
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    AutoTyping.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

function projectTemplate(data) {
  let projects = ``;

  data.forEach((project) => {
    const encodedLongDesc = encodeHTML(project.long_description);
    // Determine badge color based on category
    projects += `<div class="col-lg-4 col-sm-6 mb-4">
                        <div class="portfolio-item">
                            <div class="portfolio-link" data-toggle="modal" onclick="projectModal(this)" 
                                data-name="${project.name}"
                                data-description="${project.description}" 
                                 data-long_description="${encodedLongDesc}"
                                data-date="${project.date}"
                                data-client="${project.client}"
                                data-category="${project.category}"
                                data-image="${project.image}"
                                data-link="${project.link}">
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content">
                                        <i style="color: #6b54eb" class="fas fa-plus fa-3x"></i>
                                    </div>
                                </div>
                                <img width="640" height="360" class="img-fluid" 
                                     src="assets/img/logos/${project.image}.webp" 
                                     alt="${project.name}" 
                                     srcset="assets/img/logos/${project.image}-small.webp 480w, 
                                             assets/img/logos/${project.image}.webp 1080w" 
                                     sizes="50vw" />
                            </div>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">${project.name}</div>
                                <div class="portfolio-caption-subheading text-muted">${project.description}</div>
                                <span class=" mt-2">${project.category}</span>
                            </div>
                        </div>
                    </div>`;
  });

  return projects;
}

function encodeHTML(html) {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = html;
  return tempDiv.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

let Projects = [
  {
    name: "Fracxn Marketplace Lending API",
    description: "Backend API for a Digital Lending Marketplace",
    long_description: `
    <h6><strong>Project Overview:</strong></h6>
    <p>Contributed to the backend development and testing of a sophisticated lending marketplace API. The platform connects lenders with borrowers, automating the matching and loan management process.</p>
    
    <h6><strong>My Key Contributions</strong></h6>
    <p>I was responsible for expanding and fortifying the test suite to ensure reliability across critical functionalities:</p>
    <ul>
        <li><strong>Fixed routes and failing tests</strong> to maintain API stability and correctness.</li>
        <li><strong>Implemented database lock handling for notifications</strong>, preventing race conditions in critical processes.</li>
        <li>Added comprehensive tests for <strong>loan disbursement lists, conclusions, and lender-specific routes</strong>.</li>
        <li>Wrote tests for <strong>loan transactions, offers, and invoice finance</strong> modules.</li>
        <li>Developed tests for <strong>Role-Based Access Control (RBAC)</strong> and shared user settings to ensure security and proper permissioning.</li>
    </ul>
    
    <h6><strong>Tech Stack & Role:</strong></h6>
    <div class="tech-tags">
        <span class="badge badge-primary mr-1">Backend API</span>
        <span class="badge badge-primary mr-1">Testing</span>
        <span class="badge badge-primary mr-1">FinTech</span>
        <span class="badge badge-primary mr-1">Typescript</span>
        <span class="badge badge-primary mr-1">NodeJs</span>
        <span class="badge badge-primary mr-1">ExpressJs</span>
        <span class="badge badge-primary mr-1">MySql</span>
        <span class="badge badge-primary mr-1">Javascript</span>
        <span class="badge badge-primary mr-1">System Integration</span>
    </div>
    <p><strong>Role:</strong> Backend Developer (Testing & Integration Focus)</p>
    
    <h6><strong>Project Outcome:</strong></h6>
    <p>Successfully merged 10 pull requests, significantly improving test coverage and reliability for core lending flows, user management, and transaction security in the marketplace backend.</p>
    `,
    date: "June - July 2025",
    client: "Fracxn",
    category: "FinTech API",
    image: "fracxn",
    link: "https://sandbox.marketplace.fracxn.com",
  },
  {
    name: "Carbon Credit Tokenization API",
    description: "FinTech / Web3 Sustainability Platform",
    long_description: `
        <h6><strong>Project Overview:</strong></h6>
        <p>Designed and implemented a backend API for carbon credit tokenization, tracking, and management. The system enables organizations to issue, verify, and manage tokenized carbon credits with full transparency.</p>
        
        <h6><strong>Key Responsibilities:</strong></h6>
        <ul>
            <li>Architected and implemented the complete API system</li>
            <li>Developed tokenized asset lifecycle management</li>
            <li>Built secure REST endpoints for third-party integration</li>
            <li>Created comprehensive API documentation</li>
            <li>Implemented verification and auditing mechanisms</li>
        </ul>
        
        <h6><strong>Tech Stack:</strong></h6>
        <div class="tech-tags">
            <span class="badge badge-primary mr-1">Typescript</span>
            <span class="badge badge-primary mr-1">NodeJs</span>
            <span class="badge badge-primary mr-1">ExpressJs</span>
            <span class="badge badge-primary mr-1">MongoDb</span>
            <span class="badge badge-primary mr-1">AWS</span>
            <span class="badge badge-primary mr-1">Javascript</span>
            <span class="badge badge-primary mr-1">REST APIs</span>
            <span class="badge badge-primary mr-1">API Documentation</span>
            <span class="badge badge-primary mr-1">Blockchain Integration</span>
        </div>
`,
    date: "2023 - Present",
    client: "Sustainology",
    category: "FinTech / Web3 API",
    image: "sustainology",
    link: "https://sustainology-dev.fracxn.com/api/docs",
  },
  {
    name: "Sakora Platform",
    description: "B2C Crypto-Fiat Financial Platform",
    long_description: `
        <h6><strong>Project Overview:</strong></h6>
        <p>Developed backend services for a business-to-customer platform handling crypto to fiat conversions, card management, and automated finance operations.</p>
        
        <h6><strong>Key Responsibilities:</strong></h6>
        <ul>
            <li>Backend API development and maintenance</li>
            <li>Cryptocurrency to fiat conversion logic</li>
            <li>Card management and payment processing</li>
            <li>System integration and third-party API connections</li>
            <li>Automated personal/business finance management features</li>
        </ul>
        
        <h6><strong>Tech Stack:</strong></h6>
        <div class="tech-tags">
            <span class="badge badge-primary mr-1">Node.js</span>
            <span class="badge badge-primary mr-1">TypeScript</span>
            <span class="badge badge-primary mr-1">REST APIs</span>
            <span class="badge badge-primary mr-1">MongoDB</span>
            <span class="badge badge-primary mr-1">Payment Processing</span>
        </div>
    `,
    date: "2023",
    client: "Sakora",
    category: "FinTech Backend",
    image: "sakora",
    link: "https://dev.sakora.io",
  },

  {
    name: "Wealth Vault API",
    description: "Financial Data & Asset Management Platform",
    long_description: `
        <h6><strong>Project Overview:</strong></h6>
        <p>Developed a secure backend API for financial data management and asset tracking, integrating with Zoho CRM and Interactive Brokers for comprehensive wealth management.</p>
        
        <h6><strong>Key Responsibilities:</strong></h6>
        <ul>
            <li>API design and development for financial data management</li>
            <li>Zoho API integration for user management</li>
            <li>Interactive Brokers API integration for asset data</li>
            <li>XML data encryption/decryption implementation</li>
            <li>CI/CD pipeline setup and maintenance</li>
        </ul>
        
        <h6><strong>Tech Stack:</strong></h6>
        <div class="tech-tags">
            <span class="badge badge-primary mr-1">Node.js</span>
            <span class="badge badge-primary mr-1">TypeScript</span>
            <span class="badge badge-primary mr-1">REST APIs</span>
            <span class="badge badge-primary mr-1">CI/CD</span>
            <span class="badge badge-primary mr-1">API Security</span>
            <span class="badge badge-primary mr-1">Third-party Integration</span>
        </div>
    `,
    date: "2023",
    client: "Wealth Vault",
    category: "Financial API",
    image: "wealthvault",
    link: "https://documenter.getpostman.com/view/11742809/2sA3XWdyhR",
  },
  {
    name: "Fracxn Admin Dashboard",
    description: "Admin Panel for Embedded Finance Platform",
    long_description: `
    <h6><strong>Project Overview:</strong></h6>
    <p>Developed the admin dashboard for Fracxn's embedded finance platform, which enables businesses to offer invoice factoring and receivables financing through a single integration with multiple lenders.</p>
    
    <h6><strong>My Key Contributions:</strong></h6>
    <ul>
        <li><strong>Admin System Architecture</strong> - Built the complete admin management system with role-based access</li>
        <li><strong>Asset & Auction Management</strong> - Implemented asset creation, auction workflows, and bid management</li>
        <li><strong>User Management System</strong> - Developed user listing, blocking/unblocking, and detailed user analytics</li>
        <li><strong>Performance Optimization</strong> - Added server-side pagination for large datasets and improved loading states</li>
        <li><strong>Authentication & Security</strong> - Implemented secure login system with token expiration handling</li>
    </ul>
    
    <h6><strong>Technical Highlights:</strong></h6>
    <ul>
        <li>Implemented asset management with image upload capabilities</li>
        <li>Created comprehensive transaction tracking across deposits, withdrawals, and investments</li>
        <li>Built responsive dashboard with real-time statistics</li>
    </ul>
    
    <h6><strong>Tech Stack:</strong></h6>
    <div class="tech-tags">
        <span class="badge badge-primary mr-1">Admin Dashboard</span>
        <span class="badge badge-primary mr-1">Finance Platform</span>
        <span class="badge badge-primary mr-1">NodeJs</span>
        <span class="badge badge-primary mr-1">ExpressJs</span>
        <span class="badge badge-primary mr-1">PHP</span>
        <span class="badge badge-primary mr-1">UI/UX</span>
        <span class="badge badge-primary mr-1">AWS</span>
        <span class="badge badge-primary mr-1">Javascript</span>
        <span class="badge badge-primary mr-1">REST APIs</span>
        <span class="badge badge-primary mr-1">Authentication</span>
        <span class="badge badge-primary mr-1">Data Management</span>
    </div>
`,
    date: "July 2023 - January 2024",
    client: "Fracxn",
    category: "FinTech Admin Panel",
    image: "fracxn",
    link: "https://fracxn.com",
  },
  {
    name: "Yandel API v2",
    description: "Modular Banking & Trading API",
    long_description: `
        <h6><strong>Project Overview:</strong></h6>
        <p>Enhanced version of the Yandel API with modular architecture, comprehensive documentation, and expanded features for banking and crypto trading services.</p>
        
        <h6><strong>Key Responsibilities:</strong></h6>
        <ul>
            <li>Redesigned API architecture for modularity</li>
            <li>Developed user management, card, and banking services</li>
            <li>Created comprehensive Postman documentation</li>
            <li>Implemented fiat and crypto wallet management</li>
            <li>Enhanced code quality and maintainability</li>
        </ul>
        
        <h6><strong>Tech Stack:</strong></h6>
        <div class="tech-tags">
            <span class="badge badge-primary mr-1">PHP</span>
            <span class="badge badge-primary mr-1">Laravel</span>
            <span class="badge badge-primary mr-1">REST APIs</span>
            <span class="badge badge-primary mr-1">MySQL</span>
            <span class="badge badge-primary mr-1">Redis</span>
            <span class="badge badge-primary mr-1">Postman</span>
        </div>
        
        <h6><strong>Links:</strong></h6>
        <p>GitHub: <a href="https://github.com/pesova/yandel-api" target="_blank">https://github.com/pesova/yandel-api</a></p>`,
    date: "2023",
    client: "Yandel",
    category: "Banking API",
    image: "yandel",
    link: "https://documenter.getpostman.com/view/11742809/UVkjvdNR",
  },
  {
    name: "Pesocrypt",
    description: "My Web3 Site",
    long_description: `This Project was completed from a learning aspect of web3 smart contracts with React and solidity. You can transfer crypto in different networks from one address to the other and get your transactions directly from the blockchain`,
    date: "September 2022",
    client: "Web3 Dev",
    category: "Web3 Smart contract",
    image: "pesocrypt",
    link: "https://project.pesovatech.com",
  },
  {
    name: "Pastecs",
    description: "Online Learning Platform",
    long_description: `Worked with a team in developing this web portal with Admin panel used by schools to post online courses and employ tutors around the world. Just like udemy, it tracks students progress and gives them access to the courses they have purchased. 
        <br/>  <b>Login details</b> <br/>  Email: <b>pesova13@gmail.com</b>, Password <b>pesotech</b>, Role: <b>student</b>. 
        <br/> Email: <b>pesotech@instructor.com</b>, Password <b>password</b>, Role: <b>instructor</b>. <p>(contact me for admin details)</p>
        <pre>card_number: 5399838383838381,
        cvv: 470,
        expiry_date: 10/31,
        pin: 3310,
        otp: 12345 </pre>`,
    date: "October 2020",
    client: "Chuks (School Director)",
    category: "Learning Platform",
    image: "pastecs",
    link: "https://pastecs.pesovatech.com/",
  },
  {
    name: "Abims",
    description: "Inhouse Company Invoice System",
    long_description: `This Project was built in collaboration with phase3 as an inhouse invoice system only used by abims staffs to manage and control there everyday invoice system. It has different staff levels and actions depending on staff role. I implemented the dashboard, staff, customers, and contributed in some part of the invoice system using laravel. `,
    date: "April 2022",
    client: "Abims",
    category: "Invoice Web",
    image: "abims",
    link: "https://www.phase3telecom.com/",
  },
  {
    name: "Usecoins",
    description: "Global Payment Platform",
    long_description: `Worked with a team in developing this payment gateway, that provides a cryptocurrency payment trail so merchants and their customers can trade. I worked both on the frontend and backend using React, Node.js, Typescript and Solidity.`,
    date: "October 2022",
    client: "Egom Technologies",
    category: "Payment gateway",
    image: "usecoins",
    link: "https://usecoins.io/",
  },
  {
    name: "Strip It",
    description: "Video Posting Site",
    long_description: `Single-handedly Developed this full-stack web application, using PHP (Laravel) that has a four level user role (user, performer, moderator, admin), where performers post videos and get tipped by users, and receive there payment through stripe or paypal and also get different badges according to tips. Moderators and admin has different access to manage the hole platform.
        <br/>  <b>Login details</b> <br/>  Username: <b>pesova</b>, Password <b>password</b>, Role: <b>user</b>. 
        <br/> Username: <b>performer</b>, Password <b>password</b>, Role: <b>performer</b>. <p>(contact me for admin or moderator details)</p>
        <pre>card_number: 5555555555554444,
        cvv: 564,
        expiry_date: 09/32,
        postal code: 12345 </pre>`,
    date: "March 2021",
    client: "Fibre User",
    category: "Video Portal",
    image: "Stripit",
    link: "https://stripit.pesovatech.com/",
  },
  {
    name: "Peso Tech",
    description: "Ethical Hacking Site",
    long_description: `I created this blog site myself, where i posted many ethical hacking tutorials, and useful hints for Programmers, Script handlers and Hackers. Take Note it is an educational site, and every tips used is at users risk.
        NB: I built this when i was learning JavaScript.`,
    date: "2019",
    client: "Personal",
    category: "Programmers & Ethical Hackers blog",
    image: "PCbots",
    link: "https://pesova.github.io/PesoTech/Tech.html",
  },
];

$(document).ready(function () {
  let divProjects = document.getElementById("projects_section");

  let allProjects = projectTemplate(Projects);

  divProjects.innerHTML = allProjects;
});

function projectModal(element) {
  const {
    name,
    description,
    long_description,
    date,
    client,
    category,
    image,
    link,
  } = element.dataset;

  $("#project_name").text(name);
  $("#project_description").text(description);
  $("#project_long_description").html(long_description);
  $("#project_date").text(`Date: ${date}`);
  $("#project_client").text(`CLient: ${client}`);
  $("#project_category").text(`Category: ${category}`);
  $("#project_link").attr("href", link);
  $("#project_image").attr("src", `assets/img/logos/${image}.webp`);

  $("#projectsModal").modal("toggle");
}
