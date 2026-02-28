export const NAV_ITEMS = [
  { id: "about", label: "About", target: "about-wrapper" },
  { id: "solutions", label: "Solutions", target: "solutions-wrapper" },
  { id: "team", label: "Team", target: "team-wrapper" },
  { id: "research", label: "Research", target: "research-wrapper" },
  { id: "contact", label: "Contact", target: "contact-wrapper" },
];

export const HERO_CONTENT = {
  eyebrow: "// Est. 2024 · Bengaluru, India",
  title: ["GRID", "GENESIS"],
  subtitle: "Next-Generation Power Infrastructure",
};

export const ABOUT_CONTENT = {
  label: "01 - About",
  title: "Redefining Energy",
  accent: "Infrastructure",
  paragraphs: [
    "Grid Genesis is a deep-tech startup pioneering intelligent power grid solutions. We design, simulate, and deploy next-generation grid architectures that are resilient, adaptive, and renewable-ready.",
    "Founded by engineers and energy scientists, we sit at the intersection of embedded systems, AI-driven analytics, and sustainable infrastructure engineering.",
  ],
  stats: [
    [
      { value: "12+", label: "Patents Filed" },
      { value: "3.2GW", label: "Grid Managed" },
    ],
    [
      { value: "19", label: "Countries" },
      { value: "99.7%", label: "Uptime SLA" },
    ],
  ],
};

export const SOLUTIONS_CONTENT = {
  label: "02 - Solutions",
  title: "What We",
  accent: "Build",
  cards: [
    {
      id: "sol-1",
      number: "01",
      title: "Adaptive Grid Intelligence",
      description:
        "AI-driven real-time fault detection and load balancing across distributed energy networks. Processes millions of grid events per second to predict failures before they occur.",
      icon: "<rect x='2' y='2' width='28' height='28' stroke='currentColor' stroke-width='1.2'/><line x1='2' y1='16' x2='30' y2='16' stroke='currentColor' stroke-width='0.7'/><line x1='16' y1='2' x2='16' y2='30' stroke='currentColor' stroke-width='0.7'/><circle cx='16' cy='16' r='4' fill='currentColor' opacity='0.4'/>",
    },
    {
      id: "sol-2",
      number: "02",
      title: "Renewable Integration Engine",
      description:
        "Seamless integration of solar, wind, and battery storage. Dynamic scheduling algorithms maintain generation-consumption equilibrium in real time.",
      icon: "<circle cx='16' cy='16' r='12' stroke='currentColor' stroke-width='1.2'/><line x1='16' y1='4' x2='16' y2='28' stroke='currentColor' stroke-width='0.7'/><line x1='4' y1='16' x2='28' y2='16' stroke='currentColor' stroke-width='0.7'/><circle cx='16' cy='16' r='3.5' fill='currentColor' opacity='0.4'/>",
    },
    {
      id: "sol-3",
      number: "03",
      title: "Grid Digital Twin",
      description:
        "High-fidelity digital replicas of physical grid infrastructure. Simulate disaster scenarios and test upgrades entirely in a virtual environment before deployment.",
      icon: "<polygon points='16,2 30,10 30,22 16,30 2,22 2,10' stroke='currentColor' stroke-width='1.2' fill='none'/><line x1='16' y1='2' x2='16' y2='30' stroke='currentColor' stroke-width='0.7'/><line x1='2' y1='10' x2='30' y2='22' stroke='currentColor' stroke-width='0.7'/><line x1='30' y1='10' x2='2' y2='22' stroke='currentColor' stroke-width='0.7'/><circle cx='16' cy='16' r='3' fill='currentColor' opacity='0.5'/>",
    },
  ],
};

export const TEAM_CONTENT = {
  label: "03 - Team",
  title: "The",
  accent: "Minds",
  suffix: "Behind the Grid",
  members: [
    {
      id: "tc-1",
      initials: "AK",
      name: "Arjun Krishnan",
      role: "CEO & Co-founder",
      bio: "Power systems engineer with 14 years at GE Grid Solutions. Expert in HV transmission and smart grid protocols. Led $200M+ grid modernization projects across Southeast Asia.",
    },
    {
      id: "tc-2",
      initials: "SP",
      name: "Shreya Patel",
      role: "CTO & Co-founder",
      bio: "PhD in Electrical Engineering from IISc. Former researcher at MIT Energy Initiative. Holds 8 patents in grid-edge computing and distributed energy resource management.",
    },
    {
      id: "tc-3",
      initials: "RN",
      name: "Rahul Nair",
      role: "Head of Research",
      bio: "ML researcher specializing in time-series forecasting for energy markets. Previously at DeepMind Energy. Designed the core AI model powering our Adaptive Grid Intelligence platform.",
    },
  ],
};

export const RESEARCH_CONTENT = {
  label: "04 - Research & Publications",
  title: "Our",
  accent: "Scientific",
  suffix: "Contributions",
  description:
    "Peer-reviewed research, conference papers, and white papers advancing the science of intelligent grid systems.",
  cards: [
    {
      id: "rc-1",
      number: "01 / 03",
      tag: "Journal Paper - IEEE - 2024",
      title: "Transformer-Based Fault Prediction in Distributed Energy Networks Using Real-Time PMU Data Streams",
      meta: "Krishnan A., Patel S., Nair R. et al.",
      meta2: "IEEE Transactions on Power Systems - Vol. 39, Issue 4",
      abstract:
        "A novel transformer architecture for multivariate time-series anomaly detection in HV transmission networks, achieving 94.3% fault prediction accuracy with sub-second latency.",
    },
    {
      id: "rc-2",
      number: "02 / 03",
      tag: "Conference Paper - ISGT Europe - 2023",
      title: "Digital Twin Synchronization Protocol for Real-Time Grid State Estimation in Heterogeneous Networks",
      meta: "Nair R., Krishnan A., Bose T.",
      meta2: "ISGT Europe 2023 - Grenoble, France",
      abstract:
        "DTS-Sync: a lightweight protocol enabling sub-100ms synchronization between physical grid sensors and digital twin environments with less than 0.3% state estimation error.",
    },
    {
      id: "rc-3",
      number: "03 / 03",
      tag: "White Paper - 2024",
      title: "AI-Driven Flexibility Markets for Renewable Integration in South Asian Power Grids",
      meta: "Patel S., Krishnan A., Verma D.",
      meta2: "Grid Genesis Research Report - GG-WP-2024-01",
      abstract:
        "A comprehensive policy and technology framework addressing renewable integration across 14 South Asian nations covering 2.1TW of installed grid capacity, including regulatory and market design recommendations.",
    },
  ],
};

export const CONTACT_CONTENT = {
  label: "05 - Contact",
  title: "Let's",
  accent: "Connect",
  description:
    "Whether you're a utility, investor, or fellow researcher, we'd love to talk about the future of energy.",
  fields: [
    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
    { id: "email", label: "Email", type: "email", placeholder: "you@org.com" },
    { id: "organization", label: "Organization", type: "text", placeholder: "Company / Institution" },
    { id: "subject", label: "Subject", type: "text", placeholder: "Partnership / Research / Investment" },
  ],
  message: { id: "message", label: "Message", placeholder: "Tell us about your project..." },
  copyright: "© 2025 Grid Genesis Technologies Pvt. Ltd.",
};
