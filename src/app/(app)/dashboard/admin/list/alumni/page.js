"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FormContainer from "@/components/FormContainer";
import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import axios from "@/lib/axios";
import Table from "@/components/Table";

const API_URL = "/api/v1/alumniProfile";

const AlumniListPage = () => {
  const searchParams = useSearchParams();
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    fetchAlumni();
  }, [page, search]);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { search, page },
      });
  
      setAlumni(response.data.data); 
      setTotalPages(response.data.meta.last_page); 
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Graduation Year", accessor: "graduation_year" },
    { header: "Major", accessor: "major" },
    { header: "Company", accessor: "company" },
    { header: "Location", accessor: "location" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-gray-100 hover:bg-purpleLight">
      <td className="p-4">{item.attributes.name}</td>
      <td>{item.attributes.graduation_year}</td>
      <td>{item.attributes.major}</td>
      <td>{item.attributes.company}</td>
      <td>{item.attributes.location}</td>
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="alumni" type="update" data={item} />
          <FormContainer table="alumni" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Alumni Directory</h1>
        <div className="flex items-center gap-4">
          <TableSearch onSearch={setSearch} />
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/filter.png" alt="Filter" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/sort.png" alt="Sort" width={14} height={14} />
          </button>
          <FormContainer table="alumni" type="create" />
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-center py-4">Loading alumni...</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={alumni} />
      )}

      {/* PAGINATION */}
      <Pagination page={page} count={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AlumniListPage;
