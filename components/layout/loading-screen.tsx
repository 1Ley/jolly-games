import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './loading-screen.module.css';
import { getImagePath } from '@/lib/assets';

const LoadingScreen = () => {
  return (
    <motion.div
      className={styles.loadingScreen}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <motion.div
        className={styles.logoContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <Image
          src={getImagePath('jollygames.png')}
          alt="JollyGames Logo"
          width={256}
          height={256}
          priority
        />
      </motion.div>
      <motion.div
        className={styles.shimmerContainer}
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }} // Adjusted for the new 50% width (100vw / 50vw = 2)
        transition={{
          duration: 1.8,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <div className={styles.shimmer} />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
