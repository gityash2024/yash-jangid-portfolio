// data/portfolio.ts
// Central Source of Truth for Yash Jangid's Verified Career Data, Metrics, Skills, and Projects

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI Platform' | 'Web3 / Fintech' | 'Healthcare AI' | 'Talent Tech' | 'Geospatial & Climate';
  description: string;
  impact: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  caseStudy: {
    overview: string;
    architecture: string[];
    technicalHighlights: string[];
    outcome: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  domain: string;
  type: 'Full-time' | 'Internship';
  highlights: string[];
  metrics: { label: string; value: string }[];
  skills: string[];
  current?: boolean;
}

export type SkillCategory = 'AI & Agentic' | 'Full Stack' | 'Healthcare AI' | 'Cloud & DevOps';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  proficiency: 'Expert' | 'Advanced' | 'Specialized';
  featured?: boolean;
  years?: number;
  highlight?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  major: string;
  period: string;
  year: number;
  gpa: string;
  maxGpa: string;
  location: string;
  honors: string[];
  coursework: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year: number;
  badge: string;
  description: string;
  keyContributions: string[];
}

export interface ProductionMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  detail: string;
  highlight: string;
}

// -----------------------------------------------------------------------------
// Personal & Contact Information
// -----------------------------------------------------------------------------
export const personalInfo = {
  name: 'Yash Jangid',
  title: 'Senior Full Stack Engineer · AI Platform & Agentic Architect',
  shortTitle: 'Senior Full Stack Engineer',
  status: 'Open to Senior Engineering Opportunities',
  email: 'gityash2024@gmail.com',
  location: 'Gurugram, India',
  timezone: 'Asia/Kolkata (IST, UTC+5:30)',
  yearsOfExperience: 5,
  socials: {
    github: 'https://github.com/gityash2024',
    githubUsername: '@gityash2024',
    linkedin: 'https://in.linkedin.com/in/yashjangid091099',
    linkedinUsername: 'yashjangid091099',
  },
  bio: 'Senior Full Stack Engineer with nearly five years of production experience building scalable architectures across Healthcare AI, Web3/Trading, Job-Tech, and Deterministic Agentic Systems. Strong across React 19/Next.js 15, Node.js, low-latency WebSockets, Redis distributed caching, DICOM/NIfTI medical imaging pipelines, and LLM orchestration.',
  summaryPoints: [
    '5+ years engineering scalable systems from zero-to-one and optimizing high-load platforms.',
    'Senior Full Stack Engineer at Imaging IQ driving oncology tumor detection & DICOM imaging pipelines.',
    'Former SDE I at ITH Technologies delivering Web3 trading engines, 40% latency drop, and 99.9% uptime.',
    'UPES B.Tech Computer Science graduate (GPA 8.9 / 10) & 2023 Technical Excellence Award recipient.',
  ],
};

// -----------------------------------------------------------------------------
// Verified Key Production Metrics
// -----------------------------------------------------------------------------
export const productionMetrics: ProductionMetric[] = [
  {
    id: 'throughput',
    label: 'API Throughput',
    value: '10,000+',
    unit: 'req / min',
    detail: 'High-frequency trading & exchange routing engine',
    highlight: 'Handled intense market volatility surges with sub-100ms response paths',
  },
  {
    id: 'latency',
    label: 'Server Latency',
    value: '40%',
    unit: 'reduction',
    detail: 'Redis hot-path caching & microservices migration',
    highlight: 'Dramatically reduced p95/p99 query latencies across critical endpoints',
  },
  {
    id: 'deployment',
    label: 'Deploy Velocity',
    value: '2h → 15m',
    unit: 'cycle time',
    detail: 'Automated Docker & GitHub Actions CI/CD pipelines',
    highlight: '70%+ improvement in release velocity with zero-downtime rolling updates',
  },
  {
    id: 'uptime',
    label: 'Production Uptime',
    value: '99.9%',
    unit: 'SLA maintained',
    detail: 'Achieved across 5+ live Web3 and enterprise platforms',
    highlight: 'Resilient failover architecture and proactive health monitoring',
  },
  {
    id: 'users',
    label: 'Users Served',
    value: '10,000+',
    unit: 'active users',
    detail: 'Enterprise healthcare & Web3 token platforms',
    highlight: 'High concurrency user sessions with zero state desynchronization',
  },
  {
    id: 'packages',
    label: 'Internal Packages',
    value: '8+',
    unit: 'npm libraries',
    detail: 'Reusable shared packages authored for team-wide use',
    highlight: 'Standardized API clients, UI primitives, and security middleware',
  },
];

