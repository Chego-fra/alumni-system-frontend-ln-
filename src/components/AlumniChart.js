"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/lib/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CareerBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const res = await axios.get("/api/v1/career"); // Adjust API endpoint if needed
        const careers = res.data.data.map(c => c.attributes);

        // Aggregate career data by month
        const monthlyData = careers.reduce((acc, career) => {
          const month = new Date(career.date_posted).toLocaleString("en-US", { month: "short" });
          if (!acc[month]) {
            acc[month] = { name: month, postings: 0 };
          }
          acc[month].postings += 1;
          return acc;
        }, {});

        // Convert the object into an array of data for the chart
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
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
          <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />
          <Bar dataKey="postings" fill="#C3EBFA" legendType="circle" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CareerBarChart;
