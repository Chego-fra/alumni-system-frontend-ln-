"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TableSearch = ({ onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    params.set("search", searchQuery);
    router.push(`${window.location.pathname}?${params}`);
    onSearch(searchQuery); // ✅ Call parent function to update state
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // ✅ Update local state
        placeholder="search..."
        className="w-[200px] p-2 bg-transparent border-none outline-none"
      />
    </form>
  );
};

export default TableSearch;