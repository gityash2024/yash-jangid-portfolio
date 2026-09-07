import type { Metadata, Viewport } from 'next';
import './globals.css';

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
    'Web3 Trading Systems',
    'Next.js 15',
    'React 19',
  ],
  authors: [{ name: 'Yash Jangid' }],
  metadataBase: new URL('https://yashjangid.com'),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans bg-cyber-dark text-foreground min-h-screen selection:bg-cyber-accent/30 selection:text-white overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
