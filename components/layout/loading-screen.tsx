import Image from 'next/image';
import styles from './loading-screen.module.css';

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.logoContainer}>
        <Image src="/images/jollygames.png" alt="JollyGames Logo" width={256} height={256} priority />
      </div>
    </div>
  );
};

export default LoadingScreen; 