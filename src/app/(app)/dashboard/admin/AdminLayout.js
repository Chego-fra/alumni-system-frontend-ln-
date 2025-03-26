import AdminSidebar from "@/components/sidebar/AdminSidebar";
import styles from "./Admin.module.css";

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <AdminSidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default AdminLayout;
