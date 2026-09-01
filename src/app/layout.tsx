import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ExperienceProvider } from '@/context/ExperienceContext';

// Nike Bold Condensed Headline Font (Matching nike.in Futura Extra Bold Display)
const nikeFutura = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-nike-futura',
  display: 'swap',
});

// Nike Clean Sans Body Font (Matching nike.in Helvetica Neue / Inter)
const nikeBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nike-body',
  display: 'swap',
});

// Nike Tech Telemetry Monospace Font
const nikeMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-nike-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nike. Just Do It. Nike IN — Innovation 2025/2026',
  description:
    'Nike delivers innovative products, experiences and services to inspire athletes. Explore the 3D interactive showcase: Air Max Dn, Pegasus 41, Alphafly 3, Mercurial Superfly, and LeBron XXI.',
  keywords: [
    'Nike India',
    'Nike Innovation',
    'Nike Air Max Dn',
    'Nike Pegasus 41',
    'Nike Alphafly 3',
    'Nike Mercurial Superfly',
    'Nike LeBron XXI',
    'Nike shoes online',
  ],
  authors: [{ name: 'Nike, Inc.' }],
  openGraph: {
    title: 'Nike. Just Do It. Nike IN — Innovation 2025/2026',
    description:
      'Immersive 3D WebGL showcase of groundbreaking Nike sports science, pressurized Air units, and carbon Flyplates.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Nike.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nike. Just Do It. Nike IN',
    description: 'Immersive 3D showcase of Nike footwear innovation.',
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f5f2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nikeFutura.variable} ${nikeBody.variable} ${nikeMono.variable}`}
    >
      <body className="bg-[#f6f5f2] text-[#111111] font-sans antialiased overflow-hidden selection:bg-[#111111] selection:text-white">
        <ExperienceProvider>
          {children}
        </ExperienceProvider>
      </body>
    </html>
  );
}
