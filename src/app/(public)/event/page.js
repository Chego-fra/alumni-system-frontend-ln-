import Image from 'next/image';
import styles from './Events.module.css';
import eventData from '@/components/data/eventdata/EventData';
import EventCard from '@/components/eventComponent/EventComponent';


const EventPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.headerH1}>Events</h1>
                <h2 className={styles.headerH2}>Stay Connected: Alumni Gatherings & Reunions</h2>
            </div>
            <div className={styles.headerRight}>
                <Image src="/tours.jpg" alt='event' width={400} height={400} className={styles.image}/>
            </div>
        </div>
        <div className={styles.macadi}>
        {
        eventData.map(event =>(
            <EventCard key={event.id} event={event}/>
        ))
      }
        </div>
    </div>
  );
};

export default EventPage;