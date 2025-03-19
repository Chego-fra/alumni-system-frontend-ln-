import Image from 'next/image';
import styles from './Resource.module.css';
import resourcesData from '@/components/data/resoursesdata/ResourcesData';
import ResourceCard from '@/components/resourcesComponent/ResourcesComponent';



const ResourcePage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.headerH1}>Resource Hub</h1>
                <h2 className={styles.headerH2}> Empowering Your Growth</h2>
            </div>
            <div className={styles.headerRight}>
                <Image src="/resource.jpg" alt='resource' width={280} height={280} className={styles.image}/>
            </div>
        </div>
        <div className={styles.macadi}>
        {
        resourcesData.map(resource =>(
            < ResourceCard key={resource.id} resource={resource}/>
        ))
      }
        </div>
    </div>
  );
};

export default ResourcePage;