/**
 * SINGLE SOURCE OF TRUTH for all site content derived from Huzaifa Khalid's CV.
 * Every fact, metric, date, and role below comes directly from the CV.
 * Do NOT invent experience. Items needing real-world data carry a `TODO` note.
 */

export const profile = {
  name: "Huzaifa Khalid",
  firstName: "Huzaifa",
  titles: [
    "Full Stack Developer & Cybersecurity Analyst",
    "Software Engineer",
    "Cybersecurity Analyst",
  ],
  tagline:
    "Full Stack Developer and Cybersecurity Analyst — I build production apps and secure the systems they run on.",
  subtagline:
    "React, Angular, Next.js, TypeScript, and NestJS/Node.js on the build side — SIEM monitoring, incident response, vulnerability management, and MITRE ATT&CK mapping on the defend side.",
  summary:
    "Full-Stack Software Engineer and Cybersecurity Analyst with 4+ years building secure, scalable B2B and B2C SaaS across React/TypeScript and NestJS/Node.js — and a parallel, fast-growing security practice spanning SIEM monitoring, incident response (NIST SP 800-61), MITRE ATT&CK mapping, vulnerability management, and compliance with NIST, PCI DSS, and PIPEDA. I bring a developer's understanding of how applications are built, where they break, and how attackers exploit them into every security investigation.",
  location: "GTA, ON, Canada",
  relocation: "Based in Canada — open to opportunities nationwide and remote.",
  remote: "Remote-ready and hybrid across North American time zones.",
  email: "hmhuzaifakhalid@gmail.com",
  phone: "+1 (437) 450-9656",
  experienceYears: "4+",
  availability:
    "Open to full-time roles in full-stack engineering and cybersecurity, in Canada and remote nationwide.",
  currentRole: "Cybersecurity Analyst @ Vosyn",
  // TODO: replace with a polished, designed PDF résumé export when available.
  resumeUrl: "/Huzaifa_Khalid_CV.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/dev-huzaifakhalid/",
    email: "mailto:hmhuzaifakhalid@gmail.com",
  },
} as const;

/** Animated counters - every value is from the CV. */
export type Metric = { label: string; value: number; prefix?: string; suffix?: string };
export const metrics: Metric[] = [
  { label: "IDS detection accuracy", value: 99, suffix: ".99%" },
  { label: "Years of experience", value: 4, suffix: "" },
  { label: "Master's GPA", value: 4, prefix: "", suffix: ".0" },
  { label: "Concurrent users scaled to", value: 50, suffix: "k+" },
  { label: "Data integrity on live sessions", value: 99, suffix: ".9%" },
  { label: "Platform responsiveness boost", value: 35, suffix: "%" },
  { label: "Indicators of compromise identified", value: 18, suffix: "" },
] as const;

/**
 * Detailed skills grouping. Full-stack categories first, then cybersecurity.
 * Components iterate over these key/value entries.
 */
export const skills = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3", "SCSS"],
  Frontend: [
    "React", "Angular", "Next.js", "React Native", "Redux", "Tailwind CSS",
    "Material UI", "Bootstrap",
  ],
  "Backend & APIs": [
    "NestJS", "Node.js", "RESTful API Design", "Microservices Architecture",
    "Sequelize ORM", "WebSockets",
  ],
  Databases: [
    "PostgreSQL", "MySQL", "MongoDB", "Schema Design", "Query Optimization",
    "Relational Data Modeling",
  ],
  "Cloud & DevOps": [
    "AWS (EC2, S3, RDS)", "Docker", "CI/CD Pipelines", "GitHub Actions",
    "DevOps Automation",
  ],
  "AI & LLM": [
    "Model Context Protocol (MCP)", "Retrieval-Augmented Generation (RAG)",
    "Vector Databases", "AI-driven Pipelines", "LLM Integration",
    "GitHub Copilot", "Amazon CodeWhisperer",
  ],
  "Security Monitoring": [
    "Splunk (SIEM)", "Log Analysis", "Threat Intelligence", "Alert Triage",
    "Wireshark", "Malware Analysis", "EDR",
  ],
  "Security Operations": [
    "Incident Response", "Forensic Timeline Analysis", "MITRE ATT&CK TTP Mapping",
    "IDS/IPS", "Firewall Management", "Endpoint Protection", "Cyber Kill Chain",
  ],
  "Vulnerability Management": [
    "Nessus", "Metasploit", "MITRE Caldera", "Penetration Testing",
    "Security Risk Assessment", "Nmap", "Kali Linux",
  ],
  "Access & Identity": [
    "RBAC", "Least Privilege", "IAM", "Active Directory", "Zero Trust Architecture",
  ],
  "Compliance & Frameworks": [
    "NIST CSF/RMF/SP 800-61", "PCI DSS", "PIPEDA", "HIPAA", "PHIPA",
    "ISO 27001", "CIS Controls", "OWASP Top 10",
  ],
  "Testing & QA": [
    "Jest", "Mocha", "Unit Testing", "Integration Testing",
    "Test-Driven Development",
  ],
  "Tools & Collab": [
    "Git", "Jira", "Slack", "Azure DevOps", "Notion", "ClickUp", "Agile/Scrum",
  ],
} as const;

/**
 * Two top-level skill categories as requested:
 * Full Stack (Pakistan roots) and Cybersecurity (current focus in Canada).
 */
export const skillGroups = {
  "Full Stack Skills": [
    "JavaScript (ES6+)", "TypeScript", "Python", "React", "Angular", "Next.js",
    "React Native", "Redux", "NestJS", "Node.js", "RESTful APIs", "Microservices",
    "Sequelize ORM", "PostgreSQL", "MySQL", "MongoDB", "Tailwind CSS",
    "Material UI", "AWS (EC2, S3, RDS)", "Docker", "CI/CD", "GitHub Actions",
    "RAG", "Vector Databases", "LLM Integration", "Jest", "Mocha", "TDD",
  ],
  "Cybersecurity Skills": [
    "Splunk (SIEM)", "Wireshark", "Nessus", "Metasploit", "MITRE Caldera",
    "MITRE ATT&CK", "Incident Response (NIST SP 800-61)", "Malware Analysis",
    "EDR", "IDS/IPS", "Firewall Management", "Endpoint Protection",
    "Penetration Testing", "Vulnerability Assessment", "Cyber Kill Chain",
    "Threat Intelligence", "RBAC", "IAM", "Zero Trust Architecture",
    "Active Directory", "NIST CSF/RMF", "PCI DSS", "PIPEDA", "ISO 27001",
    "CIS Controls", "OWASP Top 10", "Nmap", "Kali Linux", "Linux", "Network Security",
  ],
} as const;

