"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import FormContainer from "@/components/FormContainer";
import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import axios from "@/lib/axios";
import Table from "@/components/Table";

const API_URL = "/api/v1/career";

const CareerListPage = () => {
  const searchParams = useSearchParams(); 
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1); 
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get("search") || ""); 

  useEffect(() => {
    fetchCareers();
  }, [page, search]);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { search, page },
      });

      setCareers(response.data.data); // array of careers
      setTotalPages(response.data.meta.last_page); // pagination info
    } catch (error) {
      console.error("Error fetching careers:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Company", accessor: "company" },
    { header: "Location", accessor: "location" },
    { header: "Posted By", accessor: "posted_by_name" },
    { header: "Date Posted", accessor: "formatted_date_posted" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-gray-100 hover:bg-purpleLight">
      <td className="p-4">{item.attributes.title}</td>
      <td>{item.attributes.company}</td>
      <td>{item.attributes.location}</td>
      <td>{item.attributes.posted_by_name}</td>
      <td>{item.attributes.formatted_date_posted}</td>
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="career" type="update" data={item} />
          <FormContainer table="career" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">All Careers</h1>
        <div className="flex items-center gap-4">
          <TableSearch onSearch={setSearch} />
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/filter.png" alt="Filter" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/sort.png" alt="Sort" width={14} height={14} />
          </button>
          <FormContainer table="career" type="create" />
        </div>
      </div>
      {/* LIST */}
      {loading ? (
        <p className="text-center py-4">Loading careers...</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={careers} />
      )}
      {/* PAGINATION */}
      <Pagination page={page} count={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default CareerListPage;
