"use client"
import Image from 'next/image';
import styles from './EventComponent.module.css';
import { motion } from 'framer-motion'; // ✅ Import Framer Motion
import { Calendar, Clock, FileText, MapPin, User, Users } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }} 
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }} 
    >
      <div className={styles.cardLeft}>
        <Image src={event.image} alt={event.name} className={styles.image} width={400} height={400}/>
      </div>
      <div className={styles.right}>
        <h1 className={styles.name}>{event.title}</h1>
        <div className={styles.top}>
            <div className={styles.comon}>
                <Calendar className={styles.graduation} />
                <p className={styles.para}><strong>Date:</strong> {event.date}</p>
            </div>
            <div className={styles.comon}>
                <Clock className={styles.graduation} />
                <p className={styles.para}><strong>Time:</strong> {event.time}</p>
            </div>
        </div>
        <div className={styles.top}>
            <div className={styles.comon}>
                <FileText className={styles.file} />
                <p className={styles.para}><strong>Description:</strong> {event.description}</p>
            </div>
            <div className={styles.comon}>
                <MapPin className={styles.graduation} />
                <p className={styles.para}><strong>Location:</strong> {event.location}</p>
            </div>
        </div>
        <div className={styles.top}>
            <div className={styles.comon}>
                <User className={styles.graduation} />
                <p className={styles.para}><strong>Organizer:</strong> {event.organizer}</p>
            </div>
            <div className={styles.comon}>
                <Users className={styles.graduation} />
                <p className={styles.para}><strong>Attendees:</strong> {event.attendees}</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