/** Marquee groupings drawn from the real stack. */
export const techEcosystem = {
  Frontend: ["React", "Angular", "Next.js", "React Native", "TypeScript", "Redux", "Tailwind CSS"],
  Backend: ["NestJS", "Node.js", "REST APIs", "Microservices", "Sequelize", "Python"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  Cloud: ["AWS EC2", "S3", "RDS", "Docker", "GitHub Actions", "CI/CD"],
  Security: ["Splunk", "Wireshark", "Nessus", "Metasploit", "MITRE ATT&CK", "EDR"],
  Compliance: ["NIST", "PCI DSS", "PIPEDA", "ISO 27001", "Zero Trust"],
} as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  industry: string;
  location: string;
  impact: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    company: "Vosyn",
    role: "Cybersecurity Analyst",
    period: "May 2026 – Present",
    industry: "SaaS / Enterprise Security",
    location: "Canada — Etobicoke, ON · Hybrid",
    impact: [
      "Monitor security systems, networks, and SaaS applications in real time to detect and mitigate threats across enterprise environments.",
      "Conduct vulnerability assessments and penetration tests with Nessus and Metasploit, prioritizing and resolving weaknesses before exploitation.",
      "Investigate and respond to incidents end to end — root cause analysis, containment, and permanent remediation aligned with NIST SP 800-61.",
      "Implement and manage firewalls, IDS/IPS, and endpoint protection platforms, strengthening the organization's security posture.",
      "Author security policies and documentation aligned with NIST, ISO 27001, and PIPEDA, and deliver cybersecurity awareness training to staff.",
    ],
    tech: ["Splunk", "Nessus", "Metasploit", "IDS/IPS", "NIST SP 800-61", "ISO 27001"],
  },
  {
    company: "TenX (Agrilift)",
    role: "Software Engineer & Application Support Engineer",
    period: "Jul 2024 – Feb 2026",
    industry: "Enterprise SaaS / AgriTech",
    location: "Connecticut, USA · Remote",
    impact: [
      "Engineered Angular features and real-time analytics modules with Node.js, boosting platform responsiveness by 35% across 5 large-scale client applications.",
      "Designed reusable, secure frontend modules for enterprise clients including HBL and BAT, reducing delivery timelines by 25%.",
      "Directed the L1–L2 application support pipeline, executing SQL queries and validating true-positive bugs to cut false escalations by 35%.",
      "Led a 3-member frontend team delivering production maps and visualization components with secure API integration — earning the Excellence Award 2025.",
      "Implemented software security requirements and led peer code reviews to maintain code quality and engineering best practices.",
    ],
    tech: ["Angular", "Node.js", "SQL", "REST APIs", "Data Visualization"],
  },
  {
    company: "Devsinc",
    role: "Frontend Developer",
    period: "Aug 2023 – Jul 2024",
    industry: "Social / Consumer Apps",
    location: "California, USA · Remote",
    impact: [
      "Delivered a cross-platform React and React Native social app with responsive TypeScript UIs, cutting redundant code by 40% and lifting mobile retention by 30% across 50+ device configurations.",
      "Integrated an AI-driven recommendation engine that increased personalized engagement by 45%, with secure data handling across real-time interactions.",
      "Built a real-time matchmaking pipeline with NestJS and Node.js, reducing latency by 35% while maintaining 99.9% data integrity during live concurrent sessions.",
      "Wrote Jest unit tests ensuring consistent quality across frontend components and RESTful API endpoints.",
    ],
    tech: ["React", "React Native", "TypeScript", "NestJS", "Node.js", "Jest"],
  },
  {
    company: "OnyxTec",
    role: "Software Engineer (Associate to Software Engineer)",
    period: "Mar 2022 – Jul 2023",
    industry: "Software Consultancy / SaaS",
    location: "Pakistan",
    impact: [
      "Developed SocialSquad, a MERN SaaS event platform with real-time notifications and group chat, boosting coordination efficiency by 40% and scaling to 50k+ concurrent users.",
      "Optimized backend services with MySQL and Sequelize ORM, achieving 99.9% data integrity and improving query performance by 40% in high-volume production.",
      "Implemented an e-commerce application with integrated payment APIs, reducing transaction errors by 25% — recognized with the Best Employee Award 2022.",
      "Built reusable React component libraries and implemented RESTful API integrations for the FeedBear and My Local Gun Shop platforms.",
    ],
    tech: ["React", "Node.js", "MongoDB", "MySQL", "Sequelize", "Express"],
  },
];

export type ProjectCategory =
  | "Full Stack"
  | "Frontend"
  | "SaaS"
  | "Performance"
  | "Security"
  | "AI";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory[];
  year: string;
  role: string;
  stack: string[];
  challenge: string;
  solution: string;
  results: string[];
  featured: boolean;
  liveUrl?:string;
};

