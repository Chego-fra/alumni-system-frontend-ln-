import Slider from '@/components/sliderComponet/SliderComponent';
import styles from './page.module.css';
import alumniData from '@/components/data/alumnidata/AlumniData';
import AlumniCard from '@/components/alumniComponent/AlumniComponent';
import eventData from '@/components/data/eventdata/EventData';
import EventCard from '@/components/eventComponent/EventComponent';
import careerData from '@/components/data/careerdata/CareerData';
import CareerCard from '@/components/careerComponent/CareerComponent';
import galleryData from '@/components/data/gallerydata/GalleryData';
import GalleryCard from '@/components/galleryComponent/GalleryComponent';
import resourcesData from '@/components/data/resoursesdata/ResourcesData';
import ResourceCard from '@/components/resourcesComponent/ResourcesComponent';

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


        <div className={styles.directorySection}>
        <div className={styles.top}>
        <h1 className={styles.directorySectionH1}>Capturing Moments, Celebrating Memories</h1>
        <h2 className={styles.directorySectionH2}>Featured Gallery</h2>
        </div>
            <div className={styles.grid}>
                {galleryData .slice(0, 4).map(gallery => (
                    <GalleryCard key={gallery.id} gallery={gallery} />
                ))}
            </div>
            <a href="/gallery" className={styles.link}>View All Galleries</a>
        </div>



        <div className={styles.directorySection}>
        <div className={styles.top}>
        <h1 className={styles.directorySectionH1}>Empowering Alumni with Knowledge & Tools</h1>
        <h2 className={styles.directorySectionH2}>Featured Resource</h2>
        </div>
            <div className={styles.grid}>
                {resourcesData .slice(0, 4).map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
            <a href="/resources" className={styles.link}>View All Resource</a>
        </div>

    </div>
  );
};

export default HomePage;