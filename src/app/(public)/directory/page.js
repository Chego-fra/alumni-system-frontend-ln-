import Image from 'next/image';
import styles from './Directory.module.css';
import alumniData from '@/components/data/alumnidata/AlumniData';
import AlumniCard from '@/components/alumniComponent/AlumniComponent';


const DirectoryPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.headerH1}>Directory</h1>
                <h2 className={styles.headerH2}>Connect. Inspire. Grow. Explore our alumni network and see where paths have led beyond graduation.</h2>
            </div>
            <div className={styles.headerRight}>
                <Image src="/woman.png" alt='woman' width={344} height={344}/>
            </div>
        </div>
        <div className={styles.macadi}>
        {
        alumniData.map(alumni =>(
            <AlumniCard key={alumni.id} alumni={alumni}/>
        ))
      }
        </div>
    </div>
  );
};

export default DirectoryPage;