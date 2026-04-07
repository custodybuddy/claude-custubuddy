import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CustodyBuddy — Incident Report Generator',
  description: 'AI-powered court-ready incident reports for self-represented parents.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
