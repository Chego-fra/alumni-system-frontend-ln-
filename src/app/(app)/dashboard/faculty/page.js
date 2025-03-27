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
    }, [user, router]);

    if (!user) {
        return <div>Loading...</div>; 
    }

    return <div>Welcome, {user.name}!</div>;
};

export default FacultyDashboard;
