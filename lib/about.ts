/**
 * Synthesized narrative voice for the About page.
 *
 * IMPORTANT: This file contains NO new facts. Every concrete claim (roles,
 * dates, metrics, projects, technologies) lives in `lib/resume.ts` and remains
 * the single source of truth. The content here is an *interpretation* of that
 * real work — engineering philosophy and working style inferred from shipped
 * outcomes. No fabricated leadership scope, team sizes, client stories, or
 * architecture ownership beyond what the CV already attributes.
 */

/**
 * Three-paragraph bio for the About hero.
 * Para 1: who he is + full-stack background from Pakistan.
 * Para 2: the move to Canada + transition into cybersecurity.
 * Para 3: what he's working on now + what he's looking for.
 */
export const bio = [
  "I'm Huzaifa Khalid — a full-stack software engineer with five years building secure, scalable B2B and B2C SaaS products. My career started in Pakistan at OnyxTec, where I shipped SocialSquad, a MERN event platform that scaled to 50k+ concurrent users, optimized high-volume MySQL/Sequelize backends to 99.9% data integrity, and built reusable React component libraries across client platforms. From there I worked across React/TypeScript and NestJS/Node.js stacks for US-based companies — Devsinc and TenX (Agrilift) — engineering real-time features, analytics modules, and secure frontend systems, and earning an Excellence Award along the way.",
  "Moving to Canada, I pursued a Master of Cybersecurity at Toronto Metropolitan University (4.0 GPA) and turned my software background toward defending the systems I used to build. I went deep on SOC design and incident response — simulating a LockBit ransomware lifecycle through the NIST SP 800-61 phases, correlating SIEM, EDR, and authentication logs, and mapping adversary TTPs to MITRE ATT&CK. I built an ML-based intrusion detection system reaching 99.99% accuracy on the CIC-IDS2017 dataset, and designed Zero Trust security architectures mapped to NIST CSF, CIS Controls, HIPAA, and PHIPA.",
  "Today I work as a Cybersecurity Analyst at Vosyn — monitoring SaaS and enterprise environments, running vulnerability assessments with Nessus and Metasploit, and responding to incidents under NIST SP 800-61 — while keeping my engineering edge sharp. I'm looking for roles that let me do both: build production software and secure it, whether that's full-stack engineering with a security mindset, a SOC/security-analyst role, or a hybrid of the two. I'm based in Toronto and open to opportunities across Canada and remote.",
] as const;

/** Engineering philosophy - each principle is anchored to a real, CV-backed result. */
export const principles = [
  {
    title: "Security is part of engineering, not a phase after it.",
    body: "I don't treat security as a gate at the end. At Devsinc I implemented secure data handling and integrity controls inside real-time interactions; at TenX I built secure frontend modules and led peer code reviews. Secure SDLC is just how good software gets built.",
  },
  {
    title: "Performance and reliability are features.",
    body: "Engineering decisions move real numbers. Real-time analytics work at TenX boosted platform responsiveness by 35%, and SocialSquad held 99.9% data integrity while scaling to 50k+ users. Speed and reliability are what users actually feel.",
  },
  {
    title: "Reusable systems compound.",
    body: "Reusable Angular and React component libraries cut delivery timelines by 25–30% across enterprise clients. The right abstraction pays back every time the next person ships on top of it.",
  },
  {
    title: "Frameworks turn chaos into process.",
    body: "Incident response without a framework is just firefighting. Mapping every action to NIST SP 800-61 and MITRE ATT&CK turns a messy investigation into a repeatable, auditable playbook.",
  },
  {
    title: "Defend with evidence, not assumptions.",
    body: "Correlating SIEM, EDR, and authentication logs is how the real attack story emerges. In the TD Bank SOC simulation, that correlation surfaced 18 indicators of compromise and the full attack timeline.",
  },
  {
    title: "Minimize false positives — they erode trust.",
    body: "Building an ML-based IDS, I learned that feature selection often matters more than the model. Detection that cries wolf is detection nobody acts on; precision is part of the design.",
  },
] as const;

