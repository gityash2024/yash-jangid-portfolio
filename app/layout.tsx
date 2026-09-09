import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';

export const viewport: Viewport = {
  themeColor: '#070b12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Yash Jangid | Senior Full Stack Engineer & AI Platform Architect',
  description:
    'Senior Full Stack Engineer with nearly 5 years of production experience across Healthcare AI, Web3/Trading, Job-Tech, and Agentic Systems.',
  keywords: [
    'Yash Jangid',
    'Senior Full Stack Engineer',
    'AI Platform Developer',
    'Agentic Workflows',
    'DICOM AI',
    'NIfTI Medical Imaging',
    'Web3 Trading Systems',
    'Softlogic AI Studio',
    'Mirsat Satellite Engine',
    'Sacred Groves Natural Capital',
    'Model Context Protocol MCP',
    'Redis Hot-Path Caching',
    'Next.js 15',
    'React 19',
    'High-Throughput Systems',
  ],
  authors: [{ name: 'Yash Jangid' }],
  metadataBase: new URL('https://yashjangid.com'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Yash Jangid | Senior Full Stack Engineer & AI Platform Architect',
    description:
      'High-performance production portfolio of Yash Jangid. Architecting Healthcare AI platforms, Web3 trading engines, and LLM agentic systems.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Yash Jangid Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yash Jangid | Senior Full Stack Engineer & AI Platform Architect',
    description:
      'High-performance production portfolio of Yash Jangid. Architecting Healthcare AI platforms, Web3 trading engines, and LLM agentic systems.',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://yashjangid.com/#person',
      name: 'Yash Jangid',
      jobTitle: 'Senior Full Stack Engineer & AI Platform Architect',
      url: 'https://yashjangid.com',
      email: 'gityash2024@gmail.com',
      sameAs: [
        'https://github.com/gityash2024',
        'https://in.linkedin.com/in/yashjangid091099',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'University of Petroleum and Energy Studies (UPES)',
      },
      knowsAbout: [
        'Healthcare AI & Medical Imaging (DICOM/NIfTI)',
        'High-Throughput Web3 & Algorithmic Trading Engines',
        'Distributed Microservices & Redis Caching',
        'Model Context Protocol (MCP) Multi-Agent Systems',
        'Next.js 15 & React 19 Concurrent Architectures',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://yashjangid.com/#website',
      url: 'https://yashjangid.com',
      name: 'Yash Jangid Portfolio',
      publisher: { '@id': 'https://yashjangid.com/#person' },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className="font-sans bg-cyber-dark text-foreground min-h-screen selection:bg-cyber-accent/30 selection:text-white overflow-x-hidden transition-colors duration-300"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
