"use client"
import CareerBarChart from '@/components/AlumniChart';
import EventCalendar from '@/components/EventCalendar';
import UserCards from '@/components/usercards/UserCards';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import styles from './Admin.module.css'

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

    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
          {/* left */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* user cards */}
          <div className="flex gap-4 justify-between flex-wrap">
            <UserCards type="Admin"/>
            <UserCards type="Alumni"/>
            <UserCards type="Faculty"/>
          </div>
          {/* middle charts */}
          <div className="flex gap-4 flex-col lg:flex-row ">
            {/* count chart */}
              <div className="w-full h-[650px]">
              <CareerBarChart/>
              </div>
              {/* attendance chart */}
              {/* <div className="w-full lg:w-2/3 h-[450px]"><AttendanceChartContainer/></div> */}
          </div>
           {/* bottom charts */}
           {/* <div className="w-full h-[500px]"><FinanceChart/></div> */}
          </div>
          {/* right*/}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <EventCalendar/>
          </div>
        </div>
      );
};

export default AdminDashboard;
