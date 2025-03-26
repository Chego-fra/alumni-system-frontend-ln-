"use client"
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminDashboard = () => {
    const { user } = useAuth({ middleware: 'auth' });
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== 'admin') {
            router.push('/'); // Redirect unauthorized users
        }
    }, [user]);

    return <div>Welcome, Admin!</div>;
};

export default AdminDashboard;
