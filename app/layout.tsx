"use client";

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import LoadingScreen from '@/components/layout/loading-screen';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const minecraftFont = localFont({
  src: './fonts/MinecraftSeven_v2.woff2',
  variable: '--font-minecraft',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Animation is 2s, plus a buffer

    return () => clearTimeout(timer);
  }, []);

  // Disables scrolling when loading screen is visible
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        {/* 
          NOTE: The 'metadata' export object was removed because it is not supported in Client Components.
          For SEO purposes, it is recommended to move this component's logic to a separate 
          client component and keep 'layout.tsx' as a Server Component.
        */}
        <title>Jolly Games - Minecraft Minigames Server</title>
        <meta name="description" content="Únete a la mejor experiencia de minijuegos de Minecraft. Jolly Games ofrece una amplia variedad de juegos únicos y emocionantes para toda la comunidad." />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={`${inter.variable} ${minecraftFont.variable} font-sans antialiased`}>
        {loading ? <LoadingScreen /> : null}
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-950" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>
            
            {/* Navigation */}
            <Navbar />
            
            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
            
            {/* Toast Notifications */}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}