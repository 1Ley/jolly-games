import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as HotToaster } from 'react-hot-toast';
import { ClientSideProvider } from '@/components/providers/client-side-provider';
import { getImagePath, getAssetPath } from '@/lib/assets';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const minecraftFont = localFont({
  src: '../public/fonts/MinecraftSeven_v2.woff2',
  variable: '--font-minecraft',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Jolly Games - Minecraft Minigames Server',
    template: '%s | Jolly Games',
  },
  description:
    'Únete a la mejor experiencia de minijuegos de Minecraft. Jolly Games ofrece una amplia variedad de juegos únicos y emocionantes para toda la comunidad.',
  keywords: [
    'minecraft',
    'minigames',
    'server',
    'jolly games',
    'gaming',
    'multiplayer',
  ],
  authors: [{ name: 'Jolly Studio' }],
  creator: 'Jolly Studio',
  publisher: 'Jolly Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: getImagePath('logo.png'),
    shortcut: getImagePath('logo.png'),
    apple: getImagePath('logo.png'),
  },
  metadataBase: new URL('https://jolly-games.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://jolly-games.com',
    title: 'Jolly Games - Minecraft Minigames Server',
    description: 'Únete a la mejor experiencia de minijuegos de Minecraft.',
    siteName: 'Jolly Games',
    images: [
      {
        url: getImagePath('logo.png'),
        width: 1200,
        height: 630,
        alt: 'Jolly Games Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jolly Games - Minecraft Minigames Server',
    description: 'Únete a la mejor experiencia de minijuegos de Minecraft.',
    images: [getImagePath('logo.png')],
    creator: '@jollygames',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body
        className={`${inter.variable} ${minecraftFont.variable} font-sans antialiased`}
      >
        <ClientSideProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-950" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url(${getAssetPath('/grid.svg')})`,
                  }}
                />
              </div>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
              <HotToaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#1f2937',
                    color: '#f9fafb',
                    border: '1px solid #374151',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#f9fafb',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#f9fafb',
                    },
                  },
                }}
              />
            </div>
          </ThemeProvider>
        </ClientSideProvider>
      </body>
    </html>
  );
}
