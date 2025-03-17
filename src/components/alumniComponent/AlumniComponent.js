"use client"
import Image from 'next/image';
import styles from './AlumniComponent.module.css';
import { Briefcase, GraduationCap, Laptop, MapPin } from 'lucide-react';
import { motion } from 'framer-motion'; // ✅ Import Framer Motion
import Link from 'next/link';

const AlumniCard = ({ alumni }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }} 
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }} 
    >
      <div className={styles.cardLeft}>
        <Image src={alumni.image} alt={alumni.name} className={styles.image} width={144} height={144}/>
      </div>
      <div className={styles.right}>
        <h1 className={styles.name}>{alumni.name}</h1>
        <div className={styles.top}>
            <div className={styles.comon}>
                <GraduationCap className={styles.graduation} />
                <p className={styles.para}><strong>Graduation Year:</strong> {alumni.graduationYear}</p>
            </div>
            <div className={styles.comon}>
                <Laptop className={styles.graduation} />
                <p className={styles.para}><strong>Major:</strong> {alumni.major}</p>
            </div>
        </div>
        <div className={styles.top}>
            <div className={styles.comon}>
                <Briefcase className={styles.graduation} />
                <p className={styles.para}><strong>Company:</strong> {alumni.company}</p>
            </div>
            <div className={styles.comon}>
                <MapPin className={styles.graduation} />
                <p className={styles.para}><strong>Location:</strong> {alumni.location}</p>
            </div>
        </div>
        <div className={styles.links}>
            {alumni.linkedin && <Link href={alumni.linkedin} target="_blank">LinkedIn</Link>}
            {alumni.twitter && <Link href={alumni.twitter} target="_blank">Twitter</Link>}
            {alumni.whatsapp && <Link href={alumni.whatsapp} target="_blank">WhatsApp</Link>}
        </div>
      </div>
    </motion.div>
  );
};

export default AlumniCard;
