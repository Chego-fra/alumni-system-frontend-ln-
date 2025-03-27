"use client"
import Image from 'next/image';
import styles from './DashboardNavbar.module.css';
import { useAuth } from '@/hooks/auth';

const DashboardNavbar = () => {
  const { user } = useAuth({ middleware: 'auth' });
  return (
    <div className={styles.container}>
      {/* SEARCHBAR */}
      <div className={styles.searchbar}>
        <Image src='/search.png' alt='search' width={14} height={14}/>
        <input type='text' placeholder='search...' className={styles.search} />
      </div>

    {/* ICONS AND USER */}
    <div className={styles.icons}>
        <div className={styles.message}>
            <Image src='/message.png' alt='message' width={20} height={20}/>
        </div>
        <div className={styles.annoucement}>
            <Image src='/announcement.png' alt='announcement' width={20} height={20}/>
            <div className={styles.count}>
                1
            </div>
        </div>
        <div className={styles.user}>
            <div className={styles.users}>
            <span className={styles.username}> {user?.name?.split(" ")[0]}</span>
            <span className={styles.userrole}> {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Unknown"}</span>
            </div>
            <Image src='/avatar.png' alt='avatar' width={36} height={36} className={styles.img}/>
        </div>
    </div>
    </div>
  );
};

export default DashboardNavbar;