"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CareerChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const res = await axios.get("/api/v1/career");
        const careers = res.data.data.map(c => c.attributes);
    
        console.log("Career attributes:", careers);
    
        const monthlyData = careers.reduce((acc, career) => {
          const datePosted = career.date_posted;
          console.log("Processing date:", datePosted);
    
          const month = new Date(datePosted).toLocaleString("en-US", { month: "short" });
    
          if (!acc[month]) {
            acc[month] = { name: month, postings: 0 };
          }
          acc[month].postings += 1;
          return acc;
        }, {});
    
        console.log("Transformed chart data:", Object.values(monthlyData));
    
        setData(Object.values(monthlyData));
      } catch (error) {
        console.error("Error fetching career data:", error);
      }
    };
    

    fetchCareerData();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Career Postings</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} tickMargin={10} />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} tickMargin={20} />
          <Tooltip />
          <Legend align="center" verticalAlign="top" wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }} />
          <Line type="monotone" dataKey="postings" stroke="#C3EBFA" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CareerChart;