// -----------------------------------------------------------------------------
// Flagship Projects
// -----------------------------------------------------------------------------
export const flagshipProjects: ProjectItem[] = [
  {
    id: 'medical-imaging',
    title: 'Medical Imaging AI Platform',
    category: 'Healthcare AI',
    description:
      'End-to-end medical imaging ingestion and processing pipeline connecting DICOM/NIfTI formats with OHIF Viewer and Orthanc PACS. Integrates 3D UNet tumor segmentation models and LLM agentic report orchestration into observable clinical workflows.',
    impact: '98.4% model confidence & sub-100ms slice streaming',
    image: '/images/medical-imaging.jpg',
    tags: ['React 19', 'Node.js', 'DICOM', 'NIfTI', 'OHIF Viewer', 'Orthanc', 'LLM Orchestration', 'PyTorch'],
    metrics: [
      { label: 'Segmentation Dice', value: '98.4%' },
      { label: 'Slice Streaming', value: '< 100ms' },
      { label: 'PACS Protocol', value: 'DICOMweb' },
      { label: 'Architecture', value: 'Decoupled Microservices' },
    ],
    caseStudy: {
      overview:
        'Clinical oncology diagnostic teams required an integrated system to ingest high-slice-count CT and MRI scans, visualize multi-planar reconstructions (MPR) in real time, and run automated tumor segmentation models with verifiable pipeline state.',
      architecture: [
        'Secure store-and-forward DICOM ingestion via Orthanc PACS and DICOMweb WADO-RS / QIDO-RS protocols.',
        'High-performance client-side rendering via OHIF Viewer embedded in custom React interface.',
        'Decoupled Node.js microservices for background volume normalization (SimpleITK/NumPy) and GPU model dispatch.',
        'Agentic LLM orchestration service executing structured JSON tool calling for clinical summary generation.',
      ],
      technicalHighlights: [
        'Integrated OHIF Viewer with custom multi-planar reconstruction overlays for lesion heatmaps.',
        'Engineered memory-efficient streaming for 3D NIfTI volume tensors exceeding 1GB.',
        'Built deterministic pipeline telemetry displaying ingestion, normalization, inference, and clinician sign-off stages.',
      ],
      outcome:
        'Achieved sub-100ms slice streaming latency, 98.4% Dice similarity coefficient on tumor segmentations, and accelerated clinician review turnaround by over 50%.',
    },
  },
  {
    id: 'trading-infrastructure',
    title: 'CEX / DEX Strategy Portal',
    category: 'Web3 / Fintech',
    description:
      'High-throughput algorithmic trading portal handling 10,000+ requests/minute with sub-100ms critical path execution. Full-duplex WebSocket order book synchronization with Redis distributed cache layers and multi-exchange order routing.',
    impact: '40% latency reduction & <100ms response paths',
    image: '/images/trading-terminal.jpg',
    tags: ['React', 'Node.js', 'Express', 'Redis', 'WebSockets', 'Web3.js', 'Docker', 'MongoDB'],
    metrics: [
      { label: 'API Throughput', value: '10,000+ req/min' },
      { label: 'Critical Latency', value: '< 100ms' },
      { label: 'Server Latency Drop', value: '-40%' },
      { label: 'Cache Hit Ratio', value: '94.2%' },
    ],
    caseStudy: {
      overview:
        'In high-volatility financial markets, trading execution engines experience extreme query bursts. The platform needed to maintain real-time order book state across centralized (Binance, Bybit) and decentralized liquidity pools without degrading UI latency.',
      architecture: [
        'Redis distributed in-memory cache layer storing hot-path order books, ticker depths, and active session tokens.',
        'Cluster of WebSocket background workers multiplexing raw exchange price feeds into a unified client broadcast stream.',
        'Separation of read-heavy public market feeds from transactional order-signing execution microservices.',
        'MongoDB replica set for historical candle persistence with aggressive compound index optimization.',
      ],
      technicalHighlights: [
        'Cut server response latency by 40% through Redis pub/sub and multi-tier memory caching.',
        'Maintained sub-100ms critical path execution for real-time order routing under 10,000+ req/min peak loads.',
        'Designed fail-safe WebSocket reconnect algorithms with differential sequence validation to prevent order book desynchronization.',
      ],
      outcome:
        'Handled sustained spikes of 10,000+ req/min with zero dropped packets, achieved 94.2% Redis hit rate, and guaranteed sub-100ms order acknowledgment paths.',
    },
  },
  {
    id: 'tdx-launchpad',
    title: 'TDX Launchpad',
    category: 'Web3 / Fintech',
    description:
      'Decentralized multi-chain token launchpad and liquidity allocation platform supporting high-concurrency public sale events with zero-downtime execution, verified smart contract signing protocols, and real-time vesting analytics.',
    impact: '99.9% uptime during peak token sale surges',
    image: '/images/crypto-launchpad.jpg',
    tags: ['React', 'Web3.js', 'Node.js', 'MongoDB', 'Redis', 'Smart Contracts', 'Docker'],
    metrics: [
      { label: 'System Uptime', value: '99.9% SLA' },
      { label: 'Active Users', value: '10,000+' },
      { label: 'State Sync Errors', value: '0 desyncs' },
      { label: 'Security Breaches', value: '0 incidents' },
    ],
    caseStudy: {
      overview:
        'Public token sale events create intense traffic stampedes where thousands of users connect Web3 wallets, execute KYC checks, and claim allocations in seconds. The launchpad required absolute uptime and zero race conditions during smart contract interactions.',
      architecture: [
        'Stateless Next.js and Node.js microservices autoscaling on AWS container instances behind Nginx load balancers.',
        'Web3.js wallet adapter layer supporting MetaMask, WalletConnect, and Coinbase Wallet with cryptographic nonces.',
        'Redis queue workers orchestrating allocation validation, tiered staking requirements, and whitelist signatures.',
        'Real-time tokenomics dashboards streaming liquidity pool reserves, lockups, and vesting schedules.',
      ],
      technicalHighlights: [
        'Maintained 99.9% uptime across 5+ high-volume public token sale surges serving over 10,000 active users.',
        'Implemented EIP-712 typed structured data signing for gasless whitelist verification and anti-sybil protection.',
        'Architected real-time WebSocket state distribution for multi-tier lottery allocations and dynamic bonding curves.',
      ],
      outcome:
        'Successfully facilitated high-volume public token allocations with 100% transaction integrity, zero platform downtime, and seamless multi-chain wallet interactions.',
    },
  },
  {
    id: 'recruin',
    title: 'Recruin Talent Intelligence',
    category: 'Talent Tech',
    description:
      'Automated talent matching platform serving 5,000+ active candidates and recruiters. Real-time WebSocket messaging, skill graph parsing, ATS workflow automation, role-based JWT security, and secure AWS S3 document ingestion.',
    impact: '92% profile-to-job matching precision',
    image: '/images/recruin-platform.jpg',
    tags: ['React', 'Node.js', 'Redux Toolkit', 'AWS S3', 'WebSockets', 'JWT', 'MongoDB'],
    metrics: [
      { label: 'Active Users', value: '5,000+' },
      { label: 'Match Precision', value: '92%' },
      { label: 'User Roles', value: '3 Granular Tiers' },
      { label: 'State Management', value: 'Redux Toolkit' },
    ],
    caseStudy: {
      overview:
        'Traditional hiring platforms suffer from disjointed recruiter-candidate communication, manual resume screening bottlenecks, and opaque candidate pipeline tracking. Recruin aimed to automate skill matching and provide real-time interactive hiring pipelines.',
      architecture: [
        'Bidirectional WebSocket messaging layer enabling instant candidate-recruiter chat, presence detection, and read receipts.',
        'Skill extraction and relevance ranking engine matching candidate skill graphs against job specifications with 92% accuracy.',
        'Secure AWS S3 integration generating time-limited pre-signed URLs for resume document uploads and PDF rendering.',
        'JWT authentication middleware with fine-grained role-based access control (Candidates, Recruiters, Hiring Managers).',
      ],
      technicalHighlights: [
        'Scaled to 5,000+ active users with real-time kanban pipeline state synchronized via Redux Toolkit.',
        'Built automated resume parsing microservice supporting multi-format document intake (.pdf, .docx).',
        'Engineered an intuitive candidate review interface that reduced recruiter screening time by 45%.',
      ],
      outcome:
        'Attained 92% automated match accuracy, scaled to over 5,000 active users, and delivered an uninterrupted 100% secure hiring workflow.',
    },
  },
  {
    id: 'softlogic',
    title: 'Softlogic AI Studio',
    category: 'AI Platform',
    description:
      'Enterprise LLM fine-tuning and agentic workflow orchestration suite. Empowers enterprise teams to run parameter-efficient LoRA adapters, evaluate streaming completions, and execute deterministic multi-tool DAGs.',
    impact: '3.8x faster model deployment & 99.4% task completion rate',
    image: '/images/softlogic-studio.jpg',
    tags: ['Next.js 15', 'TypeScript', 'FastAPI', 'PyTorch', 'vLLM', 'Qdrant', 'Docker', 'Tailwind CSS'],
    metrics: [
      { label: 'Model Deployment', value: '3.8x faster' },
      { label: 'Task Accuracy', value: '99.4% SLA' },
      { label: 'Token Latency', value: '< 18ms TTFT' },
      { label: 'Vector Indexing', value: '1.2M docs/hr' },
    ],
    caseStudy: {
      overview:
        'Enterprise clients required a unified platform to fine-tune open-weight models (Llama 3, Mistral), index proprietary documentation with dense vector embeddings, and automate complex customer and data workflows via autonomous agents.',
      architecture: [
        'FastAPI asynchronous backend with vLLM high-throughput tensor-parallel serving.',
        'Qdrant vector database for hybrid semantic and keyword search.',
        'React 19 / Next.js 15 interactive playground for real-time prompt engineering and telemetry inspection.',
        'Model Context Protocol (MCP) tool bindings for deterministic external API access.',
      ],
      technicalHighlights: [
        'Reduced model deployment cycle from 2 weeks to 3 days using automated LoRA merge pipelines.',
        'Engineered client-side streaming token parser with live latency visualization.',
        'Built deterministic pipeline telemetry with full execution traces.',
      ],
      outcome:
        'Accelerated model deployment by 3.8x, achieved 99.4% tool invocation precision across 15 enterprise clients, and served millions of daily inferences with zero downtime.',
    },
  },
  {
    id: 'mirsat',
    title: 'Mirsat Geointelligence Engine',
    category: 'AI Platform',
    description:
      'Real-time low-earth orbit (LEO) satellite telemetry ingestion and geospatial analytics platform. Processes synthetic aperture radar (SAR) feeds, orbital ephemeris propagation (SGP4), and live geospatial map overlays.',
    impact: '50,000+ telemetry frames/sec & sub-50ms map rendering',
    image: '/images/mirsat-satellite.jpg',
    tags: ['React', 'WebGL', 'Mapbox GL', 'Node.js', 'Go', 'TimescaleDB', 'Kafka', 'WebSockets'],
    metrics: [
      { label: 'Telemetry Ingestion', value: '50K frames/sec' },
      { label: 'Map Frame Rate', value: '60 FPS stable' },
      { label: 'End-to-End Latency', value: '< 45ms' },
      { label: 'Tracked Satellites', value: '120+ active' },
    ],
    caseStudy: {
      overview:
        'Earth observation networks operate high-frequency constellations transmitting raw sensor streams, GPS telemetry, and SAR radar imagery. Mirsat needed to ingest, validate, and project this data onto 3D globe interfaces in sub-second intervals.',
      architecture: [
        'Apache Kafka ingestion cluster partitioning raw telemetry bursts.',
        'High-performance Go microservices calculating orbital ephemeris coordinates via SGP4 propagation algorithms.',
        'TimescaleDB hypertable storage with WebGL GPU rendering on frontend.',
        'Sub-50ms WebSocket fanout architecture to mission control operators.',
      ],
      technicalHighlights: [
        'Built WebGL geospatial particle renderer maintaining silky 60 FPS under 100,000 concurrent orbital coordinates.',
        'Implemented anomaly detection algorithms identifying satellite trajectory deviations in real time.',
        'Designed sub-50ms WebSocket fanout architecture to mission control operators.',
      ],
      outcome:
        'Ingested over 50,000 telemetry frames per second at <45ms pipeline latency, successfully monitoring 120+ active orbital bodies without data loss.',
    },
  },
  {
    id: 'sacred-groves',
    title: 'Sacred Groves Natural Capital Platform',
    category: 'Web3 / Fintech',
    description:
      'Decentralized terrestrial ecosystem preservation platform protecting biodiverse forests through satellite canopy verification, immutable environmental audits, and zero-fee Web3 micro-conservation contracts.',
    impact: '250,000+ sq meters conserved & 100% cryptographic audit trail',
    image: '/images/sacred-groves.jpg',
    tags: ['Next.js', 'Web3.js', 'Ethereum', 'Polygon', 'Leaflet', 'Python GDAL', 'PostgreSQL', 'AWS'],
    metrics: [
      { label: 'Conserved Area', value: '250K+ sq meters' },
      { label: 'Cryptographic Audit', value: '100% on-chain' },
      { label: 'Satellite Resolution', value: '10m Sentinel-2' },
      { label: 'System SLA', value: '99.95%' },
    ],
    caseStudy: {
      overview:
        'Natural capital markets suffer from opaque carbon offsets, double-counting, and lack of ground-truth satellite verification. Sacred Groves required an auditable, transparent web platform linking satellite biomass indices with tamper-proof conservation tokens.',
      architecture: [
        'Automated Sentinel-2 multispectral satellite data pipeline computing Normalized Difference Vegetation Index (NDVI).',
        'Polygon smart contracts recording immutable conservation events.',
        'Responsive Next.js web application with interactive GIS forest mapping.',
        'Zero-fee Web3 custody flow ensuring complete security.',
      ],
      technicalHighlights: [
        'Integrated Python GDAL spatial raster processing pipelines to track forest canopy health dynamically.',
        'Architected gas-optimized smart contracts ensuring verified micro-conservations are permanently recorded on public ledgers.',
        'Built high-fidelity map exploration UI enabling users to inspect specific forest clusters down to square-meter precision.',
      ],
      outcome:
        'Conserved over 250,000 square meters of high-biodiversity ecosystems with 100% cryptographic auditing and verified 99.95% platform availability.',
    },
  },
];

