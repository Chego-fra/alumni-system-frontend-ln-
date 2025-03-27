
import AdminMenu from "@/components/menu/AdminMenu";
import styles from "./Admin.module.css";
import DashboardNavbar from "@/components/dashboardNavbar/DashboardNavbar";
import Link from "next/link";
import Image from "next/image";

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        <Link href="/dashboard/admin" className={styles.logo}>
          <Image src="/istlogo.png" alt="logo" width={52} height={52}/>
          <span className={styles.span}>Alumni Dashboard </span>
        </Link>
        <AdminMenu />
      </div>
      
       {/* RIGHT */}
      <div className={styles.right}>
        <DashboardNavbar/>
        {children}
        </div>
    </div>
  );
};

export default AdminLayout;