export const projects: Project[] = [
  {
    slug: "feedbear",
    liveUrl:"https://www.feedbear.com/",
    name: "FeedBear",
    tagline: "SaaS feedback-management platform with structured submission and moderation workflows.",
    category: ["Frontend", "SaaS"],
    year: "2024",
    role: "Frontend Developer",
    stack: ["React", "Redux", "Ruby on Rails APIs", "JavaScript", "REST"],
    challenge:
      "Product teams needed a reliable way to collect, track, and moderate customer feedback, with consistent application state and real-time updates across submission and admin workflows.",
    solution:
      "Built the feedback interface in React with Redux-based state management, integrated Ruby on Rails APIs for real-time synchronization of records, status updates, and comment threads, and tuned asynchronous API interactions for responsiveness.",
    results: [
      "Increased feedback engagement by 32% across product teams",
      "Improved resolution processing speed by 27% via real-time sync",
      "Consistent state handling across submission, tracking, and moderation",
      "Responsive components stable across large feedback datasets",
    ],
    featured: true,
  },
  {
    slug: "outreside",
    liveUrl:"https://outreside.com/",
    name: "Outreside",
    tagline: "Scalable headless-WordPress e-commerce platform built on React and Node.",
    category: ["Full Stack", "SaaS", "Performance"],
    year: "2022",
    role: "Full Stack Developer",
    stack: ["React", "Node.js", "WordPress Headless CMS", "REST APIs", "JavaScript"],
    challenge:
      "A high-traffic outdoor-living storefront needed scalable e-commerce with dynamic content management and fast, maintainable browsing, checkout, and content workflows.",
    solution:
      "Architected a React frontend and Node backend with a headless WordPress CMS integrated via REST APIs, designed reusable component architecture, and optimized asset delivery and state management.",
    results: [
      "Improved application performance by 30% across browsing and checkout",
      "Reduced deployment cycles by 25% via headless CMS architecture",
      "Reusable component architecture across product and admin interfaces",
      "Secure REST integrations across auth, inventory, and order processing",
    ],
    featured: false,
  },
  {
    slug: "my-local-gun-shop",
    name: "My Local Gun Shop",
    tagline: "Specialized e-commerce storefront on React, Material UI, and Redux.",
    category: ["Frontend", "Performance"],
    year: "2022",
    role: "Frontend Developer",
    stack: ["React", "Redux", "Material UI", "Laravel APIs", "JavaScript"],
    challenge:
      "A specialized retail catalog needed a responsive, reliable storefront handling high-volume browsing, cart, and checkout interactions with accessible, maintainable UI.",
    solution:
      "Engineered a React e-commerce interface with Material UI and a Redux state architecture for product listings, cart, and checkout, integrated Laravel backend APIs, and optimized rendering and component reuse.",
    results: [
      "Reduced page load latency by 26% across catalog interfaces",
      "Increased user satisfaction metrics by 24%",
      "Reliable cart and checkout across high-volume browsing sessions",
      "Accessible, modular Material UI component architecture",
    ],
    featured: false,
  },
  {
    slug: "cyber-range-lock-jam",
    name: "Cyber Range Lock Jam — Risk Simulation",
    tagline:
      "High-fidelity Black Basta double-extortion ransomware incident-response exercise in the Catalyst Cyber Range.",
    category: ["Security"],
    year: "2026",
    role: "Incident Response Analyst",
    stack: ["MITRE ATT&CK", "Log Analysis", "Threat Intelligence", "SITREP Reporting"],
    challenge:
      "A simulated financial institution faced a Black Basta double-extortion ransomware scenario requiring real-time IoC validation, risk assessment, and CISO-level decision-making under crisis time pressure.",
    solution:
      "Ran an end-to-end incident-response simulation in the Rogers Cybersecure Catalyst Cyber Range — identifying and validating IoCs, producing live SITREP reports, quantifying third-party vendor exposure, and analyzing adversary TTPs to drive containment and recovery.",
    results: [
      "Identified and validated IoCs in a Black Basta double-extortion scenario",
      "Produced real-time SITREP reports updating risk likelihood and impact",
      "Quantified third-party vendor exposure and ranked remediation under time pressure",
      "Delivered CISO-level briefings with cost–benefit analyses and prioritized recommendations",
    ],
    featured: true,
  },
  {
    slug: "security-architecture-healthcare",
    name: "Security Architecture Design — Health First Clinic",
    tagline:
      "Defense-in-depth Zero Trust architecture for a healthcare clinic, aligned with NIST CSF 2.0, PHIPA, and HIPAA.",
    category: ["Security"],
    year: "2026",
    role: "Security Architect",
    stack: ["Microsoft Entra ID", "Zero Trust", "Network Segmentation", "NIST CSF 2.0", "CIS Controls v8"],
    challenge:
      "A healthcare organization had critical gaps — no MFA, a flat network, legacy SMBv1/NTLM protocols, and PHI exposure risks — leaving it vulnerable to ransomware and data breaches.",
    solution:
      "Designed a defense-in-depth architecture with a 6-zone VLAN Zero Trust segmentation model, a modern IAM framework on Microsoft Entra ID (MFA, RBAC, Conditional Access), and a ransomware-resilient 3-2-1-1-0 data protection strategy with secure Azure migration.",
    results: [
      "Surfaced critical gaps: absent MFA, flat network, legacy SMBv1/NTLM, PHI exposure",
      "Engineered a 6-zone VLAN Zero Trust segmentation model to limit lateral movement",
      "Proposed Entra ID IAM with MFA, RBAC, and Conditional Access",
      "Built a 3-2-1-1-0 backup strategy with DLP, encryption, and data-residency compliance",
    ],
    featured: true,
  },
  {
    slug: "soc-incident-response",
    name: "SOC Design & Incident Response",
    tagline: "A 24/7 Security Operations Center modeled on a TD Bank ransomware simulation.",
    category: ["Security"],
    year: "2025",
    role: "Security Analyst / SOC Architect",
    stack: ["Splunk (SIEM)", "EDR", "MITRE ATT&CK", "NIST SP 800-61", "PCI DSS", "PIPEDA"],
    challenge:
      "A bank-scale environment needed a SOC architecture and incident-response capability able to detect, triage, and contain a live ransomware campaign while satisfying PCI DSS and PIPEDA.",
    solution:
      "Designed a tiered SOC (Tier 1–3) integrating threat intelligence and incident response, then simulated the LockBit ransomware lifecycle through the NIST SP 800-61 phases — correlating SIEM, EDR, and authentication logs to reconstruct the full attack timeline and map adversary TTPs to MITRE ATT&CK.",
    results: [
      "Identified 18 indicators of compromise across the simulated campaign",
      "Reconstructed the full attack timeline from correlated SIEM, EDR & auth logs",
      "Mapped adversary TTPs to the MITRE ATT&CK framework",
      "Developed response playbooks aligned with PCI DSS and PIPEDA",
    ],
    featured: true,
  },
  {
    slug: "cloud-ids-deployment",
    name: "Cloud IDS Deployment & Threat Monitoring",
    tagline:
      "Google Cloud IDS with packet mirroring achieving 95% alert accuracy across severity levels.",
    category: ["Security"],
    year: "2026",
    role: "Cloud Security Analyst",
    stack: ["Google Cloud Platform", "Cloud IDS", "Packet Mirroring", "SIEM Integration", "Network Traffic Analysis"],
    challenge:
      "An enterprise cloud network needed reliable east-west traffic visibility to detect exploits, malware callbacks, and lateral movement across virtual networks.",
    solution:
      "Deployed Google Cloud IDS with packet mirroring, configured traffic collectors so mirrored flows reached IDS sensors, integrated alerts into SIEM ingestion pipelines, and tuned thresholds against injected attack traffic.",
    results: [
      "95% alert accuracy across severity levels during testing",
      "35% improvement in analyst triage and escalation efficiency",
      "Validated detection of simulated exploit and malware activity",
      "Documented detection gaps to strengthen cloud monitoring architecture",
    ],
    featured: false,
  },
  {
    slug: "gov-risk-assessment",
    name: "Cybersecurity Risk Assessment — Government Agency",
    tagline:
      "Risk-based assessment using the NIST RMF, prioritizing the top 5 critical risks under real-world constraints.",
    category: ["Security"],
    year: "2026",
    role: "Risk Analyst",
    stack: ["NIST RMF", "Risk Register", "Trade-off Analysis", "Executive Reporting"],
    challenge:
      "A government agency needed a risk-based cybersecurity assessment that prioritized threats under real-world time and resource constraints and translated technical findings for executives.",
    solution:
      "Built a structured risk register covering assets, threats, vulnerabilities, and controls; ranked the top 5 critical risks by likelihood and impact; justified mitigations through trade-off analysis; and delivered executive briefings of prioritized recommendations.",
    results: [
      "Built a structured risk register across assets, threats, vulnerabilities, and controls",
      "Ranked the top 5 critical risks by likelihood and impact",
      "Documented accepted risks with explicit business rationale",
      "Delivered executive briefings aligned with operational constraints",
    ],
    featured: false,
  },
  {
    slug: "windows-forensics-ghosttrace",
    name: "Windows Forensics — GhostTrace (Hack The Box)",
    tagline:
      "Event-log forensics reconstructing the attacker lifecycle with 100% detection accuracy in controlled scenarios.",
    category: ["Security"],
    year: "2025",
    role: "Windows Forensics Analyst",
    stack: ["Windows Event Logs", "Sysmon", "PowerShell Logging", "MITRE ATT&CK", "Digital Forensics"],
    challenge:
      "A simulated enterprise compromise required reconstructing the full attacker lifecycle across hosts — persistence, privilege escalation, and lateral movement — from multi-source telemetry.",
    solution:
      "Correlated Windows Security, Sysmon, and PowerShell event logs to build multi-source timelines, mapped adversary techniques to MITRE ATT&CK, and documented IoCs into structured investigation reports.",
    results: [
      "100% detection accuracy across controlled forensic investigation scenarios",
      "40% improvement in incident-response validation and SOC triage readiness",
      "Reconstructed attacker lifecycle across persistence and privilege-escalation artifacts",
      "Uncovered scripted lateral movement and credential abuse from PowerShell logs",
    ],
    featured: false,
  },
  {
    slug: "socialsquad",
    name: "SocialSquad",
    tagline: "Real-time MERN event platform scaled to 50k+ concurrent users.",
    category: ["Full Stack", "SaaS", "Performance"],
    year: "2022",
    role: "Software Engineer (MERN)",
    stack: ["React", "Node.js", "Express", "MongoDB", "MySQL", "Sequelize"],
    challenge:
      "An events SaaS needed real-time coordination — notifications and group chat — that stayed reliable and fast at high concurrency.",
    solution:
      "Built a MERN platform with real-time notifications and group chat, and optimized backend services with MySQL and Sequelize ORM for data integrity and query performance under heavy load.",
    results: [
      "Scaled to 50k+ concurrent users",
      "Boosted user coordination efficiency by 40%",
      "99.9% data integrity in production",
      "40% faster query performance via backend optimization",
    ],
    featured: false,
  },
  {
    slug: "farmlink",
    name: "Farmlink",
    tagline: "Real-time agricultural insights platform for enterprise clients.",
    category: ["Frontend", "SaaS", "Performance"],
    year: "2024",
    role: "Senior Frontend Developer",
    stack: ["Angular", ".NET API", "Mapbox GL", "Google Analytics", "TypeScript"],
    challenge:
      "Enterprise agricultural clients needed accurate, real-time geospatial insights delivered through a maintainable, fast frontend.",
    solution:
      "Architected reusable Angular components integrated with a .NET API, Mapbox GL maps, and Google Analytics to surface real-time agricultural insights.",
    results: [
      "Boosted real-time insight accuracy by 33% for enterprise clients",
      "Accelerated delivery cycles by 30%",
      "Reusable component architecture for maintainability",
      "Interactive Mapbox GL visualizations",
    ],
    featured: true,
  },
  {
    slug: "ml-ids",
    name: "ML-Based Intrusion Detection System",
    tagline: "Machine-learning IDS detecting DDoS, Botnet, and Heartbleed attacks at 99.99% accuracy.",
    category: ["Security", "AI"],
    year: "2025",
    role: "Security Researcher",
    stack: ["Python", "KNN", "Naive Bayes", "Decision Tree", "CIC-IDS2017"],
    challenge:
      "Detecting modern network attacks accurately while minimizing false positives across a large, imbalanced traffic dataset.",
    solution:
      "Analyzed the CIC-IDS2017 dataset (200K+ records) and trained KNN, Naive Bayes, and Decision Tree classifiers, optimizing feature selection to reduce false positives.",
    results: [
      "99.99% detection accuracy",
      "Detected DDoS, Botnet, and Heartbleed attacks",
      "200K+ records analyzed",
      "Optimized feature selection to minimize false positives",
    ],
    featured: false,
  },
];

