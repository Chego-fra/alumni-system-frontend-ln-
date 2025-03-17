import Image from 'next/image';

import styles from './Career.module.css';
import careerData from '@/components/data/careerdata/CareerData';
import CareerCard from '@/components/careerComponent/CareerComponent';

const CareerPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.headerH1}>Careers</h1>
                <h2 className={styles.headerH2}>Explore Exciting Career Opportunities</h2>
            </div>
            <div className={styles.headerRight}>
                <Image src="/c1.jpg" alt='event' width={500} height={500} className={styles.image}/>
            </div>
        </div>
        <div className={styles.macadi}>
        {
        careerData.map(career =>(
            <CareerCard  key={career.id} career={career}/>
        ))
      }
        </div>
    </div>
  );
};

export default CareerPage;