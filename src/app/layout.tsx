import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ExperienceProvider } from '@/context/ExperienceContext';

// Nova Bold Condensed Headline Font (Matching nova.in Futura Extra Bold Display)
const nikeFutura = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-nike-futura',
  display: 'swap',
});

// Nova Clean Sans Body Font (Matching nova.in Helvetica Neue / Inter)
const nikeBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nike-body',
  display: 'swap',
});

// Nova Tech Telemetry Monospace Font
const nikeMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-nike-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOVA — Innovation 2025/2026 | Next-Gen Kinetic Footwear',
  description:
    'NOVA delivers breakthrough kinetic engineering, pressurized fluid systems, and precision sports footwear. Explore the live 3D showcase: NOVA DN, Pegasus 41, Alphafly 3, Mercurial Superfly, and LeBron XXI.',
  keywords: [
    'NOVA Innovation',
    'NOVA Footwear',
    'NOVA Air Max Dn',
    'NOVA Pegasus 41',
    'NOVA Alphafly 3',
    'NOVA Mercurial Superfly',
    'NOVA LeBron XXI',
    'NOVA shoes online',
  ],
  authors: [{ name: 'NOVA Innovation Lab' }],
  openGraph: {
    title: 'NOVA — Innovation 2025/2026 | Next-Gen Kinetic Footwear',
    description:
      'Immersive 3D WebGL showcase of groundbreaking NOVA sports science, pressurized air units, and carbon Flyplates.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'NOVA.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVA — Innovation 2025/2026',
    description: 'Immersive 3D showcase of NOVA footwear innovation.',
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