/**
 * Long-form case-study content for project detail pages.
 * STRICTLY derived from the CV - no fabricated infrastructure, metrics,
 * clients, or claims.
 */
export type ArchitectureLayer = {
  label: string;
  role: string;
  tech: string[];
};

export type PerfStat = {
  label: string;
  value: string;
  detail: string;
};

export type Challenge = {
  title: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  summary: string;
  problem: string[];
  solution: string[];
  architecture: ArchitectureLayer[];
  challenges: Challenge[];
  performance: PerfStat[];
  learnings: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  feedbear: {
    slug: "feedbear",
    summary:
      "At Devsinc I built FeedBear, a SaaS feedback-management interface in React and Redux integrated with Ruby on Rails APIs — increasing feedback engagement by 32% and resolution processing speed by 27% through structured workflows and real-time synchronization.",
    problem: [
      "Product teams needed structured feedback collection, tracking, and moderation.",
      "Application state had to stay consistent across submission and admin features.",
      "Feedback records, statuses, and comment threads needed real-time updates.",
    ],
    solution: [
      "Built the feedback-management interface in React with structured submission workflows.",
      "Implemented Redux-based state management across submission, tracking, and moderation.",
      "Integrated Ruby on Rails APIs for real-time record, status, and comment sync.",
      "Optimized asynchronous API interactions and rendering for responsiveness.",
    ],
    architecture: [
      { label: "Presentation", role: "Feedback UI & moderation", tech: ["React", "Material UI"] },
      { label: "State", role: "Consistent application state", tech: ["Redux"] },
      { label: "API", role: "Real-time synchronization", tech: ["Ruby on Rails APIs", "REST"] },
    ],
    challenges: [
      { title: "Consistent state at scale", body: "Redux state management kept submission, tracking, and moderation features consistent across the platform." },
      { title: "Real-time synchronization", body: "Rails API integration synchronized records, status updates, and comment threads in real time." },
      { title: "Responsiveness under load", body: "Optimizing async interactions kept the interface stable across large feedback datasets." },
    ],
    performance: [
      { label: "Feedback engagement", value: "+32%", detail: "Across product teams using the platform." },
      { label: "Resolution speed", value: "+27%", detail: "Through real-time record synchronization." },
      { label: "State management", value: "Redux", detail: "Consistent across submission and moderation." },
      { label: "Backend", value: "Rails APIs", detail: "Real-time records, statuses, and comments." },
    ],
    learnings: [
      "Disciplined Redux state is what keeps multi-feature SaaS UIs predictable.",
      "Real-time sync is a backend-integration problem as much as a frontend one.",
      "Async optimization is where perceived responsiveness is won or lost.",
    ],
  },
  outreside: {
    slug: "outreside",
    summary:
      "At OnyxTec I architected Outreside, a React and Node e-commerce platform with a headless WordPress CMS integrated via REST APIs — improving application performance by 30% and reducing deployment cycles by 25% across a high-traffic storefront.",
    problem: [
      "A high-traffic storefront needed scalable e-commerce across browsing and checkout.",
      "Dynamic product content required flexible, decoupled content management.",
      "The frontend had to stay maintainable as storefront features grew.",
    ],
    solution: [
      "Architected a React frontend and Node backend for scalable e-commerce functionality.",
      "Integrated a headless WordPress CMS through REST APIs for dynamic content.",
      "Designed reusable React component architecture across product and admin flows.",
      "Optimized frontend asset delivery and application state management.",
    ],
    architecture: [
      { label: "Presentation", role: "Reusable storefront UI", tech: ["React"] },
      { label: "Backend", role: "Application & API services", tech: ["Node.js", "REST APIs"] },
      { label: "Content", role: "Dynamic product content", tech: ["WordPress Headless CMS"] },
    ],
    challenges: [
      { title: "Scalable e-commerce", body: "React and Node infrastructure delivered scalable browsing, checkout, and content workflows in a high-traffic environment." },
      { title: "Decoupled content management", body: "A headless WordPress CMS over REST enabled dynamic product content and faster deployments." },
      { title: "Maintainable architecture", body: "Reusable component design kept product, checkout, and admin interfaces consistent." },
    ],
    performance: [
      { label: "Performance", value: "+30%", detail: "Across browsing, checkout, and content delivery." },
      { label: "Deployment cycles", value: "-25%", detail: "Via headless CMS architecture." },
      { label: "Content", value: "Headless WP", detail: "Dynamic product content over REST APIs." },
      { label: "Architecture", value: "Reusable", detail: "Across product, checkout, and admin." },
    ],
    learnings: [
      "Headless CMS decouples content velocity from deployment velocity.",
      "Reusable component architecture is the lever for high-traffic maintainability.",
      "Asset delivery and state management drive real e-commerce performance.",
    ],
  },
  "my-local-gun-shop": {
    slug: "my-local-gun-shop",
    summary:
      "At OnyxTec I engineered My Local Gun Shop, a specialized React e-commerce storefront using Material UI and Redux with Laravel backend APIs — reducing page load latency by 26% and lifting user satisfaction metrics by 24%.",
    problem: [
      "A specialized catalog needed a responsive, reliable storefront.",
      "High-volume browsing, cart, and checkout interactions had to stay stable.",
      "UI had to be accessible, consistent, and maintainable.",
    ],
    solution: [
      "Engineered a React e-commerce interface with Material UI for consistent styling.",
      "Implemented a Redux state architecture for listings, cart, and checkout.",
      "Integrated Laravel backend APIs for product, pricing, and inventory data.",
      "Optimized UI rendering performance and component reuse.",
    ],
    architecture: [
      { label: "Presentation", role: "Accessible storefront UI", tech: ["React", "Material UI"] },
      { label: "State", role: "Cart & checkout state", tech: ["Redux"] },
      { label: "Backend", role: "Product & inventory data", tech: ["Laravel APIs", "REST"] },
    ],
    challenges: [
      { title: "Latency under load", body: "Rendering optimization and component reuse reduced page load latency by 26% across catalog interfaces." },
      { title: "Reliable cart & checkout", body: "A Redux state architecture kept cart and checkout interactions reliable across high-volume sessions." },
      { title: "Accessible, maintainable UI", body: "Modular Material UI components enforced consistent styling and accessibility compliance." },
    ],
    performance: [
      { label: "Load latency", value: "-26%", detail: "Across specialized catalog interfaces." },
      { label: "User satisfaction", value: "+24%", detail: "Across storefront interactions." },
      { label: "State", value: "Redux", detail: "Reliable cart and checkout workflows." },
      { label: "Backend", value: "Laravel APIs", detail: "Product, pricing, and inventory data." },
    ],
    learnings: [
      "Rendering optimization and component reuse compound into real latency wins.",
      "A clear Redux model is what keeps cart and checkout reliable at volume.",
      "Accessibility and consistency come from a disciplined component system.",
    ],
  },
  "soc-incident-response": {
    slug: "soc-incident-response",
    summary:
      "I designed a 24/7 SOC architecture (Tier 1–3 analysts) and ran an end-to-end incident-response simulation modeled on a TD Bank LockBit ransomware scenario — correlating SIEM, EDR, and authentication logs to reconstruct the attack timeline, identify 18 indicators of compromise, and map adversary TTPs to MITRE ATT&CK under NIST SP 800-61.",
    problem: [
      "A bank-scale environment needed a SOC capable of detecting and containing a live ransomware campaign without disrupting regulated operations.",
      "Response had to satisfy PCI DSS and PIPEDA while preserving forensic evidence.",
      "Analysts needed a repeatable, framework-aligned playbook rather than ad-hoc firefighting.",
    ],
    solution: [
      "Designed a tiered SOC (Tier 1–3) integrating threat intelligence and incident-response functions.",
      "Simulated the LockBit ransomware lifecycle through the NIST SP 800-61 phases — preparation, detection, containment, eradication, and recovery.",
      "Correlated SIEM, EDR, and authentication logs to reconstruct the full attack timeline.",
      "Mapped adversary tactics, techniques, and procedures to the MITRE ATT&CK framework.",
      "Developed response playbooks aligned with PCI DSS and PIPEDA.",
    ],
    architecture: [
      { label: "Detection", role: "Log collection & alerting", tech: ["Splunk (SIEM)", "EDR"] },
      { label: "Analysis", role: "Timeline reconstruction & TTP mapping", tech: ["MITRE ATT&CK", "Threat Intelligence"] },
      { label: "Response", role: "Containment & remediation playbooks", tech: ["NIST SP 800-61"] },
      { label: "Compliance", role: "Regulatory alignment", tech: ["PCI DSS", "PIPEDA"] },
    ],
    challenges: [
      { title: "Reconstructing the attack timeline", body: "Correlating SIEM, EDR, and authentication logs into a single coherent timeline required careful log normalization and pivoting across data sources." },
      { title: "Framework-aligned response", body: "Mapping every action to NIST SP 800-61 phases and MITRE ATT&CK TTPs turned an ad-hoc investigation into a repeatable playbook." },
      { title: "Compliance under pressure", body: "Containment and evidence handling had to satisfy PCI DSS and PIPEDA without slowing the response." },
    ],
    performance: [
      { label: "Indicators of compromise", value: "18", detail: "Identified across the simulated LockBit campaign." },
      { label: "Attack timeline", value: "Fully reconstructed", detail: "From correlated SIEM, EDR & authentication logs." },
      { label: "TTP coverage", value: "MITRE ATT&CK", detail: "Adversary techniques mapped to the framework." },
      { label: "Compliance", value: "PCI DSS · PIPEDA", detail: "Playbooks aligned to regulatory requirements." },
    ],
    learnings: [
      "Framework-aligned response (NIST SP 800-61 + MITRE ATT&CK) turns chaos into a repeatable, auditable process.",
      "Log correlation across SIEM, EDR, and identity sources is where the real attack story emerges.",
      "Compliance is a design input for incident response, not a clean-up step afterward.",
    ],
  },
  socialsquad: {
    slug: "socialsquad",
    summary:
      "At OnyxTec I built SocialSquad, a MERN SaaS event platform with real-time notifications and group chat — scaling to 50k+ concurrent users while optimizing MySQL/Sequelize backend services to 99.9% data integrity and 40% faster queries.",
    problem: [
      "An events SaaS needed reliable real-time coordination at high concurrency.",
      "High-volume production traffic threatened data integrity and query performance.",
      "Features like notifications and group chat had to stay responsive under load.",
    ],
    solution: [
      "Built a MERN platform with real-time notifications and group chat for event coordination.",
      "Optimized backend services with MySQL and Sequelize ORM for integrity and performance.",
      "Implemented reusable React component libraries and RESTful API integrations.",
      "Tuned high-volume production queries for throughput and reliability.",
    ],
    architecture: [
      { label: "Presentation", role: "Reusable UI & real-time chat", tech: ["React", "Redux"] },
      { label: "Application & API", role: "Real-time notifications & business logic", tech: ["Node.js", "Express", "REST APIs"] },
      { label: "Database", role: "Event & user data at scale", tech: ["MongoDB", "MySQL", "Sequelize"] },
    ],
    challenges: [
      { title: "Scaling to 50k+ concurrent users", body: "Real-time notifications and chat had to stay responsive as concurrency climbed into the tens of thousands." },
      { title: "Data integrity at volume", body: "Optimizing MySQL with Sequelize ORM kept 99.9% data integrity while improving query performance by 40%." },
      { title: "Reusability across teams", body: "A shared React component library kept delivery consistent across multiple client platforms." },
    ],
    performance: [
      { label: "Concurrent users", value: "50k+", detail: "Sustained on the live event platform." },
      { label: "Coordination efficiency", value: "+40%", detail: "Through real-time notifications and group chat." },
      { label: "Data integrity", value: "99.9%", detail: "Maintained in high-volume production." },
      { label: "Query performance", value: "+40%", detail: "Via MySQL & Sequelize optimization." },
    ],
    learnings: [
      "Real-time features live or die on backend optimization, not just frontend polish.",
      "A disciplined ORM and schema strategy is what holds data integrity at scale.",
      "Reusable component libraries compound across multi-client delivery.",
    ],
  },
  farmlink: {
    slug: "farmlink",
    summary:
      "As Senior Frontend Developer on Farmlink, I architected reusable Angular components integrated with a .NET API, Mapbox GL, and Google Analytics — boosting real-time agricultural insight accuracy by 33% for enterprise clients and accelerating delivery cycles by 30%.",
    problem: [
      "Enterprise agricultural clients needed accurate, real-time geospatial insights.",
      "The frontend had to stay fast and maintainable as features grew.",
      "Mapping and analytics had to integrate cleanly with a .NET backend.",
    ],
    solution: [
      "Architected reusable Angular components for a scalable, maintainable frontend.",
      "Integrated a .NET API for real-time agricultural data.",
      "Built interactive Mapbox GL visualizations for geospatial insights.",
      "Wired Google Analytics for usage and engagement measurement.",
    ],
    architecture: [
      { label: "Presentation", role: "Reusable, responsive UI", tech: ["Angular", "TypeScript"] },
      { label: "Mapping", role: "Geospatial visualization", tech: ["Mapbox GL"] },
      { label: "Data & APIs", role: "Real-time agricultural data", tech: [".NET API", "REST APIs"] },
      { label: "Analytics", role: "Usage & engagement insight", tech: ["Google Analytics"] },
    ],
    challenges: [
      { title: "Accurate real-time insights", body: "Surfacing trustworthy, real-time agricultural data improved insight accuracy by 33% for enterprise clients." },
      { title: "Maintainable component architecture", body: "Reusable Angular components accelerated delivery cycles by 30% while keeping the codebase clean." },
      { title: "Geospatial performance", body: "Integrating Mapbox GL with live data required careful rendering and state management." },
    ],
    performance: [
      { label: "Insight accuracy", value: "+33%", detail: "Real-time agricultural insights for enterprise clients." },
      { label: "Delivery cycles", value: "+30% faster", detail: "Through reusable Angular components." },
      { label: "Mapping", value: "Mapbox GL", detail: "Interactive geospatial visualizations." },
      { label: "Analytics", value: "Google Analytics", detail: "Usage & engagement instrumentation." },
    ],
    learnings: [
      "Reusable component architecture is the lever for both speed and maintainability.",
      "Geospatial UX is an engineering problem as much as a design one.",
      "Instrumenting analytics early turns insight accuracy into a measurable target.",
    ],
  },
  "ml-ids": {
    slug: "ml-ids",
    summary:
      "I built an ML-based Intrusion Detection System on the CIC-IDS2017 dataset (200K+ records), training KNN, Naive Bayes, and Decision Tree classifiers to detect DDoS, Botnet, and Heartbleed attacks at 99.99% accuracy while minimizing false positives through feature selection.",
    problem: [
      "Modern network attacks must be detected accurately across large, imbalanced traffic data.",
      "False positives erode analyst trust and bury real threats.",
      "Multiple attack classes (DDoS, Botnet, Heartbleed) require robust modeling.",
    ],
    solution: [
      "Analyzed the CIC-IDS2017 dataset of 200K+ network traffic records.",
      "Trained KNN, Naive Bayes, and Decision Tree classifiers for detection.",
      "Optimized feature selection to minimize false positives.",
      "Evaluated models against DDoS, Botnet, and Heartbleed attack classes.",
    ],
    architecture: [
      { label: "Data", role: "Network traffic dataset", tech: ["CIC-IDS2017"] },
      { label: "Modeling", role: "Attack classification", tech: ["KNN", "Naive Bayes", "Decision Tree"] },
      { label: "Optimization", role: "Feature selection & tuning", tech: ["Python"] },
    ],
    challenges: [
      { title: "Minimizing false positives", body: "Feature selection was tuned to keep precision high without sacrificing detection coverage." },
      { title: "Multi-class detection", body: "DDoS, Botnet, and Heartbleed each presented distinct signatures requiring robust models." },
      { title: "Scale of data", body: "Training across 200K+ records demanded efficient preprocessing and evaluation." },
    ],
    performance: [
      { label: "Detection accuracy", value: "99.99%", detail: "Across the evaluated attack classes." },
      { label: "Records analyzed", value: "200K+", detail: "From the CIC-IDS2017 dataset." },
      { label: "Attack classes", value: "DDoS · Botnet · Heartbleed", detail: "Detected by the trained models." },
      { label: "False positives", value: "Minimized", detail: "Through optimized feature selection." },
    ],
    learnings: [
      "Feature selection often matters more than model choice for false-positive control.",
      "Real intrusion datasets are imbalanced — evaluation has to account for it.",
      "ML detection complements, not replaces, signature- and rule-based defenses.",
    ],
  },
  "cyber-range-lock-jam": {
    slug: "cyber-range-lock-jam",
    summary:
      "In the Rogers Cybersecure Catalyst Cyber Range I ran a high-fidelity incident-response simulation of a Black Basta double-extortion ransomware attack on a financial institution — validating IoCs, producing real-time SITREP reports, quantifying vendor exposure, and delivering CISO-level briefings under simulated crisis conditions.",
    problem: [
      "A financial institution faced a Black Basta double-extortion ransomware scenario.",
      "IoCs had to be identified and validated in real time as threat intelligence emerged.",
      "Containment had to be balanced against business continuity under time pressure.",
    ],
    solution: [
      "Identified and validated IoCs across the double-extortion scenario.",
      "Produced real-time SITREP reports updating risk likelihood and impact.",
      "Quantified third-party vendor exposure and ranked remediation actions.",
      "Analyzed adversary TTPs including lateral movement and enterprise compromise.",
      "Delivered CISO-level briefings with risk narratives and cost–benefit analyses.",
    ],
    architecture: [
      { label: "Detection", role: "IoC identification & validation", tech: ["Log Analysis", "Threat Intelligence"] },
      { label: "Assessment", role: "Risk likelihood & impact scoring", tech: ["SITREP Reporting"] },
      { label: "Analysis", role: "Adversary TTP mapping", tech: ["MITRE ATT&CK"] },
      { label: "Briefing", role: "Executive decision support", tech: ["Cost–Benefit Analysis"] },
    ],
    challenges: [
      { title: "Real-time risk updates", body: "Continuously updating likelihood and impact as new threat intelligence emerged demanded disciplined SITREP cadence." },
      { title: "Vendor exposure under pressure", body: "Quantifying third-party exposure and ranking remediation while balancing containment and business continuity." },
      { title: "Executive communication", body: "Translating technical findings into CISO-level risk narratives and prioritized recommendations under crisis conditions." },
    ],
    performance: [
      { label: "Scenario", value: "Black Basta", detail: "Double-extortion ransomware in a financial institution." },
      { label: "Reporting", value: "Real-time SITREP", detail: "Continuously updated risk likelihood and impact." },
      { label: "TTP coverage", value: "MITRE ATT&CK", detail: "Lateral movement and enterprise compromise analyzed." },
      { label: "Audience", value: "CISO-level", detail: "Cost–benefit analyses and prioritized recommendations." },
    ],
    learnings: [
      "Crisis decision-making depends on tight, repeatable SITREP cadence.",
      "Third-party exposure is often the deciding factor in remediation priority.",
      "Executive briefings turn technical findings into business decisions.",
    ],
  },
  "security-architecture-healthcare": {
    slug: "security-architecture-healthcare",
    summary:
      "I assessed a healthcare clinic's security posture and designed a defense-in-depth Zero Trust architecture aligned with NIST CSF 2.0, CIS Controls v8, PHIPA, and HIPAA — including a 6-zone VLAN segmentation model, Microsoft Entra ID IAM, and a ransomware-resilient 3-2-1-1-0 data protection strategy.",
    problem: [
      "Critical gaps existed: no MFA, a flat network, and legacy SMBv1/NTLM protocols.",
      "PHI exposure risks left the clinic vulnerable to ransomware and data breaches.",
      "The design had to satisfy PHIPA and HIPAA data-protection requirements.",
    ],
    solution: [
      "Designed a defense-in-depth architecture aligned with NIST CSF 2.0 and CIS Controls v8.",
      "Engineered a 6-zone VLAN Zero Trust segmentation model to limit lateral movement.",
      "Proposed a Microsoft Entra ID IAM framework with MFA, RBAC, and Conditional Access.",
      "Built a 3-2-1-1-0 backup strategy with DLP, encryption, and secure Azure migration.",
    ],
    architecture: [
      { label: "Network", role: "Zero Trust segmentation", tech: ["6-zone VLAN", "Network Segmentation"] },
      { label: "Identity", role: "Access control", tech: ["Microsoft Entra ID", "MFA", "RBAC", "Conditional Access"] },
      { label: "Data Protection", role: "Ransomware resilience", tech: ["3-2-1-1-0 Backup", "DLP", "Encryption"] },
      { label: "Compliance", role: "Regulatory alignment", tech: ["PHIPA", "HIPAA", "NIST CSF 2.0", "CIS Controls v8"] },
    ],
    challenges: [
      { title: "Eliminating credential attack vectors", body: "Introducing MFA, RBAC, and Conditional Access via Entra ID closed the most exploitable gaps." },
      { title: "Containing lateral movement", body: "A 6-zone VLAN Zero Trust model replaced a flat network to improve incident containment." },
      { title: "Compliant data protection", body: "A 3-2-1-1-0 backup model with encryption and data residency satisfied PHIPA and HIPAA." },
    ],
    performance: [
      { label: "Segmentation", value: "6 zones", detail: "Zero Trust VLAN architecture limiting lateral movement." },
      { label: "Identity", value: "Entra ID", detail: "MFA, RBAC, and Conditional Access policies." },
      { label: "Backups", value: "3-2-1-1-0", detail: "Ransomware-resilient data protection strategy." },
      { label: "Compliance", value: "PHIPA · HIPAA", detail: "Aligned with NIST CSF 2.0 and CIS Controls v8." },
    ],
    learnings: [
      "Zero Trust segmentation is the highest-leverage fix for a flat network.",
      "Identity is the new perimeter — MFA and Conditional Access close the biggest gaps.",
      "Compliance frameworks are design inputs, not afterthoughts.",
    ],
  },
  "cloud-ids-deployment": {
    slug: "cloud-ids-deployment",
    summary:
      "I deployed Google Cloud IDS with packet mirroring across virtual networks, integrated alerts into SIEM ingestion pipelines, and tuned detection against injected attack traffic — achieving 95% alert accuracy and a 35% improvement in analyst triage efficiency.",
    problem: [
      "Cloud networks lacked east-west traffic visibility for detecting threats.",
      "Exploits, malware callbacks, and lateral movement needed reliable detection.",
      "IDS alerts had to integrate cleanly into existing SIEM workflows.",
    ],
    solution: [
      "Deployed Google Cloud IDS with packet mirroring across virtual networks.",
      "Configured collectors so mirrored flows reached IDS sensors for inspection.",
      "Integrated and normalized IDS alerts into SIEM ingestion pipelines.",
      "Tuned alert thresholds and documented gaps against injected attack traffic.",
    ],
    architecture: [
      { label: "Capture", role: "East-west traffic mirroring", tech: ["Packet Mirroring", "Traffic Collectors"] },
      { label: "Detection", role: "Intrusion detection", tech: ["Google Cloud IDS"] },
      { label: "Integration", role: "Alert normalization", tech: ["SIEM Integration", "Log Normalization"] },
      { label: "Validation", role: "Coverage & tuning", tech: ["Network Traffic Analysis"] },
    ],
    challenges: [
      { title: "Reliable mirrored visibility", body: "Ensuring mirrored flows reached sensors gave visibility into payloads, C2 traffic, and lateral movement." },
      { title: "Accelerating triage", body: "Normalizing alert fields and timestamps improved triage and escalation efficiency by 35%." },
      { title: "Validating coverage", body: "Comparing detected events against injected traffic confirmed coverage and surfaced detection gaps." },
    ],
    performance: [
      { label: "Alert accuracy", value: "95%", detail: "Across severity levels during testing." },
      { label: "Triage efficiency", value: "+35%", detail: "Through normalized SIEM alert ingestion." },
      { label: "Coverage", value: "Validated", detail: "Detection confirmed against injected attack traffic." },
      { label: "Visibility", value: "East-west", detail: "Payloads, C2 traffic, and lateral movement." },
    ],
    learnings: [
      "Detection is only as good as the traffic you can actually see.",
      "Alert normalization is what makes SIEM triage fast.",
      "Validating against injected traffic turns coverage into a measurable target.",
    ],
  },
  "gov-risk-assessment": {
    slug: "gov-risk-assessment",
    summary:
      "I performed a risk-based cybersecurity assessment for a government agency using the NIST Risk Management Framework — building a structured risk register, ranking the top 5 critical risks by likelihood and impact, and delivering executive briefings of prioritized recommendations under real-world constraints.",
    problem: [
      "A government agency needed risk prioritization under time and resource constraints.",
      "Mitigation decisions required explicit trade-off analysis and business rationale.",
      "Technical findings had to be translated for an executive audience.",
    ],
    solution: [
      "Applied the NIST Risk Management Framework to a real-world scenario.",
      "Built a structured risk register across assets, threats, vulnerabilities, and controls.",
      "Ranked the top 5 critical risks by likelihood and impact.",
      "Documented accepted risks and delivered prioritized executive briefings.",
    ],
    architecture: [
      { label: "Framework", role: "Risk methodology", tech: ["NIST RMF"] },
      { label: "Register", role: "Asset & threat cataloguing", tech: ["Risk Register"] },
      { label: "Analysis", role: "Likelihood & impact ranking", tech: ["Trade-off Analysis"] },
      { label: "Reporting", role: "Executive translation", tech: ["Executive Briefings"] },
    ],
    challenges: [
      { title: "Prioritizing under constraints", body: "Ranking risks by likelihood and impact under real-world time and resource limits." },
      { title: "Justifying trade-offs", body: "Documenting accepted risks with explicit business rationale rather than ad-hoc decisions." },
      { title: "Executive communication", body: "Translating technical findings into clear, prioritized recommendations." },
    ],
    performance: [
      { label: "Framework", value: "NIST RMF", detail: "Applied to a government-agency scenario." },
      { label: "Top risks", value: "Top 5", detail: "Ranked by likelihood and impact." },
      { label: "Register", value: "Structured", detail: "Assets, threats, vulnerabilities, and controls." },
      { label: "Output", value: "Executive briefings", detail: "Prioritized, constraint-aware recommendations." },
    ],
    learnings: [
      "Risk prioritization is about trade-offs, not eliminating every risk.",
      "A structured register makes accepted risk defensible.",
      "Executives need prioritized recommendations, not raw findings.",
    ],
  },
  "windows-forensics-ghosttrace": {
    slug: "windows-forensics-ghosttrace",
    summary:
      "In the Hack The Box GhostTrace investigation I correlated Windows Security, Sysmon, and PowerShell event logs to reconstruct the full attacker lifecycle across compromised hosts — mapping techniques to MITRE ATT&CK with 100% detection accuracy and a 40% lift in SOC triage readiness.",
    problem: [
      "A simulated enterprise compromise spanned multiple hosts and log sources.",
      "Persistence, privilege escalation, and lateral movement had to be reconstructed.",
      "Findings needed to be defensible and mapped to a recognized framework.",
    ],
    solution: [
      "Correlated Windows Security, Sysmon, and PowerShell logs into multi-source timelines.",
      "Performed temporal correlation to attribute actions to specific user sessions and processes.",
      "Analyzed PowerShell operational logs to uncover scripted lateral movement and credential abuse.",
      "Mapped IoCs to MITRE ATT&CK and produced structured investigation reports.",
    ],
    architecture: [
      { label: "Telemetry", role: "Multi-source log collection", tech: ["Windows Event Logs", "Sysmon", "PowerShell Logging"] },
      { label: "Correlation", role: "Timeline reconstruction", tech: ["Temporal Correlation", "Log Correlation"] },
      { label: "Mapping", role: "Technique attribution", tech: ["MITRE ATT&CK"] },
      { label: "Reporting", role: "Defensible evidence", tech: ["Digital Forensics"] },
    ],
    challenges: [
      { title: "Multi-source correlation", body: "Stitching Security, Sysmon, and PowerShell channels into one coherent timeline." },
      { title: "Attribution precision", body: "Temporal correlation attributed attacker actions to specific sessions, processes, and persistence mechanisms." },
      { title: "Uncovering scripted abuse", body: "Decoding PowerShell command artifacts revealed scripted lateral movement and credential abuse." },
    ],
    performance: [
      { label: "Detection accuracy", value: "100%", detail: "Across controlled forensic investigation scenarios." },
      { label: "Triage readiness", value: "+40%", detail: "Improvement in IR validation and SOC triage." },
      { label: "Lifecycle", value: "Reconstructed", detail: "Persistence and privilege-escalation artifacts identified." },
      { label: "Mapping", value: "MITRE ATT&CK", detail: "IoCs mapped to recognized techniques." },
    ],
    learnings: [
      "The attack story lives in the correlation across log sources, not any single channel.",
      "Temporal correlation is what makes attribution defensible.",
      "PowerShell logging is a goldmine for catching scripted abuse.",
    ],
  },
};

