import Image from 'next/image';
import styles from './Gallery.module.css';
import galleryData from '@/components/data/gallerydata/GalleryData';
import GalleryCard from '@/components/galleryComponent/GalleryComponent';



const GalleryPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.headerH1}>A Journey Through Time</h1>
                <h2 className={styles.headerH2}>Alumni Memories in Photos & Videos</h2>
            </div>
            <div className={styles.headerRight}>
                <Image src="/tours.jpg" alt='event' width={400} height={400} className={styles.image}/>
            </div>
        </div>
        <div className={styles.macadi}>
        {
        galleryData.map(gallery=>(
            <GalleryCard key={gallery.id} gallery={gallery}/>
        ))
      }
        </div>
    </div>
  );
};

export default GalleryPage;