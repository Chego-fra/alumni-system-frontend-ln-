"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FormContainer from "@/components/FormContainer";
import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import axios from "@/lib/axios";
import Table from "@/components/Table";

const API_URL = "/api/v1/gallery";

const GalleryListPage = () => {
  const searchParams = useSearchParams();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    fetchGallery();
  }, [page, search]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { search, page },
      });

      setGalleryItems(response.data.data); // gallery array
      setTotalPages(response.data.meta.last_page); // pagination info
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Type", accessor: "type" },
    { header: "Description", accessor: "description_preview" },
    { header: "Posted By", accessor: "posted_by" },
    // { header: "Media", accessor: "file_path" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-gray-100 hover:bg-purpleLight">
      <td className="p-4">{item.attributes.title}</td>
      <td>{item.attributes.type}</td>
      <td>{item.attributes.description_preview}</td>
      <td>{item.attributes.posted_by}</td>
      {/* <td>
        {item.attributes.full_url ? (
          <a href={item.attributes.full_url} target="_blank" rel="noopener noreferrer">
            <Image src={item.attributes.full_url} alt="Media" width={50} height={50} className="rounded" />
          </a>
        ) : (
          "No media"
        )}
      </td> */}
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="gallery" type="update" data={item} />
          <FormContainer table="gallery" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">All Gallery Items</h1>
        <div className="flex items-center gap-4">
          <TableSearch onSearch={setSearch} />
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/filter.png" alt="Filter" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500">
            <Image src="/sort.png" alt="Sort" width={14} height={14} />
          </button>
          <FormContainer table="gallery" type="create" />
        </div>
      </div>
      {/* LIST */}
      {loading ? (
        <p className="text-center py-4">Loading gallery items...</p>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={galleryItems} />
      )}
      {/* PAGINATION */}
      <Pagination page={page} count={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default GalleryListPage;
