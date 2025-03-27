

import Link from "next/link";
import styles from "./Alumni.module.css";
import Image from "next/image";
import AlumniMenu from "@/components/menu/AlumniMenu";
import DashboardNavbar from "@/components/dashboardNavbar/DashboardNavbar";

const AlumniLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        <Link href="/dashboard/admin" className={styles.logo}>
          <Image src="/istlogo.png" alt="logo" width={52} height={52}/>
          <span className={styles.span}>Alumni Dashboard </span>
        </Link>
        <AlumniMenu />
      </div>
      
       {/* RIGHT */}
      <div className={styles.right}>
        <DashboardNavbar/>
        {children}
        </div>
    </div>
  );
};

export default AlumniLayout;
