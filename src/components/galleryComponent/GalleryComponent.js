"use client"
import Image from 'next/image';
import styles from './GalleryComponent.module.css';
import { motion } from 'framer-motion'; 
import { FileText,  User,  } from 'lucide-react';

const GalleryCard = ({ gallery }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }} 
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }} 
    >
      <div className={styles.cardLeft}>
        {gallery.type === "image" ? (
            <Image src={gallery.url} alt={gallery.name} className={styles.image} width={400} height={400}/>
        ):(
          <div className={styles.vid}>
          <iframe
            className={styles.iframe}
            src={gallery.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          </div>
        )}
      </div>
      <div className={styles.right}>
        <h1 className={styles.name}>{gallery.title}</h1>
        <div className={styles.top}>
            <div className={styles.comon}>
                <FileText className={styles.graduation} />
                <p className={styles.para}><strong>Description:</strong> {gallery.description}</p>
            </div>
            <div className={styles.comon}>
                <User className={styles.graduation} />
                <p className={styles.para}><strong>Posted By:</strong> {gallery.posted_by}</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
