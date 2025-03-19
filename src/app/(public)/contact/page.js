import Image from 'next/image';

import styles from './Contact.module.css';
import ContactComponent from '@/components/contactComponent/ContactComponent';



const ContactPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <h1 className={styles.headerH1}>Let’s Connect</h1>
                <h2 className={styles.headerH2}>Let&apos;s Stay in Touch – We’d Love to Hear from You!</h2>
            </div>
            <div className={styles.headerRight}>
                <Image src="/contact.jpg" alt='event' width={280} height={280} className={styles.image}/>
            </div>
        </div>
        <div>
            <ContactComponent/>
        </div>

    </div>
  );
};

export default ContactPage;