
import Link from "next/link";
import styles from "./Faculty.module.css";
import Image from "next/image";
import FacultyMenu from "@/components/menu/FacultyMenu";
import DashboardNavbar from "@/components/dashboardNavbar/DashboardNavbar";


const FacultyLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        <Link href="/dashboard/admin" className={styles.logo}>
          <Image src="/istlogo.png" alt="logo" width={52} height={52}/>
          <span className={styles.span}>Alumni Dashboard </span>
        </Link>
        <FacultyMenu />
      </div>
      
       {/* RIGHT */}
      <div className={styles.right}>
        <DashboardNavbar/>
        {children}
        </div>
    </div>
  );
};

export default FacultyLayout;
