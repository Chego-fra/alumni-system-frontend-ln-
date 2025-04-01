"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import axios from "@/lib/axios";

const EventCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/events");
        setEvents(res.data.data.slice(0, 2)); 
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={setValue} value={value} />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-xl font-semibold">Events</h1>
        <Image src="/moreDark.png" alt="More" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {loading ? (
          <p className="text-gray-500 text-center">Loading events...</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div
              className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky even:border-t-purple"
              key={event.id}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                <span className="text-gray-300 text-xs">{event.time}</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
