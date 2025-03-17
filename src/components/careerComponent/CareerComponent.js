"use client"
import styles from './CareerComponent.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion'; 
import { Building2, MapPin, FileText, ClipboardList, User, Calendar } from "lucide-react";

const CareerCard = ({ career }) => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }} 
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }} 
    >
      <div className={styles.cardLeft}>
        <Image src={career.image} alt={career.name} className={styles.image} width={400} height={400}/>
      </div>
      <div className={styles.right}>
        <h1 className={styles.name}>{career.title}</h1>
        <div className={styles.top}>
            <div className={styles.comon}>
                <Building2 className={styles.graduation} />
                <p className={styles.para}><strong>Company:</strong> {career.company}</p>
            </div>
            <div className={styles.comon}>
                <MapPin className={styles.graduation} />
                <p className={styles.para}><strong>Location:</strong> {career.location}</p>
            </div>
        </div>
        <div className={styles.top}>
            <div className={styles.comon}>
                <FileText className={styles.file} />
                <p className={styles.para}><strong>Description:</strong> {career.description}</p>
            </div>
            <div className={styles.comon}>
                <ClipboardList className={styles.files} />
                <p className={styles.para}><strong>Requirements:</strong> {career.requirements}</p>
            </div>
        </div>
        <div className={styles.top}>
            <div className={styles.comon}>
                <User className={styles.graduation} />
                <p className={styles.para}><strong>Posted By:</strong> {career.posted_by}</p>
            </div>
            <div className={styles.comon}>
                <Calendar className={styles.graduation} />
                <p className={styles.para}><strong>Date Posted:</strong> {career.date_posted}</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerCard;
