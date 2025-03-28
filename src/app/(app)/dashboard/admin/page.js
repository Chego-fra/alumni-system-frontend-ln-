"use client"
import UserCards from '@/components/usercards/UserCards';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './Admin.module.css'

const AdminDashboard = () => {
    const { user } = useAuth({ middleware: 'auth' });
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== 'admin') {
            router.push('/'); 
        }
    }, [user, router]);

    if (!user) {
        return <div>Loading...</div>; 
    }

    return(
    <div className={styles.pagecontainer}>
        
        
        
        Welcome, {user.name}!

<div className="flex gap-4 justify-between flex-wrap">
    {/* <UserCards type="Admin"/>
    <UserCards type="Alumni"/>
    <UserCards type="Faculty"/> */}
  </div>
    
    </div>

 ) 
};

export default AdminDashboard;
