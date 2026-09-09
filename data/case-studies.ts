// data/case-studies.ts
// Deep Architectural Narratives & System Design Records for Flagship Deployments

export interface PipelineStage {
  stageNumber: number;
  name: string;
  tech: string;
  description: string;
  substeps: string[];
}

export interface ArchitectureTradeoff {
  decision: string;
  chosen: string;
  alternative: string;
  rationale: string;
}

export interface TechnicalHighlight {
  title: string;
  badge: string;
  description: string;
  keyPoints: string[];
}

export interface VerifiedOutcome {
  metric: string;
  label: string;
  context: string;
}

export interface SystemDiagramNode {
  id: string;
  label: string;
  sublabel: string;
  tech: string;
  status: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  clientOrCompany: string;
  role: string;
  period: string;
  category: 'Healthcare AI' | 'Web3 / Fintech' | 'Talent Tech' | 'AI Platform' | 'Geospatial & Climate';
  heroImage: string;
  diagramType: 'medical-imaging' | 'trading-infrastructure' | 'recruin' | 'tdx-launchpad' | 'softlogic' | 'mirsat' | 'sacred-groves';
  summary: string;
  challenge: {
    headline: string;
    description: string;
    constraints: string[];
    corePainPoints: string[];
  };
  architecture: {
    overview: string;
    diagramDescription: string;
    pipelineStages: PipelineStage[];
    tradeoffs: ArchitectureTradeoff[];
  };
  technicalHighlights: TechnicalHighlight[];
  verifiedOutcomes: VerifiedOutcome[];
  techStack: {
    category: string;
    technologies: string[];
  }[];
  liveStatus: string;
  systemDiagramNodes: SystemDiagramNode[];
}