/** What I solve best - outcome framings mapped to real projects. */
export const strengths = [
  {
    outcome: "Secure full-stack SaaS",
    body: "Production B2B/B2C products built across React/Angular and NestJS/Node.js with secure SDLC practices baked in from the start.",
    proof: "SocialSquad",
    slug: "socialsquad",
  },
  {
    outcome: "SOC design & incident response",
    body: "Tiered SOC architecture and NIST SP 800-61 incident response, correlating SIEM/EDR/auth logs and mapping TTPs to MITRE ATT&CK.",
    proof: "SOC & Incident Response",
    slug: "soc-incident-response",
  },
  {
    outcome: "Real-time, scalable platforms",
    body: "Event and analytics platforms that stay fast and reliable under load — 50k+ concurrent users with 99.9% data integrity.",
    proof: "SocialSquad",
    slug: "socialsquad",
  },
  {
    outcome: "ML-driven threat detection",
    body: "Machine-learning intrusion detection tuned for precision — 99.99% accuracy across DDoS, Botnet, and Heartbleed traffic.",
    proof: "ML-Based IDS",
    slug: "ml-ids",
  },
  {
    outcome: "Enterprise frontend systems",
    body: "Reusable Angular/React component architectures with mapping and analytics integrations that accelerate delivery cycles.",
    proof: "Farmlink",
    slug: "farmlink",
  },
] as const;

/** Working style - how it feels to collaborate. */
export const workingStyle = [
  {
    title: "I build it and I secure it.",
    body: "I'm equally at home shipping a feature and threat-modeling it. That dual lens means fewer surprises later — security isn't someone else's problem after launch.",
  },
  {
    title: "I communicate in outcomes.",
    body: "Stakeholders care about uptime, risk, and conversion — not tool names. I translate technical findings and decisions into language leadership can act on.",
  },
  {
    title: "I work to frameworks and evidence.",
    body: "Whether it's NIST SP 800-61 or a peer code review checklist, I'd rather follow a repeatable process and let logs, metrics, and audits settle the question.",
  },
  {
    title: "I leave systems safer than I found them.",
    body: "Documentation, policies, and hardening aren't side quests — they're how the work keeps protecting people after I've moved on.",
  },
] as const;

/** Career journey - progression, not a flat timeline. Facts mirror lib/resume.ts. */
export const journey = [
  {
    period: "2022 – 2023",
    company: "OnyxTec",
    role: "Software Engineer (MERN)",
    arc: "Foundations in Pakistan",
    body: "Built SocialSquad — a MERN event platform scaled to 50k+ concurrent users — and optimized MySQL/Sequelize backends to 99.9% integrity. Recognized with the Best Employee Award 2022. This is where full-stack fundamentals set in.",
  },
  {
    period: "2023 – 2024",
    company: "Devsinc",
    role: "Frontend Developer",
    arc: "Real-time & AI",
    body: "Delivered a cross-platform React/React Native social app and a real-time matchmaking pipeline on NestJS/Node.js — with secure data handling and an AI recommendation engine that lifted engagement by 45%.",
  },
  {
    period: "2024 – 2026",
    company: "TenX (Agrilift)",
    role: "Software Engineer & Application Support",
    arc: "Enterprise scope",
    body: "Engineered Angular analytics modules that boosted responsiveness by 35%, led a 3-member frontend team, and ran the L1–L2 support pipeline. Earned the Excellence Award 2025 — and started embedding security into the SDLC.",
  },
  {
    period: "2026 – Present",
    company: "Vosyn",
    role: "Cybersecurity Analyst",
    arc: "Securing systems in Canada",
    body: "Now in Canada with a Master of Cybersecurity (4.0 GPA), I monitor enterprise and SaaS environments, run vulnerability assessments and pen tests, and respond to incidents under NIST SP 800-61 — defending the kinds of systems I once built.",
  },
] as const;

/** Beyond the resume - truthful technical curiosities (drawn from real skills). */
export const curiosities = [
  {
    title: "Detection engineering with ML",
    body: "Where machine learning genuinely sharpens threat detection — tuning features for precision, not chasing accuracy on paper.",
  },
  {
    title: "Secure system architecture",
    body: "Zero Trust segmentation, IAM-controlled zones, and the quiet design decisions that decide whether a breach is contained or catastrophic.",
  },
  {
    title: "AI-assisted product features",
    body: "RAG, vector search, and LLM integration applied where they actually improve a product — with secure data handling, not bolted on.",
  },
] as const;
