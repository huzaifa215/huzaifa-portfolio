/**
 * SINGLE SOURCE OF TRUTH for all site content derived from Huzaifa Khalid's CV.
 * Every fact, metric, date, and role below comes directly from the CV.
 * Do NOT invent experience. Items needing real-world data carry a `TODO` note.
 */

export const profile = {
  name: "Huzaifa Khalid",
  firstName: "Huzaifa",
  titles: [
    "Full Stack Developer & Cybersecurity Specialist",
    "Senior Software Engineer",
    "Cybersecurity Analyst",
  ],
  tagline:
    "Full Stack Developer turned Cybersecurity Specialist — Built production apps in Pakistan, now securing systems in Canada.",
  subtagline:
    "Specializing in React, Angular, Next.js, TypeScript, NestJS/Node.js, and secure SDLC — alongside SIEM monitoring, incident response, vulnerability management, and MITRE ATT&CK mapping.",
  summary:
    "Senior Full-Stack Software Engineer and Cybersecurity Analyst with 5 years delivering secure, scalable B2B and B2C SaaS products across React/TypeScript and NestJS/Node.js stacks. Hands-on experience building microservices, RESTful APIs, and AI-driven pipelines, combined with practical cybersecurity skills spanning SIEM monitoring, incident response (NIST SP 800-61), MITRE ATT&CK mapping, vulnerability management, and compliance with NIST, PCI DSS, and PIPEDA.",
  location: "Toronto, ON, Canada",
  relocation: "Based in Canada — open to opportunities across Canada",
  remote: "Remote-ready and hybrid across North American time zones",
  email: "hmhuzaifakhalid@gmail.com",
  phone: "+1 (437) 450-9656",
  experienceYears: "5",
  availability:
    "Open to full-time roles and opportunities in full-stack engineering and cybersecurity, in Canada and remote.",
  currentRole: "Cybersecurity Analyst @ Vosyn",
  // TODO: replace with a polished, designed PDF résumé export when available.
  resumeUrl: "/Huzaifa_Khalid_CV.pdf",
  links: {
    // TODO: replace with Huzaifa's real LinkedIn URL (CV listed only "LinkedIn").
    linkedin: "https://linkedin.com/in/huzaifa-khalid",
    // TODO: GitHub URL not provided in CV — confirm and replace placeholder.
    github: "https://github.com/huzaifa-khalid",
    email: "mailto:hmhuzaifakhalid@gmail.com",
  },
} as const;

/** Animated counters - every value is from the CV. */
export type Metric = { label: string; value: number; prefix?: string; suffix?: string };
export const metrics: Metric[] = [
  { label: "Years of experience", value: 5, suffix: "" },
  { label: "Platform responsiveness boost", value: 35, suffix: "%" },
  { label: "Data integrity on live sessions", value: 99, suffix: ".9%" },
  { label: "Concurrent users scaled to", value: 50, suffix: "k+" },
  { label: "IDS detection accuracy", value: 99, suffix: ".99%" },
  { label: "Indicators of compromise identified", value: 18, suffix: "" },
  { label: "Master's GPA", value: 4, prefix: "", suffix: ".0" },
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
};

export const projects: Project[] = [
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
    featured: true,
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
    outcome: "Build and ship production-ready SaaS products",
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
      "TODO: Add a real, approved client or colleague testimonial here. Quotes will not be fabricated.",
    author: "TODO - Name",
    role: "TODO - Role, Company",
    placeholder: true,
  },
  {
    quote:
      "TODO: Add a second real testimonial. Reach out to a past collaborator from TenX, Devsinc, or OnyxTec.",
    author: "TODO - Name",
    role: "TODO - Role, Company",
    placeholder: true,
  },
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
  { step: "Architect", description: "Design systems and data models that scale — and stay secure." },
  { step: "Build", description: "Ship modular, reusable components with velocity and quality." },
  { step: "Secure", description: "Apply secure SDLC — code review, integrity controls, and OWASP practices." },
  { step: "Test", description: "Unit, integration, and TDD coverage with Jest and Mocha." },
  { step: "Deploy", description: "Automated CI/CD pipelines on AWS for safe, repeatable releases." },
  { step: "Defend", description: "Monitor, triage, and respond — SIEM, incident response, and hardening." },
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
    period: "GPA: 4.0",
    detail: "Specialized in SOC design, incident response, and ML-based intrusion detection.",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Government College University",
    location: "Pakistan",
    period: "",
  },
];

export const achievements = [
  "Excellence Award 2025 at TenX (Agrilift) for outstanding platform contributions.",
  "Best Employee Award 2022 at OnyxTec for the e-commerce payment integration.",
  "Achieved a 4.0 GPA in the Master of Cybersecurity at Toronto Metropolitan University.",
  "Built an ML-based IDS reaching 99.99% detection accuracy on the CIC-IDS2017 dataset.",
  "Scaled SocialSquad to 50k+ concurrent users with 99.9% data integrity.",
];

export const languages = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Urdu", level: "Native" },
];

export const certifications = [
  { name: "Splunk: A SIEM Tool", issuer: "ThinkCloudly", status: "Completed" },
  { name: "SOC Analyst: A SIEM Tool", issuer: "ThinkCloudly", status: "Completed" },
  { name: "ISC2 Certification", issuer: "ISC2", status: "In Progress" },
] as const;

export const faqs = [
  {
    q: "What kind of roles are you looking for?",
    a: "Full-stack engineering and cybersecurity roles — including hybrid roles that combine secure software development with security operations. I'm based in Canada and open to opportunities across Canada and remote.",
  },
  {
    q: "What's your background as a developer?",
    a: "Five years building secure, scalable B2B and B2C SaaS across React/TypeScript and NestJS/Node.js — including platforms scaled to 50k+ concurrent users — starting in Pakistan and continuing across remote roles for US-based companies.",
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