export const caseStudiesData: CaseStudy[] = [
  // ---------------------------------------------------------------------------
  // 1. Medical Imaging AI Platform
  // ---------------------------------------------------------------------------
  {
    id: 'medical-imaging',
    title: 'Medical Imaging AI Platform',
    subtitle: 'High-Performance DICOM/NIfTI Diagnostic Ingestion, OHIF Viewer & Automated Tumor Segmentation',
    clientOrCompany: 'Imaging IQ',
    role: 'Senior Full Stack Engineer',
    period: 'Jan 2026 — Present',
    category: 'Healthcare AI',
    heroImage: '/images/medical-imaging.jpg',
    diagramType: 'medical-imaging',
    summary:
      'Engineered an enterprise healthcare platform enabling clinical oncology teams to ingest large volumetric DICOM and NIfTI studies, render diagnostic multi-planar reconstruction (MPR) scans in real time via OHIF Viewer, and execute automated 3D U-Net tumor segmentation pipelines with full stage visibility.',
    challenge: {
      headline: 'Bridging Multi-Gigabyte Binary Scans with Low-Latency Diagnostic Web Visualization',
      description:
        'Clinical oncology diagnostic workflows handle immense data volumes. A single patient CT or MRI series comprises hundreds of high-resolution 16-bit DICOM slices or multi-gigabyte 3D NIfTI volumes. Radiologists cannot tolerate viewing lag, slice stutter, or black-box AI predictions where model confidence and intermediate processing states are hidden.',
      constraints: [
        'Strict sub-100ms slice-stepping latency for smooth multi-planar scrolling in web browsers.',
        'Zero-loss handling of 16-bit Hounsfield Units (HU) dynamic range for diagnostic accuracy.',
        'Deterministic state orchestration across decoupled microservices (PACS store, volume preprocessing, GPU model inference, web viewer).',
        'Compliance with DICOMweb standards (WADO-RS, QIDO-RS, STOW-RS).',
      ],
      corePainPoints: [
        'High memory footprint crashing client browsers when loading uncompressed volumetric scans.',
        'Asynchronous AI segmentation jobs leaving clinicians in the dark without step-by-step telemetry.',
        'Complex coordination required between hospital PACS servers and web-native rendering engines.',
      ],
    },
    architecture: {
      overview:
        'The platform employs a decoupled microservices architecture. High-capacity Orthanc PACS instances handle store-and-forward medical study ingestion. Node.js backend orchestration services process study indexing, trigger background volume normalization (SimpleITK/NumPy), and dispatch tensor workloads to PyTorch inference services. The frontend embeds a customized OHIF Viewer delivering hardware-accelerated WebGL rendering with synchronized multi-planar reconstruction (axial, sagittal, coronal) and live segmentation contour overlays.',
      diagramDescription:
        '4-Stage Decoupled Flow: Orthanc PACS Ingest → Normalization Engine → 3D U-Net Inference Worker → OHIF Diagnostic Viewer with Agentic LLM Clinical Summary.',
      pipelineStages: [
        {
          stageNumber: 1,
          name: 'PACS Ingestion & DICOMweb Indexing',
          tech: 'Orthanc PACS, Node.js, DICOMweb',
          description:
            'Hospital modalities stream CT/MRI studies over DICOM C-STORE. Orthanc captures raw datasets and indexes study/series metadata via DICOMweb WADO-RS.',
          substeps: [
            'Parse DICOM header attributes (patient metadata, slice thickness, pixel spacing, window center/width).',
            'Generate lightweight thumbnail manifests and spatial orientation tensors for instant viewport initialization.',
          ],
        },
        {
          stageNumber: 2,
          name: 'Voxel Resampling & Normalization',
          tech: 'Python, SimpleITK, NumPy Worker',
          description:
            'Raw anisotropic voxels are resampled into isotropic 1.0mm³ grid coordinates and clamped to standard Hounsfield Unit windows.',
          substeps: [
            'Normalize intensity values to [-1000, +400] HU range for pulmonary/oncology tissue contrast.',
            'Construct binary 3D NIfTI tensors and chunk them for parallelized memory streaming.',
          ],
        },
        {
          stageNumber: 3,
          name: '3D U-Net Inference & Segmentation',
          tech: 'PyTorch, CUDA, Triton Server',
          description:
            'Preprocessed volume tensors are passed to an ensemble 3D U-Net model trained on oncology segmentation benchmarks.',
          substeps: [
            'Generate 3D voxel probability maps with 98.4% Dice similarity coefficient.',
            'Extract lesion contours, compute volumetric mass (cm³), and tag longest axial diameter.',
          ],
        },
        {
          stageNumber: 4,
          name: 'OHIF Client Rendering & Agentic Synthesis',
          tech: 'React 19, OHIF Viewer, LLM Orchestration',
          description:
            'Segmented contours stream to the client OHIF Viewer over WebSocket state channels. An agentic LLM parses radiological metrics into structured clinical drafts.',
          substeps: [
            'Render synchronized multi-planar reconstruction (axial, coronal, sagittal) with WebGL.',
            'Format deterministic clinical summary report awaiting physician verification and sign-off.',
          ],
        },
      ],
      tradeoffs: [
        {
          decision: 'OHIF Viewer vs. Custom WebGL Canvas from Scratch',
          chosen: 'Integrated OHIF Viewer with custom extensions',
          alternative: 'Building a proprietary WebGL DICOM viewer from zero',
          rationale:
            'OHIF provides industry-standard medical viewport tools (crosshairs, window/level, length measurement, segmentation masks) verified by the Open Health Imaging Foundation, allowing us to focus engineering resources on backend AI pipeline orchestration and latency reduction.',
        },
        {
          decision: 'Orthanc PACS vs. Direct S3 Binary Storage',
          chosen: 'Orthanc PACS as core VNA store-and-forward layer',
          alternative: 'Raw S3 bucket storage with ad-hoc metadata database',
          rationale:
            'Orthanc natively implements standard DICOM network protocols (C-STORE, C-FIND, C-MOVE) and DICOMweb REST services (WADO-RS), ensuring zero-friction integration with certified clinical hospital modalities.',
        },
        {
          decision: 'Chunked Progressive Streaming vs. Full Volume Download',
          chosen: 'Sub-100ms slice chunking with progressive resolution',
          alternative: 'Download entire 1GB+ series before initiating view',
          rationale:
            'Progressive slice streaming enables clinicians to begin diagnosing the first slice within 100ms while remaining slices buffer asynchronously in the background, eliminating initial loading delays.',
        },
      ],
    },
    technicalHighlights: [
      {
        title: 'Hardware-Accelerated MPR Rendering',
        badge: 'FRONTEND PERFORMANCE',
        description:
          'Integrated WebGL multi-planar reconstruction inside OHIF Viewer, achieving continuous 60 FPS viewport scrolling across axial, sagittal, and coronal planes.',
        keyPoints: [
          'GPU texture caching avoids re-uploading voxel buffers during interactive window/level adjustments.',
          'Dynamic memory management keeps browser RAM utilization bounded below 350MB even on 800+ slice CT exams.',
        ],
      },
      {
        title: 'Deterministic Agentic Telemetry',
        badge: 'AI PLATFORM',
        description:
          'Architected an agentic pipeline status engine providing clinicians real-time step visibility across ingestion, preprocessing, model execution, and report formulation.',
        keyPoints: [
          'Model Context Protocol (MCP) server exposes radiological tools for structured agentic reasoning.',
          'Enforces strict JSON schema validation, guaranteeing zero hallucinated medical units or coordinates.',
        ],
      },
      {
        title: 'Asynchronous Microservice Decoupling',
        badge: 'BACKEND ARCHITECTURE',
        description:
          'Decoupled high-capacity image storage from compute-heavy GPU inference nodes using message queues and containerized workers.',
        keyPoints: [
          'GPU workers scale dynamically with clinical queue depth without impacting real-time viewer API response.',
          'Graceful fallbacks: If AI inference is queued, viewing and manual contouring tools remain 100% interactive.',
        ],
      },
    ],
    verifiedOutcomes: [
      {
        metric: '98.4%',
        label: 'Dice Score Accuracy',
        context: 'Volumetric tumor segmentation precision validated against oncologist ground truth.',
      },
      {
        metric: '< 100ms',
        label: 'Slice Streaming Latency',
        context: 'Sub-100ms time-to-first-slice response on high-resolution multi-planar views.',
      },
      {
        metric: '50%+',
        label: 'Turnaround Reduction',
        context: 'Accelerated diagnostic turnaround time from raw study arrival to preliminary report formulation.',
      },
      {
        metric: '100%',
        label: 'Pipeline State Observability',
        context: 'Complete step-level transparency across ingest, inference, and clinician sign-off.',
      },
    ],
    techStack: [
      { category: 'Frontend', technologies: ['React 19', 'Next.js 15', 'TypeScript', 'OHIF Viewer', 'CornerstoneJS', 'Tailwind CSS'] },
      { category: 'Backend & APIs', technologies: ['Node.js', 'Express', 'Orthanc PACS', 'DICOMweb (WADO-RS)', 'Python', 'FastAPI'] },
      { category: 'AI & Inference', technologies: ['PyTorch', '3D U-Net', 'SimpleITK', 'NumPy', 'Model Context Protocol (MCP)', 'LLM Orchestration'] },
      { category: 'Infrastructure', technologies: ['Docker', 'AWS EC2 (GPU)', 'AWS S3', 'Nginx', 'GitHub Actions'] },
    ],
    liveStatus: 'Active Production System (Imaging IQ · Jan 2026 — Present)',
    systemDiagramNodes: [
      { id: 'node-ingest', label: 'Hospital PACS / Modality', sublabel: 'DICOM C-STORE Stream', tech: 'DICOM 3.0', status: 'Active' },
      { id: 'node-orthanc', label: 'Orthanc PACS / VNA Server', sublabel: 'Store & Forward / WADO-RS', tech: 'Orthanc VNA', status: 'Healthy' },
      { id: 'node-orchestration', label: 'Node.js Pipeline Gateway', sublabel: 'Study Indexing & Queue Dispatch', tech: 'Node.js / Express', status: 'Ready' },
      { id: 'node-ai', label: '3D U-Net GPU Cluster', sublabel: 'Tensor Normalization & Inference', tech: 'PyTorch / CUDA', status: '98.4% Dice' },
      { id: 'node-viewer', label: 'OHIF Client Diagnostic Hub', sublabel: '60 FPS Multi-Planar WebGL', tech: 'React 19 / OHIF', status: '<100ms Latency' },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. CEX / DEX Strategy Portal
  // ---------------------------------------------------------------------------
  {
    id: 'trading-infrastructure',
    title: 'CEX / DEX Strategy Portal',
    subtitle: 'Low-Latency Algorithmic Order Book Streaming & High-Throughput Execution Gateway',
    clientOrCompany: 'ITH Technologies Pvt. Ltd.',
    role: 'Full Stack Engineer (SDE I)',
    period: 'Jul 2022 — Dec 2025',
    category: 'Web3 / Fintech',
    heroImage: '/images/trading-terminal.jpg',
    diagramType: 'trading-infrastructure',
    summary:
      'Engineered a mission-critical FinTech algorithmic trading portal processing 10,000+ API requests/minute with sub-100ms critical response paths. Architected a multi-tier Redis hot-path caching architecture, full-duplex WebSocket fan-out channels, and decoupled exchange order routing services.',
    challenge: {
      headline: 'Preventing UI Freezes and Order Routing Delays Under High-Volatility Market Stampedes',
      description:
        'Financial market volatility triggers exponential traffic spikes. When major market moves occur, thousands of retail and algorithmic clients blast API endpoints while simultaneously consuming order book depth updates at 20+ updates per second. Traditional database-backed REST architectures crumble under this load, causing stale order book rendering, delayed execution acknowledgments, and financial slippage.',
      constraints: [
        'Sustain 10,000+ API requests per minute under peak market surges.',
        'Enforce strict sub-100ms round-trip latency on critical order placement and cancellation paths.',
        'Zero order book desynchronization during rapid price movements or brief network drops.',
        '99.9% uptime SLA across continuous 24/7 trading cycles.',
      ],
      corePainPoints: [
        'Database query bottlenecks when reading order book snapshots on every HTTP request.',
        'Browser DOM thrashing when rendering rapid-fire level 2 order book updates.',
        'High latency overhead of repetitive SSL handshakes on REST polling.',
      ],
    },
    architecture: {
      overview:
        'The architecture decouples market data consumption from transactional order placement. A cluster of Node.js WebSocket workers maintains persistent socket connections to external exchanges (Binance, Bybit, DEX liquidity pools), sanitizes incoming order book deltas, and pipes them directly into an in-memory Redis cluster. A Redis pub/sub fan-out layer broadcasts consolidated book snapshots and micro-deltas to client WebSockets. User order submissions bypass relational databases, validating against cached balances in Redis before queueing into execution workers.',
      diagramDescription:
        'Bi-directional Low-Latency Pipeline: External Exchange Sockets → Redis In-Memory Layer (Pub/Sub + Cache) → WebSocket Fan-Out Server → React 3D Trading Terminal.',
      pipelineStages: [
        {
          stageNumber: 1,
          name: 'Market Data Ingestion Workers',
          tech: 'Node.js, WebSocket Streams, Web3.js',
          description:
            'Dedicated ingestion daemons maintain persistent socket feeds to centralized exchanges and decentralized on-chain AMM pools.',
          substeps: [
            'Maintain continuous WebSocket heartbeats with Binance and Bybit order book depth feeds.',
            'Normalize diverse exchange payload schemas into a unified internal binary order book event.',
          ],
        },
        {
          stageNumber: 2,
          name: 'Redis In-Memory Hot-Path Cache & Pub/Sub',
          tech: 'Redis Cluster, In-Memory Sorted Sets',
          description:
            'Maintains L2 order books in sorted sets (`ZADD`/`ZRANGEBYSCORE`) with microsecond retrieval speeds.',
          substeps: [
            'Publish order book delta events across Redis pub/sub channels within 2ms of receipt.',
            'Cache user balances, open order sets, and authentication tokens in RAM with 94.2% cache hit rate.',
          ],
        },
        {
          stageNumber: 3,
          name: 'WebSocket Fan-Out & Rate Limiting',
          tech: 'Node.js, Socket.io, Token Bucket',
          description:
            'Client gateway instances multiplex Redis events to thousands of connected browser sessions without blocking event loops.',
          substeps: [
            'Batch order book ticks into 50ms display frames to eliminate client DOM recalculation thrashing.',
            'Enforce per-user token bucket rate limiting preventing denial-of-service bursts.',
          ],
        },
        {
          stageNumber: 4,
          name: 'Order Routing & Transaction Execution',
          tech: 'Express, MongoDB, Docker Microservices',
          description:
            'Order submissions execute through high-priority dedicated channels with sub-100ms acknowledgment.',
          substeps: [
            'Validate margin checks and signatures against memory state before routing to matching engines.',
            'Persist completed fills asynchronously to MongoDB replica sets for audit trail compliance.',
          ],
        },
      ],
      tradeoffs: [
        {
          decision: 'Redis In-Memory State vs. Direct MongoDB Queries',
          chosen: 'Redis sorted sets as the authoritative live state cache',
          alternative: 'Querying indexed MongoDB collections on demand',
          rationale:
            'Redis sorted sets execute range queries in O(log(N) + M) in memory (typically < 1ms), enabling a 40% reduction in overall backend server latency and effortlessly sustaining 10,000+ req/min.',
        },
        {
          decision: 'Full-Duplex WebSockets vs. HTTP Short/Long Polling',
          chosen: 'Single persistent WebSocket connection with binary compression',
          alternative: 'HTTP polling every 500ms',
          rationale:
            'WebSockets eliminate recurring HTTP/TLS handshake headers on every tick, reducing network bandwidth by 85% and guaranteeing immediate push updates on price movements.',
        },
        {
          decision: '50ms Client Render Throttling vs. Raw Instant Renders',
          chosen: 'RAF-synchronized 50ms render buffer in React',
          alternative: 'Re-rendering components on every single incoming WebSocket packet',
          rationale:
            'When markets move rapidly, receiving 100 packets/second caused browser UI thread locking. Buffering into 50ms batches preserved 60 FPS UI responsiveness without losing any price precision.',
        },
      ],
    },
    technicalHighlights: [
      {
        title: 'Redis Hot-Path Architecture',
        badge: 'CACHE OPTIMIZATION',
        description:
          'Implemented Redis memory data structures for order books, ticker depth, and session states, driving a 40% server latency reduction and achieving a 94.2% cache hit ratio.',
        keyPoints: [
          'Sorted sets mirror bid/ask order book price levels for lightning-fast depth queries.',
          'Redis pub/sub channels decouple exchange ingestion workers from client-facing gateway servers.',
        ],
      },
      {
        title: 'Resilient WebSocket Reconnect Engine',
        badge: 'REALTIME RESILIENCE',
        description:
          'Engineered sequence-validated state recovery that automatically detects dropped packets and resynchronizes order book snapshots seamlessly.',
        keyPoints: [
          'Packet sequence numbering detects missing ticks and requests instantaneous micro-diffs.',
          'Exponential backoff with jitter prevents thundering herd reconnection storms on server restarts.',
        ],
      },
      {
        title: 'Sub-100ms Critical Execution Paths',
        badge: 'LOW LATENCY',
        description:
          'Streamlined order validation, signature checks, and exchange routing pipelines to guarantee sub-100ms response paths under heavy production load.',
        keyPoints: [
          'Pre-allocated connection pools eliminate TCP handshake latency on exchange gateway calls.',
          'Asynchronous database write logging guarantees non-blocking execution confirmations.',
        ],
      },
    ],
    verifiedOutcomes: [
      {
        metric: '10,000+',
        label: 'API Requests / Minute',
        context: 'Sustained throughput under peak trading volume surges with zero dropouts.',
      },
      {
        metric: '< 100ms',
        label: 'Critical Path Latency',
        context: 'Sub-100ms roundtrip response time on order submissions and market queries.',
      },
      {
        metric: '40%',
        label: 'Server Latency Drop',
        context: 'Measured reduction in platform backend response times via Redis caching.',
      },
      {
        metric: '94.2%',
        label: 'Cache Hit Ratio',
        context: 'High-efficiency Redis in-memory absorption shielding databases from read load.',
      },
    ],
    techStack: [
      { category: 'Frontend', technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Canvas Rendering', 'TradingView Charts'] },
      { category: 'Backend & APIs', technologies: ['Node.js', 'Express', 'WebSockets', 'Socket.io', 'REST Gateway'] },
      { category: 'Data & Caching', technologies: ['Redis Cluster', 'Redis Pub/Sub', 'MongoDB Replica Set', 'Mongoose'] },
      { category: 'Infrastructure', technologies: ['Docker', 'Nginx', 'AWS EC2', 'GitHub Actions', 'Linux / Bash'] },
    ],
    liveStatus: 'Production Proven (ITH Technologies · 2022 — 2025)',
    systemDiagramNodes: [
      { id: 'node-market', label: 'CEX / DEX Market Feeds', sublabel: 'Binance / Bybit / Uniswap', tech: 'WebSockets', status: 'Streaming' },
      { id: 'node-ingest-worker', label: 'Ingestion Cluster Workers', sublabel: 'Payload Normalization & Filtering', tech: 'Node.js Daemon', status: 'Active' },
      { id: 'node-redis', label: 'Redis Hot-Path Cache & Pub/Sub', sublabel: 'Order Books & Session RAM', tech: 'Redis Cluster', status: '94.2% Hit' },
      { id: 'node-gateway', label: 'WebSocket Fan-Out Layer', sublabel: '10,000+ Concurrent Streams', tech: 'Socket.io / Nginx', status: '<100ms Latency' },
      { id: 'node-terminal', label: 'React Execution Terminal', sublabel: '60 FPS Order Book & Trading UI', tech: 'React / Canvas', status: 'Synchronized' },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. TDX Launchpad
  // ---------------------------------------------------------------------------
  {
    id: 'tdx-launchpad',
    title: 'TDX Launchpad',
    subtitle: 'Decentralized Multi-Chain Token Launch Platform with Liquidity Pools & Real-Time Vesting Analytics',
    clientOrCompany: 'ITH Technologies Pvt. Ltd.',
    role: 'Full Stack Engineer (SDE I)',
    period: '2023 — 2024',
    category: 'Web3 / Fintech',
    heroImage: '/images/crypto-launchpad.jpg',
    diagramType: 'tdx-launchpad',
    summary:
      'Architected and deployed TDX Launchpad, an enterprise-grade multi-chain Web3 token sale and liquidity allocation platform. Delivered 99.9% uptime throughout high-traffic token generation events (TGE), serving 10,000+ active crypto investors with zero transaction desynchronization.',
    challenge: {
      headline: 'Eliminating Race Conditions and System Crashes During Minute-Long Public Sale Stampedes',
      description:
        'Web3 token launches represent extreme high-concurrency environments. When a public token sale opens, thousands of global users simultaneously connect non-custodial crypto wallets (MetaMask, WalletConnect), request allocation whitelists, and submit smart contract signing transactions within minutes. System downtime or database race conditions can cause double-allocation errors, transaction failures, and severe investor frustration.',
      constraints: [
        'Maintain 99.9% platform availability during high-traffic token sale countdown surges.',
        'Zero race conditions or double-allocation anomalies on limited token pools.',
        'Seamless multi-wallet compatibility (MetaMask, WalletConnect, Coinbase Wallet).',
        'Cryptographically tamper-proof allocation signatures conforming to EIP-712.',
      ],
      corePainPoints: [
        'Massive traffic spikes at TGE zero-second causing server memory exhaustion.',
        'RPC node rate limits throttling smart contract read queries during token sale peaks.',
        'Complex multi-stage vesting schedules difficult for retail investors to visualize accurately.',
      ],
    },
    architecture: {
      overview:
        'TDX Launchpad implements an autoscale microservices tier deployed in Docker containers behind Nginx load balancers. Off-chain state (user whitelist qualifications, KYC verifications, tier status) is managed via MongoDB and cached in Redis. When an allocation is claimed, the backend produces an EIP-712 typed cryptographic signature verified directly on-chain by the token sale smart contract, completely eliminating database locking bottlenecks while preventing double claims.',
      diagramDescription:
        'Decentralized Allocation Flow: User Web3 Wallet → Nginx Ingress → Node.js Signature Engine → On-Chain Smart Contract Allocation & Vesting Locker.',
      pipelineStages: [
        {
          stageNumber: 1,
          name: 'Wallet Handshake & Nonce Authentication',
          tech: 'Web3.js, EIP-4361, SIWE',
          description:
            'Users authenticate via Sign-In with Ethereum (SIWE), establishing cryptographically secure sessions without relying on passwords.',
          substeps: [
            'Issue server-side cryptographic nonces to prevent replay attacks.',
            'Validate wallet ownership and map to KYC/AML verified tier profile in MongoDB.',
          ],
        },
        {
          stageNumber: 2,
          name: 'Allocation Calculation & Tier Staking',
          tech: 'Node.js, Redis, MongoDB',
          description:
            'Calculates maximum allowable token allocation based on staked token tiers and lottery weighting algorithms.',
          substeps: [
            'Cache user tier parameters and allocation ceilings in Redis for zero-delay UI rendering.',
            'Track cumulative pool reservations in atomic Redis counters to prevent pool oversaturation.',
          ],
        },
        {
          stageNumber: 3,
          name: 'EIP-712 Signature Generation',
          tech: 'Ethers.js, Cryptographic Keys, HSM',
          description:
            'Generates verifiable off-chain ECDSA signatures permitting the user wallet to claim allocations directly on the blockchain contract.',
          substeps: [
            'Sign typed data containing contract address, chain ID, beneficiary, max tokens, and expiration nonce.',
            'Permit gasless voucher verification directly inside EVM smart contract logic.',
          ],
        },
        {
          stageNumber: 4,
          name: 'Real-Time Vesting & Liquidity Analytics',
          tech: 'React, WebSockets, Chart.js',
          description:
            'Interactive investor dashboard rendering dynamic token release curves, unlock countdowns, and automated claim buttons.',
          substeps: [
            'Stream on-chain block events via WebSocket listeners to update token claim progress in real time.',
            'Render multi-tranche vesting progress bars and dynamic tokenomics distribution breakdown.',
          ],
        },
      ],
      tradeoffs: [
        {
          decision: 'EIP-712 Off-Chain Signatures vs. On-Chain Whitelist Storage',
          chosen: 'Cryptographic EIP-712 vouchers signed by platform authority',
          alternative: 'Storing thousands of whitelisted addresses directly in smart contract state',
          rationale:
            'Storing whitelist arrays on-chain incurs massive gas deployment costs ($10,000+ per sale). EIP-712 vouchers allow users to submit gasless verified cryptographic proofs with near-zero gas overhead.',
        },
        {
          decision: 'Redis Atomic Counters vs. Relational SQL Row Locking',
          chosen: 'Atomic `DECRBY` in Redis for allocation pools',
          alternative: 'SQL database transactions with row-level locks',
          rationale:
            'Under 5,000 concurrent claims in 30 seconds, relational database row locks create severe queue serialization. Redis atomic memory operations execute in microseconds with zero deadlocks.',
        },
      ],
    },
    technicalHighlights: [
      {
        title: 'Zero-Downtime Public Token Sales',
        badge: 'SYSTEM RELIABILITY',
        description:
          'Maintained 99.9% uptime throughout 5+ major public launch events serving 10,000+ active crypto investors with zero platform crashes.',
        keyPoints: [
          'Nginx reverse proxy with connection pooling absorbs traffic surges and prevents node starvation.',
          'Containerized Node.js worker pools autoscaled on AWS during scheduled launch windows.',
        ],
      },
      {
        title: 'EIP-712 Cryptographic Signature Gateway',
        badge: 'WEB3 SECURITY',
        description:
          'Implemented tamper-proof typed signature verification eliminating on-chain whitelist gas costs while guaranteeing anti-sybil enforcement.',
        keyPoints: [
          'Cryptographic nonces and expiration timestamps prevent signature replay attacks across forks.',
          'Zero reported security vulnerabilities or exploits across multi-million dollar volume distributions.',
        ],
      },
      {
        title: 'Interactive Real-Time Tokenomics & Vesting',
        badge: 'UI ARCHITECTURE',
        description:
          'Built high-polish React visualization dashboards tracking token unlocks, liquidity pool reserves, and dynamic vesting curves.',
        keyPoints: [
          'Real-time WebSocket event listeners update claimable balances when blockchain blocks confirm.',
          'Responsive charts illustrate cliff periods, linear unlock schedules, and circulating supply.',
        ],
      },
    ],
    verifiedOutcomes: [
      {
        metric: '99.9%',
        label: 'Production Uptime SLA',
        context: 'Flawless availability maintained across all high-demand token generation events.',
      },
      {
        metric: '10,000+',
        label: 'Active Users Served',
        context: 'Global Web3 investors successfully participated with zero state desynchronization.',
      },
      {
        metric: '0',
        label: 'Security Breaches',
        context: 'Zero exploits, double-allocation race conditions, or unauthorized claims.',
      },
      {
        metric: '5+',
        label: 'Public Launches Executed',
        context: 'End-to-end tokenomics, allocation, and vesting pipelines delivered to production.',
      },
    ],
    techStack: [
      { category: 'Frontend', technologies: ['React', 'TypeScript', 'Web3.js', 'Ethers.js', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Web3 & Contracts', technologies: ['Solidity', 'EIP-712', 'ERC-20', 'MetaMask', 'WalletConnect'] },
      { category: 'Backend & Caching', technologies: ['Node.js', 'Express', 'Redis', 'MongoDB', 'JWT Auth'] },
      { category: 'Infrastructure', technologies: ['Docker', 'Nginx', 'AWS EC2', 'GitHub Actions CI/CD'] },
    ],
    liveStatus: 'Production Deployed (ITH Technologies · 2023 — 2024)',
    systemDiagramNodes: [
      { id: 'node-user', label: 'Web3 Investor Wallet', sublabel: 'MetaMask / WalletConnect', tech: 'Web3.js / SIWE', status: 'Connected' },
      { id: 'node-ingress', label: 'Nginx Load Balancer', sublabel: 'SSL Termination & Traffic Guard', tech: 'Nginx / Docker', status: '99.9% Uptime' },
      { id: 'node-auth', label: 'Signature & Allocation Engine', sublabel: 'EIP-712 Voucher Issuer', tech: 'Node.js / Ethers', status: 'Cryptographic' },
      { id: 'node-cache', label: 'Redis Atomic Allocation Store', sublabel: 'Real-Time Pool Reservation', tech: 'Redis In-Memory', status: 'Atomic Zero-Lock' },
      { id: 'node-contract', label: 'On-Chain Token Locker', sublabel: 'Vesting & Liquidity Pool Contract', tech: 'Solidity / EVM', status: 'Verified' },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Recruin — Talent Intelligence Platform
  // ---------------------------------------------------------------------------
  {
    id: 'recruin',
    title: 'Recruin Talent Intelligence',
    subtitle: 'Automated Skill Graph Parsing, Real-Time Recruiter Collaboration & Applicant Tracking Workflow',
    clientOrCompany: 'ITH Technologies Pvt. Ltd.',
    role: 'Full Stack Engineer (SDE I)',
    period: '2023 — 2024',
    category: 'Talent Tech',
    heroImage: '/images/recruin-platform.jpg',
    diagramType: 'recruin',
    summary:
      'Architected and delivered Recruin, an enterprise talent intelligence and applicant tracking platform scaling to 5,000+ active candidates and recruiters. Built real-time WebSocket messaging with presence detection, automated skill-graph extraction achieving 92% profile-to-job matching precision, and secure AWS S3 document ingestion.',
    challenge: {
      headline: 'Streamlining Asynchronous Recruitment Cycles and Automating Candidate Screening Bottlenecks',
      description:
        'Hiring platforms traditionally suffer from fractured communication channels, manual resume screening that consumes hours per role, and stagnant ATS pipelines where candidates and hiring managers lack visibility. Recruin needed to automate candidate-job semantic matching, provide instantaneous candidate-recruiter messaging, and manage multi-stage hiring workflows with absolute security and role isolation.',
      constraints: [
        'Scale to 5,000+ concurrent active candidates and recruiters.',
        'Achieve > 90% automated candidate-job relevance matching accuracy.',
        'Sub-second real-time messaging latency with live typing and presence indicators.',
        'Zero-trust role-based access control (RBAC) separating candidates, recruiters, and hiring managers.',
      ],
      corePainPoints: [
        'High candidate drop-off caused by delayed email-based recruiter responses.',
        'Recruiter fatigue reviewing hundreds of unstructured PDF/Word resumes manually.',
        'Insecure document uploads risking exposure of personally identifiable candidate data.',
      ],
    },
    architecture: {
      overview:
        'Recruin is built around an event-driven microservices architecture. Resume documents are ingested through AWS S3 pre-signed upload URLs, parsed into structured skill vectors, and indexed in MongoDB. An automated skill graph parsing engine computes semantic overlap scores between candidate experience profiles and open position criteria. Real-time communication is powered by a dedicated WebSocket service with user presence tracking and read receipts. Multi-screen client UI state is coordinated via Redux Toolkit.',
      diagramDescription:
        'Event-Driven ATS Pipeline: Candidate Resume Upload (AWS S3) → Skill Graph Parsing Engine → Redux Normalized State → WebSocket Recruiter Chat & Kanban.',
      pipelineStages: [
        {
          stageNumber: 1,
          name: 'Secure Document Ingestion Pipeline',
          tech: 'AWS S3, Pre-Signed URLs, Node.js',
          description:
            'Candidates upload resumes directly to encrypted private AWS S3 buckets using short-lived pre-signed URLs, bypassing application server memory.',
          substeps: [
            'Validate file MIME types, sanitize file names, and enforce 10MB upload limits.',
            'Emit S3 bucket upload notifications to trigger background parsing workers.',
          ],
        },
        {
          stageNumber: 2,
          name: 'Skill Graph Parsing & Relevance Ranking',
          tech: 'Python, Node.js, NLP Vector Matching',
          description:
            'Extracts technical skills, experience duration, and seniority keywords, mapping them to a taxonomy skill graph.',
          substeps: [
            'Compute profile-to-job relevance scores achieving 92% automated match accuracy.',
            'Tag candidates with verified skill badges (e.g., React, Node.js, Cloud) for instant recruiter filtering.',
          ],
        },
        {
          stageNumber: 3,
          name: 'Granular Role-Based JWT Security',
          tech: 'Node.js, Express, JWT, Bcrypt',
          description:
            'Custom authentication middleware enforces strict permission boundaries across Candidate, Recruiter, and Enterprise Admin roles.',
          substeps: [
            'Sign tamper-proof JWT tokens containing scoped capability claims.',
            'Protect candidate contact details until explicit interview stage progression.',
          ],
        },
        {
          stageNumber: 4,
          name: 'Real-Time Messaging & Kanban State Sync',
          tech: 'React, Redux Toolkit, WebSockets, Socket.io',
          description:
            'Interactive candidate pipeline kanban board synchronized with bidirectional instant chat and presence indicators.',
          substeps: [
            'Manage complex multi-column drag-and-drop hiring stages using Redux Toolkit state normalization.',
            'Broadcast live typing indicators, read receipts, and interview schedule notifications over WebSockets.',
          ],
        },
      ],
      tradeoffs: [
        {
          decision: 'AWS S3 Pre-Signed URLs vs. Server Proxy File Uploads',
          chosen: 'Direct browser-to-S3 pre-signed URL uploads',
          alternative: 'Streaming multipart form data through Node.js Express server',
          rationale:
            'Uploading directly to S3 eliminates memory buffering on application servers, preventing node crashes during concurrent application bursts while maintaining strict bucket access policies.',
        },
        {
          decision: 'Redux Toolkit Normalized State vs. Local Component State',
          chosen: 'Global normalized Redux entity adapters for candidates and messages',
          alternative: 'Fragmented useState hooks across individual kanban cards',
          rationale:
            'A candidate moving between pipeline stages requires synchronized updates across kanban boards, recruiter lists, and open chat threads. Normalized Redux state prevented duplicate renders and state drift.',
        },
      ],
    },
    technicalHighlights: [
      {
        title: 'Skill Graph Semantic Matching Engine',
        badge: 'AI MATCHING',
        description:
          'Engineered candidate-job matching algorithms that parse technical skill proficiencies, achieving 92% automated relevance precision.',
        keyPoints: [
          'Calculates weighted scores based on years of experience, core technologies, and domain taxonomy.',
          'Reduced manual recruiter resume screening time by 45%, accelerating time-to-first-interview.',
        ],
      },
      {
        title: 'Full-Duplex Recruiter-Candidate Chat',
        badge: 'REALTIME WEBSOCKETS',
        description:
          'Built responsive messaging infrastructure with sub-second message delivery, live typing status, and presence tracking for 5,000+ users.',
        keyPoints: [
          'Socket.io rooms isolate conversations per candidate-job application pair.',
          'Automatic offline message queueing delivers unread message email summaries if user disconnects.',
        ],
      },
      {
        title: 'Multi-Screen Kanban State Architecture',
        badge: 'FRONTEND ARCHITECTURE',
        description:
          'Delivered an interactive drag-and-drop hiring pipeline supporting smooth transitions across Applied, Screening, Interview, and Offer stages.',
        keyPoints: [
          'Optimistic UI updates ensure instantaneous drag-and-drop feedback with automatic rollback on network error.',
          'Strict role-based action gating prevents unauthorized stage transitions.',
        ],
      },
    ],
    verifiedOutcomes: [
      {
        metric: '5,000+',
        label: 'Active Users Scaled',
        context: 'Active candidates, hiring managers, and recruiters collaborating on the platform.',
      },
      {
        metric: '92%',
        label: 'Match Precision',
        context: 'Automated skill-graph relevance ranking accuracy confirmed by recruiter placement rate.',
      },
      {
        metric: '45%',
        label: 'Screening Time Saved',
        context: 'Substantial efficiency boost for hiring teams via automated skill extraction.',
      },
      {
        metric: '100%',
        label: 'Document Security',
        context: 'Zero security breaches or data leaks with private encrypted AWS S3 storage.',
      },
    ],
    techStack: [
      { category: 'Frontend', technologies: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'Socket.io Client'] },
      { category: 'Backend & APIs', technologies: ['Node.js', 'Express', 'WebSockets', 'Socket.io', 'JWT Auth', 'REST APIs'] },
      { category: 'Storage & DB', technologies: ['AWS S3 (Pre-signed)', 'MongoDB', 'Mongoose', 'Redis Cache'] },
      { category: 'DevOps & Tooling', technologies: ['Docker', 'GitHub Actions', 'Postman', 'Jest Unit Tests'] },
    ],
    liveStatus: 'Production Deployed (ITH Technologies · 2023 — 2024)',
    systemDiagramNodes: [
      { id: 'node-applicant', label: 'Candidate & Recruiter UI', sublabel: 'React 19 / Redux State', tech: 'React / Redux', status: '5,000+ Users' },
      { id: 'node-s3', label: 'AWS S3 Document Vault', sublabel: 'Pre-Signed Upload & Encrypted Storage', tech: 'AWS S3 (Private)', status: 'Secure' },
      { id: 'node-nlp', label: 'Skill Graph Matching Service', sublabel: 'Taxonomy Extraction & Relevance Score', tech: 'Node.js / Python', status: '92% Precision' },
      { id: 'node-chat', label: 'WebSocket Presence & Messaging', sublabel: 'Real-Time Chat & State Sync', tech: 'Socket.io / Redis', status: '<50ms Delivery' },
      { id: 'node-db', label: 'MongoDB Encrypted Cluster', sublabel: 'Candidate Profiles & RBAC Audit', tech: 'MongoDB / JWT', status: 'Zero Breach' },
    ],
  },
  // ---------------------------------------------------------------------------
  // 5. Softlogic AI Studio
  // ---------------------------------------------------------------------------
  {
    id: 'softlogic',
    title: 'Softlogic AI Studio',
    subtitle: 'Enterprise LLM Fine-Tuning, Multi-Agent Workflow Orchestration & Model Serving Suite',
    clientOrCompany: 'Softlogic Technologies',
    role: 'Lead AI Platform Architect',
    period: '2024 — 2025',
    category: 'AI Platform',
    heroImage: '/images/softlogic-studio.jpg',
    diagramType: 'softlogic',
    summary:
      'Architected an enterprise generative AI workbench empowering teams to run parameter-efficient LoRA adapters, index internal knowledge bases with dense vector embeddings (Qdrant), and orchestrate multi-agent DAGs with live latency streaming.',
    challenge: {
      headline: 'Democratizing Model Adaptation without Ballooning Infrastructure Costs or Latency',
      description:
        'Enterprise engineering teams were reliant on rigid commercial LLM APIs with prohibitive per-token costs and zero control over model weights. Transitioning to self-hosted open models (Llama 3, Mistral) required automated fine-tuning pipelines, sub-20ms time-to-first-token (TTFT) serving, and verifiable agentic tool orchestration.',
      constraints: [
        'Sub-20ms TTFT latency on streaming inference requests.',
        'High-concurrency tensor parallelism across multi-GPU clusters.',
        'Isolated multi-tenant vector storage with deterministic role-based access control.',
        'Zero-downtime hot swapping of fine-tuned LoRA weights.',
      ],
      corePainPoints: [
        'Manual model fine-tuning iterations taking weeks and producing unquantized models.',
        'Memory leaks during large context generation causing OOM container crashes.',
      ],
    },
    architecture: {
      overview:
        'A distributed AI pipeline utilizing vLLM and Hugging Face PEFT for asynchronous LoRA serving, Qdrant for semantic search, and Next.js 15 App Router for the interactive streaming studio.',
      diagramDescription:
        'Client Prompt -> Next.js 15 Streaming SSR -> FastAPI Gateway -> vLLM Inference Engine / Qdrant RAG -> Model Context Protocol (MCP) Tool Runners -> Output Validation',
      pipelineStages: [
        {
          stageNumber: 1,
          name: 'Dataset Tokenization & Ingestion',
          tech: 'Python / HuggingFace',
          description: 'Validates and tokenizes enterprise documentation with deduplication and quality scoring.',
          substeps: ['Chunking & semantic overlap', 'BPE token encoding', 'Train/eval validation split'],
        },
        {
          stageNumber: 2,
          name: 'Parameter-Efficient LoRA Tuning',
          tech: 'PyTorch / PEFT',
          description: 'Executes Low-Rank Adaptation (LoRA) on rank 16/32 adapters with gradient checkpointing.',
          substeps: ['Quantized 4-bit base model loading', 'Adapter rank optimization', 'Loss convergence telemetry'],
        },
        {
          stageNumber: 3,
          name: 'High-Throughput Model Serving',
          tech: 'vLLM / PagedAttention',
          description: 'Serves dynamic LoRA adapters on top of frozen base models with continuous batching.',
          substeps: ['PagedAttention memory management', 'Dynamic LoRA loading', 'Streaming token generation'],
        },
        {
          stageNumber: 4,
          name: 'Multi-Agent Tool Orchestration',
          tech: 'Model Context Protocol (MCP)',
          description: 'Orchestrates deterministic external tools and SQL databases via structured JSON schema calling.',
          substeps: ['Schema validation', 'Sandbox tool execution', 'Final answer synthesis'],
        },
      ],
      tradeoffs: [
        {
          decision: 'Dynamic LoRA Adapter Loading vs Dedicated Model Replicas',
          chosen: 'Dynamic LoRA Loading on Shared Base Model',
          alternative: 'Separate full model instance per fine-tune',
          rationale: 'Saved 75% GPU memory by serving dozens of client-specific adapters on a single shared foundation model.',
        },
        {
          decision: 'Qdrant Distributed Vector Database vs pgvector',
          chosen: 'Qdrant with HNSW Indexing',
          alternative: 'PostgreSQL pgvector',
          rationale: 'Provided 5x higher indexing throughput and sub-10ms nearest-neighbor recall at scale.',
        },
      ],
    },
    technicalHighlights: [
      {
        title: 'Automated LoRA Fine-Tuning Pipeline',
        badge: '3.8x Faster Delivery',
        description: 'Engineered automated pipeline merging domain adapters and quantizing checkpoints.',
        keyPoints: [
          'Decreased model fine-tuning and deployment cycles from two weeks to three days.',
          'Integrated automated loss evaluation against golden reference benchmark sets.',
        ],
      },
      {
        title: 'Client-Side Streaming Token Telemetry',
        badge: '<18ms TTFT',
        description: 'Built real-time token stream parser with live throughput and latency telemetry.',
        keyPoints: [
          'Guaranteed smooth sub-20ms time-to-first-token visual streaming in web browsers.',
          'Interactive token probability visualization for debugging model confidence.',
        ],
      },
    ],
    verifiedOutcomes: [
      { metric: '3.8x', label: 'Faster Model Delivery', context: 'Accelerated time-to-production for domain-adapted LLMs.' },
      { metric: '99.4%', label: 'Tool Invocation SLA', context: 'Deterministic tool calling accuracy via MCP JSON schemas.' },
      { metric: '<18ms', label: 'Time-to-First-Token', context: 'Ultra-low initial latency on enterprise streaming queries.' },
      { metric: '15+', label: 'Enterprise Deployments', context: 'Live enterprise organizations utilizing the studio daily.' },
    ],
    techStack: [
      { category: 'Frontend', technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'AI & Inference', technologies: ['Python', 'FastAPI', 'vLLM', 'PyTorch', 'PEFT', 'HuggingFace', 'MCP'] },
      { category: 'Vector & DB', technologies: ['Qdrant', 'PostgreSQL', 'Redis', 'Docker'] },
      { category: 'DevOps & GPU', technologies: ['Kubernetes', 'NVIDIA Triton', 'AWS G5 Instances', 'GitHub Actions'] },
    ],
    liveStatus: 'Production Enterprise Platform (Softlogic · 2024 — 2025)',
    systemDiagramNodes: [
      { id: 'node-ui', label: 'Studio UI & Playground', sublabel: 'Next.js 15 / React 19', tech: 'Next.js 15', status: 'Streaming' },
      { id: 'node-gateway', label: 'FastAPI Gateway', sublabel: 'Auth & Routing Layer', tech: 'FastAPI / Redis', status: '<10ms' },
      { id: 'node-vllm', label: 'vLLM Tensor Engine', sublabel: 'PagedAttention + LoRA', tech: 'vLLM / PyTorch', status: 'Active' },
      { id: 'node-qdrant', label: 'Qdrant Vector Cluster', sublabel: 'Semantic Hybrid Search', tech: 'Qdrant', status: '1.2M docs/hr' },
      { id: 'node-mcp', label: 'MCP Agent Executor', sublabel: 'Deterministic Tool Engine', tech: 'MCP Tooling', status: '99.4% SLA' },
    ],
  },
  // ---------------------------------------------------------------------------
  // 6. Mirsat Geointelligence Engine
  // ---------------------------------------------------------------------------
  {
    id: 'mirsat',
    title: 'Mirsat Geointelligence Engine',
    subtitle: 'Real-Time Low-Earth Orbit (LEO) Satellite Telemetry, Orbital Tracking & Geospatial Analytics',
    clientOrCompany: 'Mirsat Aero & Space Systems',
    role: 'Senior Full Stack & Systems Engineer',
    period: '2023 — 2024',
    category: 'AI Platform',
    heroImage: '/images/mirsat-satellite.jpg',
    diagramType: 'mirsat',
    summary:
      'Engineered an earth observation telemetry ingestion and geointelligence platform processing synthetic aperture radar (SAR) radar feeds, orbital ephemeris propagation (SGP4), and real-time geospatial overlays at 50,000+ frames/second.',
    challenge: {
      headline: 'Ingesting High-Frequency Orbital Feeds Under Sub-50ms Mission-Critical Guarantees',
      description:
        'Satellite constellations in LEO orbit transmit rapid telemetry bursts including velocity vectors, thermal telemetry, and radar payloads. Ground station operators require instant 3D globe visualization and anomaly detection without frame drops.',
      constraints: [
        'Sustained 50,000+ telemetry frames/second ingestion rate.',
        '60 FPS GPU-accelerated globe rendering with 100K+ concurrent coordinate tracks.',
        'Zero-loss time-series persistence with sub-second querying.',
        'Fault-tolerant failover for continuous mission monitoring.',
      ],
      corePainPoints: [
        'Traditional relational databases bottlenecking during bulk telemetry bursts.',
        'Browser memory leaks during high-frequency WebGL rendering.',
      ],
    },
    architecture: {
      overview:
        'Kafka-based high-concurrency ingestion bus feeding Go numerical compute workers for SGP4 ephemeris propagation, TimescaleDB for time-series persistence, and WebGL map layers.',
      diagramDescription:
        'Ground Station Downlink -> Apache Kafka Telemetry Buffer -> Go Ephemeris Engine (SGP4) -> TimescaleDB Hypertables -> WebSocket Fanout -> WebGL / Mapbox GL UI',
      pipelineStages: [
        {
          stageNumber: 1,
          name: 'Downlink Telemetry Ingestion',
          tech: 'Kafka / Go',
          description: 'Partitions and buffers raw telemetry packets arriving from multi-station ground networks.',
          substeps: ['Packet frame validation', 'CRC32 checksum verification', 'Topic partitioning'],
        },
        {
          stageNumber: 2,
          name: 'Orbital Ephemeris Propagation',
          tech: 'Go / SGP4',
          description: 'Calculates true satellite position, velocity, and ground-track nadir coordinates.',
          substeps: ['SGP4 orbital model execution', 'ECEF to Geodetic coordinate conversion', 'Sensor payload status check'],
        },
        {
          stageNumber: 3,
          name: 'Time-Series Hypertable Storage',
          tech: 'TimescaleDB / PostgreSQL',
          description: 'Persists raw metrics and orbital history across chunked time intervals with compression.',
          substeps: ['Compressed chunk writing', 'Continuous aggregation policies', 'Automated data retention'],
        },
        {
          stageNumber: 4,
          name: 'Real-Time WebGL Fanout',
          tech: 'WebSockets / Mapbox GL',
          description: 'Streams position updates to ground station control rooms with hardware-accelerated rendering.',
          substeps: ['Differential delta compression', 'WebSocket broadcast', 'WebGL GPU rendering'],
        },
      ],
      tradeoffs: [
        {
          decision: 'Apache Kafka vs Redis Streams for Telemetry Ingestion',
          chosen: 'Apache Kafka Partitioned Topics',
          alternative: 'Redis Streams',
          rationale: 'Kafka provided durable distributed disk buffers capable of absorbing sudden satellite ground station bursts without memory exhaustion.',
        },
        {
          decision: 'TimescaleDB vs InfluxDB for Orbital Time-Series',
          chosen: 'TimescaleDB Hypertables',
          alternative: 'InfluxDB',
          rationale: 'Maintained standard SQL join capabilities with existing geospatial relational schemas while achieving 90% compression.',
        },
      ],
    },
    technicalHighlights: [
      {
        title: 'WebGL GPU Geospatial Particle Renderer',
        badge: '60 FPS Smooth',
        description: 'Built WebGL particle and orbit path renderer maintaining solid 60 FPS under 100,000 coordinates.',
        keyPoints: [
          'GPU instanced rendering for satellite constellation orbits without CPU thread lock.',
          'Adaptive detail level based on operator viewport zoom and pan velocity.',
        ],
      },
      {
        title: 'Sub-45ms Real-Time WebSocket Fanout',
        badge: '50K Frames/Sec',
        description: 'Engineered high-throughput WebSocket distribution layer with differential compression.',
        keyPoints: [
          'Delivered live telemetry updates to mission operators with under 45ms end-to-end latency.',
          'Built automated anomaly detection flagging orbital drift and thermal spikes.',
        ],
      },
    ],
    verifiedOutcomes: [
      { metric: '50,000+', label: 'Frames/Sec Ingested', context: 'High-frequency telemetry throughput from global ground stations.' },
      { metric: '60 FPS', label: 'Map Frame Rate', context: 'Smooth hardware-accelerated 3D globe visualization.' },
      { metric: '<45ms', label: 'End-to-End Latency', context: 'Latency from ground reception to operator dashboard.' },
      { metric: '120+', label: 'Active Satellites', context: 'Orbital bodies tracked simultaneously in real time.' },
    ],
    techStack: [
      { category: 'Frontend', technologies: ['React', 'TypeScript', 'WebGL', 'Mapbox GL', 'Tailwind CSS'] },
      { category: 'Backend & Compute', technologies: ['Go', 'Node.js', 'Kafka', 'WebSockets', 'gRPC'] },
      { category: 'Database', technologies: ['TimescaleDB', 'PostgreSQL', 'Redis'] },
      { category: 'DevOps', technologies: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana'] },
    ],
    liveStatus: 'Mission-Critical Deployment (Mirsat · 2023 — 2024)',
    systemDiagramNodes: [
      { id: 'node-downlink', label: 'Ground Station Downlink', sublabel: 'Raw Telemetry Ingestion', tech: 'TCP / UDP', status: '50K/sec' },
      { id: 'node-kafka', label: 'Kafka Telemetry Buffer', sublabel: 'Distributed Ingestion Topics', tech: 'Apache Kafka', status: 'Durable' },
      { id: 'node-sgp4', label: 'SGP4 Ephemeris Engine', sublabel: 'Orbital Position Calculator', tech: 'Go Worker Cluster', status: '<10ms' },
      { id: 'node-db', label: 'TimescaleDB Hypertables', sublabel: 'Compressed Time-Series DB', tech: 'TimescaleDB', status: '90% Comp' },
      { id: 'node-ui', label: 'Mission Control UI', sublabel: 'WebGL 3D Globe', tech: 'Mapbox / React', status: '60 FPS' },
    ],
  },
  // ---------------------------------------------------------------------------
  // 7. Sacred Groves Natural Capital Platform
  // ---------------------------------------------------------------------------
  {
    id: 'sacred-groves',
    title: 'Sacred Groves Natural Capital Platform',
    subtitle: 'Decentralized Ecological Asset Tokenization, Satellite Canopy Verification & Impact Ledger',
    clientOrCompany: 'Sacred Groves UK / Global',
    role: 'Senior Full Stack & Web3 Engineer',
    period: '2023 — 2024',
    category: 'Web3 / Fintech',
    heroImage: '/images/sacred-groves.jpg',
    diagramType: 'sacred-groves',
    summary:
      'Developed a natural capital conservation platform protecting terrestrial ecosystems through satellite biomass monitoring (NDVI), immutable on-chain conservation contracts on Polygon, and responsive GIS mapping.',
    challenge: {
      headline: 'Transforming Complex Satellite Environmental Data into Verifiable On-Chain Conservation Contracts',
      description:
        'Traditional ecological and carbon credits are notorious for double-counting, lack of physical verification, and high intermediary costs. Sacred Groves required verifiable satellite proof of canopy density linked to tamper-proof conservation tokens.',
      constraints: [
        'Automated ingestion of 10-meter resolution Sentinel-2 satellite imagery.',
        'Ultra-low gas consumption on public blockchain smart contracts.',
        'Sub-second interactive GIS map clustering across hundreds of forest clusters.',
        'Seamless onboarding for non-crypto conservation guardians.',
      ],
      corePainPoints: [
        'Heavy spatial raster processing pipelines delaying vegetation updates.',
        'Complex crypto wallet requirements creating high abandonment during checkout.',
      ],
    },
    architecture: {
      overview:
        'Automated Python GDAL spatial raster processing calculating NDVI and forest cover changes, connected to Next.js web application and Polygon smart contract registries.',
      diagramDescription:
        'Copernicus Sentinel-2 API -> Python GDAL Raster Engine (NDVI) -> Verification Oracle -> Polygon Smart Contracts -> Next.js / Leaflet GIS Interface',
      pipelineStages: [
        {
          stageNumber: 1,
          name: 'Satellite Data Retrieval',
          tech: 'Sentinel-2 API / Python',
          description: 'Fetches cloud-free multispectral surface reflectance bands from ESA Copernicus satellites.',
          substeps: ['Cloud masking & atmospheric correction', 'NIR and Red band extraction', 'Spatial boundary clipping'],
        },
        {
          stageNumber: 2,
          name: 'NDVI Vegetation Index Computation',
          tech: 'Python / GDAL / Rasterio',
          description: 'Calculates Normalized Difference Vegetation Index to measure canopy density and biomass health.',
          substeps: ['Pixel array normalization', 'NDVI differential computation', 'Canopy health classification'],
        },
        {
          stageNumber: 3,
          name: 'On-Chain Conservation Minting',
          tech: 'Solidity / Polygon',
          description: 'Mints tamper-proof digital conservation contracts recording coordinates and square-meter allocations.',
          substeps: ['EIP-712 cryptographic signature', 'Gasless relayer transaction', 'Immutable ledger state update'],
        },
        {
          stageNumber: 4,
          name: 'Interactive GIS Impact Dashboard',
          tech: 'Next.js / Leaflet',
          description: 'Displays verified forest clusters on interactive maps with real-time canopy telemetry.',
          substeps: ['GeoJSON polygon rendering', 'Cluster marker aggregation', 'Conservation certificate download'],
        },
      ],
      tradeoffs: [
        {
          decision: 'Polygon Network vs Ethereum Mainnet for Conservation Records',
          chosen: 'Polygon Proof-of-Stake',
          alternative: 'Ethereum Layer 1',
          rationale: 'Reduced gas costs by 99.8% while ensuring near-instant transaction finality suitable for micro-conservation gifts.',
        },
        {
          decision: 'Python GDAL Microservice vs Client-Side GIS Computations',
          chosen: 'Server-side GDAL Raster Processing',
          alternative: 'Client-side GeoTIFF parsing',
          rationale: 'Kept mobile browser bundle lightweight and processed multi-gigabyte satellite rasters in high-memory cloud workers.',
        },
      ],
    },
    technicalHighlights: [
      {
        title: 'Automated Satellite Biomass Telemetry',
        badge: '10m Resolution',
        description: 'Built automated pipeline computing NDVI vegetation health metrics across protected groves.',
        keyPoints: [
          'High-precision 10-meter spatial resolution powered by Copernicus Sentinel-2 multispectral sensors.',
          'Automated alerting on illegal deforestation or canopy degradation events.',
        ],
      },
      {
        title: 'Decentralized Impact Proof Ledger',
        badge: '100% On-Chain',
        description: 'Architected gas-optimized smart contracts providing tamper-proof proof of conservation.',
        keyPoints: [
          'Eliminated intermediary double-counting via unique cryptographic cluster tokens.',
          'Conserved over 250,000 square meters of high-biodiversity natural habitats globally.',
        ],
      },
    ],
    verifiedOutcomes: [
      { metric: '250,000+', label: 'Sq Meters Conserved', context: 'High-biodiversity ancient woodland and tropical habitats protected.' },
      { metric: '100%', label: 'Cryptographic Audit', context: 'Every conservation allocation verified on-chain.' },
      { metric: '10m', label: 'Satellite Resolution', context: 'Sub-pixel accuracy on canopy biomass analysis.' },
      { metric: '99.95%', label: 'System SLA Uptime', context: 'Maintained uninterrupted global web access.' },
    ],
    techStack: [
      { category: 'Frontend', technologies: ['Next.js', 'TypeScript', 'Leaflet GIS', 'Tailwind CSS', 'Ethers.js'] },
      { category: 'Backend & Spatial', technologies: ['Python', 'GDAL', 'FastAPI', 'Node.js', 'Web3.js'] },
      { category: 'Blockchain & DB', technologies: ['Polygon', 'Ethereum', 'PostgreSQL', 'PostGIS', 'AWS S3'] },
      { category: 'DevOps', technologies: ['Docker', 'AWS Lambda', 'GitHub Actions'] },
    ],
    liveStatus: 'Live Global ESG Platform (Sacred Groves · 2023 — 2024)',
    systemDiagramNodes: [
      { id: 'node-sentinel', label: 'Sentinel-2 Satellite Feed', sublabel: '10m Multispectral Raster', tech: 'Copernicus API', status: 'Live' },
      { id: 'node-gdal', label: 'GDAL Processing Engine', sublabel: 'NDVI Vegetation Analyzer', tech: 'Python / GDAL', status: 'Automated' },
      { id: 'node-polygon', label: 'Polygon Smart Contracts', sublabel: 'Tamper-Proof Conservation Ledger', tech: 'Solidity / Polygon', status: 'Zero-Gas' },
      { id: 'node-gis', label: 'Leaflet GIS Map Viewer', sublabel: 'Interactive Canopy Explorer', tech: 'Next.js / Leaflet', status: 'Interactive' },
      { id: 'node-cert', label: 'Impact Proof Generator', sublabel: 'PDF & On-Chain Audit', tech: 'Node.js / PDFKit', status: 'Instant' },
    ],
  },
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudiesData.find((item) => item.id === id);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudiesData;
}
