
import styles from "./Faculty.module.css";
import FacultySidebar from "@/components/sidebar/FacultySidebar";

const FacultyLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <FacultySidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default FacultyLayout;
