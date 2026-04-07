import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CustodyBuddy.com - Your Ally in Co-Parenting with a Toxic Ex',
  description:
    'An AI-powered legal toolkit for self-represented parents dealing with toxic co-parenting. Transform stress into strategy, and manipulation into court evidence.',
  keywords: [
    'toxic ex co-parenting',
    'self-represented parent legal help',
    'custody documentation tools',
    'parental rights Canada',
    'fathers rights Ontario',
  ],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'CustodyBuddy.com - Your Ally in Co-Parenting',
    description: 'AI-Powered Legal Toolkit for Self-Represented Parents.',
    images: ['https://placehold.co/1200x630/020716/F6BA21?text=CUSTODYBUDDY.COM'],
    url: '#',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