/** Audience segmentation for who I work with. */
export const audiences = [
  "Employers",
  "Startups",
  "Product Teams",
  "Security Teams",
  "Founders",
] as const;

/**
 * Services framed as outcomes, not capabilities.
 * Derived strictly from real skills and delivered results.
 */
export type Service = {
  outcome: string;
  value: string;
  included: string[];
  audiences: string[];
  cta: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    outcome: "Build and ship production ready SaaS products",
    value:
      "End-to-end full-stack builds across React/Angular and NestJS/Node.js — shipped as scalable, secure products, not prototypes.",
    included: [
      "Full-stack architecture & data modeling",
      "RESTful APIs & microservices",
      "Reusable component systems",
      "Deployment on AWS with CI/CD",
    ],
    audiences: ["Founders", "Startups"],
    cta: "Start a build",
    featured: true,
  },
  {
    outcome: "Harden applications with secure SDLC",
    value:
      "Security baked into development — secure requirements, peer code reviews, and integrity controls across real-time systems.",
    included: [
      "Secure coding & code review",
      "Vulnerability assessment",
      "Secure data handling & integrity controls",
      "OWASP-aligned practices",
    ],
    audiences: ["Product Teams", "Security Teams"],
    cta: "Secure my app",
    featured: true,
  },
  {
    outcome: "Detect and respond to security incidents",
    value:
      "SIEM monitoring, incident response, and forensic timeline analysis aligned with NIST SP 800-61 and MITRE ATT&CK.",
    included: [
      "Splunk SIEM monitoring & alert triage",
      "Incident response (NIST SP 800-61)",
      "MITRE ATT&CK TTP mapping",
      "Response playbooks & documentation",
    ],
    audiences: ["Security Teams", "Employers"],
    cta: "Talk security",
  },
  {
    outcome: "Run vulnerability assessments & pen tests",
    value:
      "Identify, prioritize, and resolve security weaknesses before exploitation using Nessus, Metasploit, and MITRE Caldera.",
    included: [
      "Vulnerability scanning (Nessus)",
      "Penetration testing (Metasploit)",
      "Security risk assessment",
      "Remediation guidance",
    ],
    audiences: ["Security Teams", "Product Teams"],
    cta: "Assess my risk",
  },
  {
    outcome: "Add a full-stack + security engineer to your team",
    value:
      "Full-time or embedded engineering that ships features and defends the systems they run on, with a track record of awards and impact.",
    included: [
      "Full-stack feature delivery",
      "Architecture & secure code review",
      "Cross-functional collaboration",
      "Mentoring & best practices",
    ],
    audiences: ["Employers", "Product Teams"],
    cta: "Let's talk",
  },
  {
    outcome: "Integrate AI features that ship",
    value:
      "RAG, vector databases, and LLM integration woven into real products with secure data handling.",
    included: [
      "LLM & MCP integration",
      "RAG & vector databases",
      "AI-driven pipelines",
      "Secure AI data handling",
    ],
    audiences: ["Founders", "Startups"],
    cta: "Explore AI",
  },
];

