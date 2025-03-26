"use client"
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const FacultyDashboard = () => {
    const { user } = useAuth({ middleware: 'auth' });
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== 'faculty') {
            router.push('/'); // Redirect unauthorized users
        }
    }, [user]);

    return <div>Welcome, Faculty!</div>;
};

export default FacultyDashboard;