// -----------------------------------------------------------------------------
// Career Experience Timeline
// -----------------------------------------------------------------------------
export const careerExperiences: ExperienceItem[] = [
  {
    id: 'imaging-iq',
    company: 'Imaging IQ',
    role: 'Senior Full Stack Engineer',
    period: 'Jan 2026 — Present',
    location: 'Gurugram, India',
    domain: 'Healthcare AI & Medical Imaging Platforms',
    type: 'Full-time',
    current: true,
    highlights: [
      'Engineered end-to-end medical imaging workflows spanning ingestion, visualization, processing, and pipeline orchestration for oncology tumor-detection use cases.',
      'Implemented DICOM and NIfTI data pipelines integrated with OHIF Viewer for client-side multi-planar rendering and Orthanc for PACS store-and-forward study routing.',
      'Architected backend Node.js APIs and LLM orchestration services for deterministic AI workflow execution and structured agentic tool calling.',
      'Integrated AI-assisted imaging analysis into clinical workflows, ensuring pipeline state (ingest, preprocessing, inference, visualization) is fully observable and controllable.',
      'Decoupled high-context medical imaging services so viewer, storage, orchestration, and GPU AI inference scale independently.',
    ],
    metrics: [
      { label: 'Segmentation Dice', value: '98.4%' },
      { label: 'Slice Latency', value: '< 100ms' },
      { label: 'Pipeline Observability', value: '100%' },
    ],
    skills: [
      'React 19',
      'Next.js 15',
      'TypeScript',
      'Node.js',
      'DICOM',
      'NIfTI',
      'OHIF Viewer',
      'Orthanc PACS',
      'LLM Orchestration',
      'Model Context Protocol (MCP)',
      'REST APIs',
      'Python',
    ],
  },
  {
    id: 'ith-technologies-sde1',
    company: 'ITH Technologies Pvt. Ltd.',
    role: 'Software Development Engineer (Full Stack / SDE I)',
    period: 'Jul 2022 — Dec 2025 (3.5 Years)',
    location: 'Gurugram, India',
    domain: 'Web3, Real-Time Trading Infrastructure & Enterprise Microservices',
    type: 'Full-time',
    highlights: [
      'Architected, built, and deployed 5+ production Web3 platforms maintaining 99.9% uptime and serving 10,000+ active users.',
      'Reduced server latency by 40% and improved deployment speed by 70% through microservices decomposition, Redis hot-path caching, and database query optimization.',
      'Engineered real-time trading systems handling 10,000+ API requests/minute with critical response paths operating consistently under 100ms.',
      'Developed full-duplex WebSocket layers for real-time order book synchronization, price feeds, and dynamic state fan-out.',
      'Authored 8+ reusable internal npm packages and shared utility libraries adopted company-wide across engineering squads.',
      'Reduced deployment cycle time from ~2 hours down to 15 minutes by implementing Docker containerization and automated GitHub Actions CI/CD pipelines.',
    ],
    metrics: [
      { label: 'Active Users', value: '10,000+' },
      { label: 'Throughput', value: '10,000+ req/min' },
      { label: 'Latency Drop', value: '40%' },
      { label: 'Deploy Cycle', value: '2h → 15m' },
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Internal Packages', value: '8+ npm' },
    ],
    skills: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'Redis',
      'WebSockets',
      'MongoDB',
      'Web3.js',
      'AWS (EC2, S3, Lambda)',
      'Docker',
      'GitHub Actions',
      'Nginx',
      'JWT',
    ],
  },
  {
    id: 'ith-technologies-intern',
    company: 'ITH Technologies Pvt. Ltd.',
    role: 'Software Development Engineer Intern',
    period: 'Jan 2022 — Jul 2022 (7 Months)',
    location: 'Gurugram, India',
    domain: 'Full Stack Web Development & Frontend Architecture',
    type: 'Internship',
    highlights: [
      'Built responsive user interfaces and integrated frontend components with backend REST APIs.',
      'Investigated and resolved production bugs, improved error logging, and wrote integration tests for core modules.',
      'Collaborated on feature development, optimized client bundle sizes, and participated in live production deployment cycles.',
    ],
    metrics: [
      { label: 'Tenure', value: '7 Months' },
      { label: 'Promotion', value: 'Accelerated to SDE I' },
    ],
    skills: ['React', 'JavaScript (ES6+)', 'Node.js', 'REST APIs', 'CSS3', 'Git'],
  },
];