/**
 * Testimonials - PLACEHOLDER / TODO.
 * No quotes are fabricated. Replace with real, approved testimonials.
 * Set `placeholder: false` to display a card.
 */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Huzaifa is an exceptional frontend developer with deep expertise in React and Angular. He consistently delivered clean, scalable code on time and brought strong problem-solving skills to every challenge. I highly recommend him for any software engineering or frontend development role.",
    author: "Qasim Rashid",
    role: "Senior DevSecOps Engineer | Cloud Architect",
    placeholder: false,
  },
  // {
  //   quote:
  //     "TODO: Add a second real testimonial. Reach out to a past collaborator from TenX, Devsinc, or OnyxTec.",
  //   author: "TODO - Name",
  //   role: "TODO - Role, Company",
  //   placeholder: true,
  // },
];

export const expertise = [
  { title: "Full Stack Engineering", description: "React, Angular, Next.js, NestJS, and Node.js — secure, component-driven products end to end." },
  { title: "Backend & APIs", description: "RESTful APIs, microservices, and Sequelize ORM with PostgreSQL, MySQL, and MongoDB." },
  { title: "Cloud & DevOps", description: "AWS (EC2, S3, RDS), Docker, GitHub Actions, and CI/CD pipelines for reliable deploys." },
  { title: "Security Operations", description: "Splunk SIEM monitoring, incident response, and MITRE ATT&CK TTP mapping." },
  { title: "Vulnerability Management", description: "Nessus, Metasploit, and MITRE Caldera for penetration testing and risk assessment." },
  { title: "Incident Response", description: "Containment and remediation aligned with NIST SP 800-61 and forensic timeline analysis." },
  { title: "Compliance & Frameworks", description: "NIST, PCI DSS, PIPEDA, ISO 27001, and CIS Controls applied to real environments." },
  { title: "AI Integrations", description: "RAG, vector databases, and LLM integration woven into real product features." },
];

