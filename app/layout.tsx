import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CHARAN — The Art of Time | Swiss Haute Horlogerie & 3D Customizer',
  description:
    'Engineered for Eternity. Discover high-frequency Swiss mechanical timepieces and configure your bespoke luxury watch in our real-time interactive 3D studio.',
  keywords: [
    'luxury watch',
    'Swiss watches',
    'CHARAN',
    '3D watch customizer',
    'tourbillon',
    'chronograph',
    'Haute Horlogerie',
    'automatic watch',
  ],
  openGraph: {
    title: 'CHARAN — The Art of Time | Swiss Haute Horlogerie',
    description: 'Precision engineering. Timeless design. Made to be remembered.',
    url: 'https://chrono-timepieces.ch',
    siteName: 'CHARAN Haute Horlogerie',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} dark`}>
      <body className="bg-chrono-950 text-chrono-ivory antialiased selection:bg-chrono-gold/30 selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