// -----------------------------------------------------------------------------
// Skills Taxonomy Matrix
// -----------------------------------------------------------------------------
export const skillsTaxonomy: SkillItem[] = [
  // AI & Agentic
  {
    name: 'LLM Orchestration',
    category: 'AI & Agentic',
    proficiency: 'Expert',
    featured: true,
    years: 3,
    highlight: 'Deterministic agentic workflows, prompt chaining, and clinical synthesis',
  },
  {
    name: 'Model Context Protocol (MCP)',
    category: 'AI & Agentic',
    proficiency: 'Expert',
    featured: true,
    years: 2,
    highlight: 'Standardized client-server tool integration for agent runtimes',
  },
  {
    name: 'Agentic Workflows',
    category: 'AI & Agentic',
    proficiency: 'Expert',
    featured: true,
    years: 3,
    highlight: 'Autonomous step execution, tool-calling loops, and failure recovery',
  },
  {
    name: 'Structured Tool Execution',
    category: 'AI & Agentic',
    proficiency: 'Expert',
    featured: false,
    years: 3,
    highlight: 'Strict JSON schema validation and function calling',
  },
  {
    name: 'Human-in-the-Loop Validation',
    category: 'AI & Agentic',
    proficiency: 'Advanced',
    featured: false,
    years: 2,
    highlight: 'Clinician approval gates for medical AI inferences',
  },
  {
    name: 'AI Coding Copilots & CLI Tools',
    category: 'AI & Agentic',
    proficiency: 'Expert',
    featured: false,
    years: 4,
    highlight: 'OpenAI Codex, Claude Code, Cursor, Antigravity workflow automation',
  },

  // Full Stack Engineering
  {
    name: 'React 19 & Next.js 15',
    category: 'Full Stack',
    proficiency: 'Expert',
    featured: true,
    years: 5,
    highlight: 'Modern App Router, Server Components, SSR, and interactive CSR islands',
  },
  {
    name: 'TypeScript',
    category: 'Full Stack',
    proficiency: 'Expert',
    featured: true,
    years: 5,
    highlight: 'Strict type systems, generic interfaces, and zero-any codebases',
  },
  {
    name: 'Node.js & Express',
    category: 'Full Stack',
    proficiency: 'Expert',
    featured: true,
    years: 5,
    highlight: 'High-throughput microservices, streaming endpoints, and API design',
  },
  {
    name: 'Redis Caching & Pub/Sub',
    category: 'Full Stack',
    proficiency: 'Expert',
    featured: true,
    years: 4,
    highlight: 'Hot-path caching, latency reduction, and message fan-out channels',
  },
  {
    name: 'WebSockets & Socket.io',
    category: 'Full Stack',
    proficiency: 'Expert',
    featured: true,
    years: 4,
    highlight: 'Full-duplex real-time synchronization under 10,000+ req/min',
  },
  {
    name: 'MongoDB & Mongoose',
    category: 'Full Stack',
    proficiency: 'Advanced',
    featured: false,
    years: 4,
    highlight: 'Cluster sharding, compound indexing, and aggregation pipelines',
  },
  {
    name: 'Redux Toolkit',
    category: 'Full Stack',
    proficiency: 'Advanced',
    featured: false,
    years: 4,
    highlight: 'Normalized state management for high-complexity multi-screen UIs',
  },
  {
    name: 'Tailwind CSS & Framer Motion',
    category: 'Full Stack',
    proficiency: 'Expert',
    featured: false,
    years: 4,
    highlight: 'Dark luxury cyber design tokens, responsive bento grids, and 60 FPS physics',
  },
  {
    name: 'HTML5 Canvas & Web Audio API',
    category: 'Full Stack',
    proficiency: 'Advanced',
    featured: false,
    years: 3,
    highlight: 'Procedural particle constellations and zero-asset synthesized sound',
  },

  // Healthcare AI & Medical Imaging
  {
    name: 'DICOM Standards & Protocols',
    category: 'Healthcare AI',
    proficiency: 'Expert',
    featured: true,
    years: 2,
    highlight: 'DICOMweb WADO-RS, QIDO-RS, metadata extraction, and series indexing',
  },
  {
    name: 'NIfTI 3D Volume Processing',
    category: 'Healthcare AI',
    proficiency: 'Expert',
    featured: true,
    years: 2,
    highlight: 'Voxel normalization, affine transforms, and multi-planar re-slicing',
  },
  {
    name: 'OHIF Viewer Integration',
    category: 'Healthcare AI',
    proficiency: 'Expert',
    featured: true,
    years: 2,
    highlight: 'Custom React viewer integration, lesion masks, and segmentation tools',
  },
  {
    name: 'Orthanc PACS / VNA Server',
    category: 'Healthcare AI',
    proficiency: 'Expert',
    featured: true,
    years: 2,
    highlight: 'PACS store-and-forward coordination, routing rules, and storage backends',
  },
  {
    name: 'Medical Imaging Pipelines',
    category: 'Healthcare AI',
    proficiency: 'Expert',
    featured: true,
    years: 2,
    highlight: 'Decoupled ingestion, normalization, AI segmentation, and review stages',
  },
  {
    name: 'Tumor Detection Workflows',
    category: 'Healthcare AI',
    proficiency: 'Advanced',
    featured: false,
    years: 2,
    highlight: '3D U-Net PyTorch models, Dice score verification, and lesion tracking',
  },

  // Cloud & DevOps
  {
    name: 'Docker & Containerization',
    category: 'Cloud & DevOps',
    proficiency: 'Expert',
    featured: true,
    years: 4,
    highlight: 'Multi-stage production builds, microservice orchestration, and dev consistency',
  },
  {
    name: 'GitHub Actions CI/CD',
    category: 'Cloud & DevOps',
    proficiency: 'Expert',
    featured: true,
    years: 4,
    highlight: 'Automated test suites, security scans, and deployment cut from 2h to 15m',
  },
  {
    name: 'AWS (EC2, S3, Lambda)',
    category: 'Cloud & DevOps',
    proficiency: 'Advanced',
    featured: true,
    years: 4,
    highlight: 'Auto-scaling groups, pre-signed upload URLs, and serverless background tasks',
  },
  {
    name: 'Nginx Reverse Proxy',
    category: 'Cloud & DevOps',
    proficiency: 'Advanced',
    featured: false,
    years: 4,
    highlight: 'SSL termination, load balancing, rate limiting, and WebSocket proxying',
  },
  {
    name: 'Linux, Bash & Git',
    category: 'Cloud & DevOps',
    proficiency: 'Expert',
    featured: false,
    years: 5,
    highlight: 'Production server operations, shell scripting, and branching hygiene',
  },
  {
    name: 'Testing (Jest, Mocha, Postman)',
    category: 'Cloud & DevOps',
    proficiency: 'Advanced',
    featured: false,
    years: 4,
    highlight: 'Comprehensive unit, integration, and API contract test verification',
  },
];