export const process = [
  { step: "Discover", description: "Understand the product, users, and threat model before a line of code." },
  { step: "Architect", description: "Design systems and data models that scale and stay secure." },
  { step: "Build", description: "Ship modular, reusable components with velocity and quality." },
  { step: "Secure", description: "Apply secure SDLC: code review, integrity controls, and OWASP practices." },
  { step: "Test", description: "Unit, integration, and TDD coverage with Jest and Mocha." },
  { step: "Deploy", description: "Automated CI/CD pipelines on AWS for safe, repeatable releases." },
  { step: "Defend", description: "Monitor, triage, and respond with SIEM, incident response, and hardening." },
];
export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  detail?: string;
};

export const education: Education[] = [
  {
    degree: "Master of Cybersecurity",
    institution: "Toronto Metropolitan University",
    location: "Canada — Toronto, ON",
    period: "CGPA: 4.0",
    detail: "Specialized in SOC design, incident response, and ML-based intrusion detection.",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Government College University",
    location: "Pakistan",
    period: "CGPA: 3.6",
  },
];

export const achievements = [
  "Excellence Award 2025 at TenX (Agrilift) for outstanding platform contributions.",
  "Best Employee Award 2022 at OnyxTec for the e-commerce payment integration.",
  "Achieved a 4.0 GPA in the Master of Cybersecurity at Toronto Metropolitan University.",
  "Built an ML-based IDS reaching 99.99% detection accuracy on the CIC-IDS2017 dataset.",
  "Scaled SocialSquad to 50k+ concurrent users with 99.9% data integrity.",
];
export const achievements_2 = [
  "Excellence Award 2025 at TenX (Agrilift) for outstanding enterprise platform delivery.",
  "Best Employee Award 2022 at OnyxTec for a high-impact e-commerce payment integration.",
  "Graduated with a perfect 4.0 GPA in the Master of Cybersecurity at Toronto Metropolitan University.",
  "Built an ML-based intrusion detection system reaching 99.99% accuracy on the CIC-IDS2017 dataset.",
  "Scaled SocialSquad to 50k+ concurrent users while sustaining 99.9% data integrity in production.",
  "Reconstructed a full ransomware attack timeline and surfaced 18 indicators of compromise in a SOC simulation.",
];

