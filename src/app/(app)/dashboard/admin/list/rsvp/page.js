"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import FormContainer from "@/components/FormContainer";
import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import axios from "@/lib/axios";
import Table from "@/components/Table";

const API_URL = "/api/v1/rSVP";

const RSVPListPage = () => {
  const searchParams = useSearchParams(); 
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1); 
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get("search") || ""); 

  useEffect(() => {
    fetchRsvps();
  }, [page, search]);

  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { search, page },
      });
  
      setRsvps(response.data.data); // <- data is the array of RSVPs
      setTotalPages(response.data.meta.last_page); // <- meta has pagination info
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Event Title", accessor: "event_title" },
    { header: "Alumni Name", accessor: "alumni_name" },
    { header: "Created At", accessor: "created_at" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-gray-100 hover:bg-purpleLight">
      <td className="p-4">{item.attributes.event_title}</td>
      <td>{item.attributes.alumni_name}</td>
      <td>{item.attributes.created_at}</td>
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="rsvp" type="update" data={item} />
          <FormContainer table="rsvp" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">All RSVPs</h1>
        <div className="flex items-center gap-4">
          <TableSearch onSearch={setSearch} />
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/filter.png" alt="Filter" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/sort.png" alt="Sort" width={14} height={14} />
          </button>
          <FormContainer table="rsvp" type="create" />
        </div>
      </div>
      {/* LIST */}
      {loading ? (
        <p className="text-center py-4">Loading RSVPs...</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={rsvps} />
      )}
      {/* PAGINATION */}
      <Pagination page={page} count={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default RSVPListPage;
