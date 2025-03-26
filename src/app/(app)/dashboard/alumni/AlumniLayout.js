
import AlumniSidebar from "@/components/sidebar/AlumniSidebar";
import styles from "./Alumni.module.css";

const AlumniLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <AlumniSidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default AlumniLayout;