export const languages = [
  { name: "English", level: "Professional Working Proficiency" },
];

export const certifications = [
  { name: "Splunk: A SIEM Tool", issuer: "ThinkCloudly", status: "Completed" },
  { name: "SOC Analyst: A SIEM Tool", issuer: "ThinkCloudly", status: "Completed" },
  { name: "Certified in Cybersecurity (CC)", issuer: "ISC2", status: "Completed" },
  { name: "Security+", issuer: "CompTIA", status: "In Progress" },
] as const;

export const faqs = [
  {
    q: "What kind of roles are you looking for?",
    a: "Full stack engineering and cybersecurity roles — including hybrid roles that combine secure software development with security operations. I'm based in Canada and open to opportunities across Canada and nationwide.",
  },
  {
    q: "What's your background as a developer?",
    a: "4+ years building secure, scalable B2B and B2C SaaS across React/TypeScript and NestJS/Node.js — including platforms scaled to 50k+ concurrent users — starting in Pakistan and continuing across remote roles for US-based companies.",
  },
  {
    q: "What cybersecurity experience do you have?",
    a: "Hands-on SIEM monitoring with Splunk, incident response aligned to NIST SP 800-61, MITRE ATT&CK TTP mapping, vulnerability management with Nessus and Metasploit, plus a Master of Cybersecurity (4.0 GPA) and SOC/incident-response simulations.",
  },
  {
    q: "Which frameworks and compliance standards do you work with?",
    a: "NIST CSF/RMF/SP 800-61, PCI DSS, PIPEDA, HIPAA, PHIPA, ISO 27001, and CIS Controls — applied across SOC design, security architecture, and policy documentation.",
  },
  {
    q: "Can you both build and secure an application?",
    a: "Yes — that's the core of what I do. I ship production features with secure SDLC practices (secure requirements, code review, integrity controls) and can also assess, monitor, and respond to threats against the systems they run on.",
  },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "/contact" },
];
