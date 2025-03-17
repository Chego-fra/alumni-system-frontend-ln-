import Slider from '@/components/sliderComponet/SliderComponent';
import styles from './page.module.css';
import alumniData from '@/components/data/alumnidata/AlumniData';
import AlumniCard from '@/components/alumniComponent/AlumniComponent';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Slider/>
      <div className={styles.directorySection}>
        <div className={styles.top}>
        <h1 className={styles.directorySectionH1}>Welcome to the Alumni Network</h1>
        <h2 className={styles.directorySectionH2}>Featured Alumni</h2>
        </div>
            <div className={styles.grids}>
                {alumniData.slice(0, 3).map(alumni => (
                    <AlumniCard key={alumni.id} alumni={alumni} />
                ))}
            </div>
            <a href="/directory" className={styles.link}>View All Alumni</a>
        </div>
    </div>
  );
};

export default HomePage;