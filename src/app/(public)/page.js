import Slider from '@/components/sliderComponet/SliderComponent';
import styles from './page.module.css';
import alumniData from '@/components/data/alumnidata/AlumniData';
import AlumniCard from '@/components/alumniComponent/AlumniComponent';
import eventData from '@/components/data/eventdata/EventData';
import EventCard from '@/components/eventComponent/EventComponent';
import careerData from '@/components/data/careerdata/CareerData';
import CareerCard from '@/components/careerComponent/CareerComponent';

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

        <div className={styles.directorySection}>
        <div className={styles.top}>
        <h1 className={styles.directorySectionH1}>Upcoming Alumni Events</h1>
        <h2 className={styles.directorySectionH2}>Featured Events</h2>
        </div>
            <div className={styles.grid}>
                {eventData .slice(0, 4).map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            <a href="/event" className={styles.link}>View All Events</a>
        </div>

        <div className={styles.directorySection}>
        <div className={styles.top}>
        <h1 className={styles.directorySectionH1}>Find Your Next Dream Job</h1>
        <h2 className={styles.directorySectionH2}>Featured Career</h2>
        </div>
            <div className={styles.grid}>
                {careerData .slice(0, 4).map(career => (
                    <CareerCard key={career.id} career={career} />
                ))}
            </div>
            <a href="/career" className={styles.link}>View All Careers</a>
        </div>

    </div>
  );
};

export default HomePage;