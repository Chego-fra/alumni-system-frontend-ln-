"use client"
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AlumniDashboard = () => {
    const { user } = useAuth({ middleware: 'auth' });
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== 'alumni') {
            router.push('/'); // Redirect unauthorized users
        }
    }, [user]);

    return <div>Welcome, Alumni!</div>;
};

export default AlumniDashboard;
