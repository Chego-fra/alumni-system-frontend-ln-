"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from './ResourcesComponent.module.css';
import { motion } from 'framer-motion';
import { Calendar, Download, FileText, Tag, User } from 'lucide-react';
import Link from 'next/link';

const ResourceCard = ({ resource }) => {
  
const [showVideo, setShowVideo] = useState(true);


  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }} 
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }} 
    >



<div className={styles.cardLeft}>
  <button onClick={() => setShowVideo(!showVideo)} className={styles.toggleBtn}>
    {showVideo ? "Show Image" : "Show Video"}
  </button>

  {showVideo && resource.video_url ? (
    <div className={styles.vid}>
      <iframe
        className={styles.iframe}
        src={resource.video_url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  ) : (
    resource.image && (
      <Image
        src={resource.image}
        alt={resource.title}
        width={300}
        height={200}
        className={styles.rimg}
      />
    )
  )}
</div>


      
      <div className={styles.right}>
        <h1 className={styles.name}>{resource.title}</h1>
        
        <div className={styles.top}>
          <div className={styles.comon}>
            <Tag className={styles.graduation} />
            <p className={styles.para}><strong>Category:</strong> {resource.category}</p>
          </div>
          <div className={styles.comon}>
            <FileText className={styles.file} />
            <p className={styles.para }><strong>Description:</strong> {resource.description}</p>
          </div>
        </div>

        <div className={styles.top}>
          <div className={styles.comon}>
            {resource.file_url && resource.file_url.endsWith(".pdf") && (
              <Link href={resource.file_url} download className={styles.download}>
                <Download className={styles.graduation} />
                <p className={styles.para}><strong>Download:</strong> Download PDF</p>
              </Link>
            )}
          </div>
          <div className={styles.comon}>
            <User className={styles.graduation} />
            <p className={styles.para}><strong>Posted By:</strong> {resource.posted_by}</p>
          </div>
        </div>

        <div className={styles.top}>
          <div className={styles.comon}>
            <Calendar className={styles.graduation} />
            <p className={styles.para}><strong>Date Posted:</strong> {resource.date_posted}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