// -----------------------------------------------------------------------------
// Education & Academic Credentials
// -----------------------------------------------------------------------------
export const educationData: EducationItem = {
  institution: 'University of Petroleum and Energy Studies (UPES)',
  degree: 'Bachelor of Technology (B.Tech)',
  major: 'Computer Science and Engineering',
  period: '2018 — 2022',
  year: 2022,
  gpa: '8.9 / 10',
  maxGpa: '10.0',
  location: 'Dehradun, India',
  honors: [
    'Graduated with First Class with Distinction (Cumulative GPA 8.9 / 10)',
    'Specialized in Distributed Systems, Algorithms, and Software Architecture',
    'Active participant in university technical symposiums and competitive programming',
  ],
  coursework: [
    'Data Structures & Algorithms',
    'Distributed Systems & Cloud Computing',
    'Database Management Systems',
    'Object-Oriented Software Engineering',
    'Computer Networks & Protocols',
    'Operating Systems & Kernel Basics',
  ],
};

// -----------------------------------------------------------------------------
// Professional Honors & Technical Awards
// -----------------------------------------------------------------------------
export const awardsData: AwardItem[] = [
  {
    id: 'technical-excellence-2023',
    title: 'Technical Excellence Award',
    issuer: 'ITH Technologies Pvt. Ltd.',
    year: 2023,
    badge: 'ANNUAL EXCELLENCE',
    description:
      'Conferred for outstanding technical contribution, microservices architecture leadership, and measurable performance optimizations across production trading and Web3 systems.',
    keyContributions: [
      'Engineered Redis distributed caching layer yielding a verified 40% reduction in server latency.',
      'Containerized microservices via Docker and automated GitHub Actions CI/CD pipelines, slashing release cycles from 2 hours to 15 minutes.',
      'Authored 8+ shared internal npm libraries adopted company-wide across multidisciplinary engineering squads.',
    ],
  },
  {
    id: 'most-promising-newcomer-2023',
    title: 'Most Promising Newcomer',
    issuer: 'ITH Technologies Pvt. Ltd.',
    year: 2023,
    badge: 'RISING TALENT',
    description:
      'Conferred in recognition of exceptional early ownership, rapid engineering velocity, and deep architectural aptitude transitioning from intern to core SDE I.',
    keyContributions: [
      'Rapidly onboarded and took end-to-end ownership of mission-critical Web3 smart contract integration workflows.',
      'Achieved zero production downtime during high-concurrency token sale events with 10,000+ active users.',
      'Recognized for collaborative mentorship and technical documentation excellence.',
    ],
  },
];

// -----------------------------------------------------------------------------
// Categorized Skills Map
// -----------------------------------------------------------------------------
export const skillsByCategory: Record<string, string[]> = {
  'AI & Agentic': skillsTaxonomy.filter((s) => s.category === 'AI & Agentic').map((s) => s.name),
  'Full Stack Engineering': skillsTaxonomy.filter((s) => s.category === 'Full Stack').map((s) => s.name),
  'Healthcare AI': skillsTaxonomy.filter((s) => s.category === 'Healthcare AI').map((s) => s.name),
  'Cloud, DevOps & Systems': skillsTaxonomy.filter((s) => s.category === 'Cloud & DevOps').map((s) => s.name),
};

// -----------------------------------------------------------------------------
// Unified Portfolio Data Object
// -----------------------------------------------------------------------------
export const portfolioData = {
  personal: {
    ...personalInfo,
    github: personalInfo.socials.github,
    linkedin: personalInfo.socials.linkedin,
  },
  metrics: productionMetrics,
  projects: flagshipProjects,
  experience: careerExperiences,
  skills: skillsByCategory,
  skillsList: skillsTaxonomy,
  education: educationData,
  awards: awardsData,
};

