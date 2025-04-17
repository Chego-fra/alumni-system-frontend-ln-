"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import FormContainer from "@/components/FormContainer";
import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import axios from "@/lib/axios";
import Table from "@/components/Table";

const API_URL = "/api/v1/users";  // Updated API URL

const UserListPage = () => {
  const searchParams = useSearchParams(); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1); 
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get("search") || ""); 

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { search, page },
      });
  
      setUsers(response.data.data); // <- data is the array of users
      setTotalPages(response.data.meta.last_page); // <- meta has pagination info
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Role Label", accessor: "role_label" },
    { header: "Verified", accessor: "is_verified" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-gray-100 hover:bg-purpleLight">
      <td className="p-4">{item.attributes.id}</td>
      <td>{item.attributes.name}</td>
      <td>{item.attributes.email}</td>
      <td>{item.attributes.role}</td>
      <td>{item.attributes.role_label}</td>
      <td>{item.attributes.is_verified ? "Yes" : "No"}</td>
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="user" type="update" data={item} />
          <FormContainer table="user" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">All Users</h1>
        <div className="flex items-center gap-4">
          <TableSearch onSearch={setSearch} />
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/filter.png" alt="Filter" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/sort.png" alt="Sort" width={14} height={14} />
          </button>
          <FormContainer table="user" type="create" />
        </div>
      </div>
      {/* LIST */}
      {loading ? (
        <p className="text-center py-4">Loading users...</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={users} />
      )}
      {/* PAGINATION */}
      <Pagination page={page} count={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default UserListPage;
