'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/layout/loading-screen';

export function ClientSideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This timer simulates a loading process.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Duration of the loading screen animation

    return () => clearTimeout(timer);
  }, []);

  // Effect to disable scrolling when loading screen is visible
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
          delay: loading ? 0 : 2.5,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
