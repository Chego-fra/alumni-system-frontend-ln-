"use client"
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

    return <div>Welcome, {user.name}!</div>;
};

export default AdminDashboard;
