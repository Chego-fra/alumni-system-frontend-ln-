import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './UserCards.module.css';
import axios from '@/lib/axios';

const UserCards = ({ type }) => {
  const [count, setCount] = useState(null);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0].replace(/-/g, '/');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get('/api/dashboard/counts'); // Adjust URL if needed
        const data = res.data; // Axios automatically parses JSON

        // Set count dynamically based on the "type" prop
        if (type === 'Alumni') setCount(data.alumni);
        if (type === 'Faculty') setCount(data.faculty);
        if (type === 'Admin') setCount(data.admin);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching counts:', error);
      }
      
    };

    fetchCounts();
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.date}>
        <span className={styles.sapn}>{formattedDate}</span>
        <Image src="/more.png" alt="more" width={20} height={20} />
      </div>
      <h1 className={styles.count}>{count !== null ? count : 'Loading...'}</h1>
      <h2 className={styles.h2}>{type}s</h2>
    </div>
  );
};

export default UserCards;
