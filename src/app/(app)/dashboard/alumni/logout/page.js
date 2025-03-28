"use client"
import { useAuth } from "@/hooks/auth";
import styles from './Logout.module.css'

const Logout = () => {
    const { logout } = useAuth();
  return (
    <div className={styles.logout}>
      <p className={styles.p}>Are You Sure You Want To Logout</p>
      <button onClick={logout} className={styles.btn}>Logout</button>
    </div>
  );
};

export default Logout;