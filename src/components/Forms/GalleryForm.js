"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { gallerySchema } from "@/lib/formValidationSchemas"; // Gallery validation schema
import { createGallery, updateGallery } from "@/lib/actions"; // Import the actions for create and update
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const GalleryForm = ({ type, data, setOpen, relatedData }) => {

  // Set the defaultValues dynamically based on the data prop
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: data || {}, // Prefill with data if available
  });

  const [state, setState] = useState({ success: false, error: false, loading: false });
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    setState((prev) => ({ ...prev, loading: true })); // Start loading
    
    // Format the data for create or update
    const formattedData = {
      id: formData.id || undefined,
      title: formData.title || "",
      short_title: formData.short_title || "",
      description: formData.description || "",
      type: formData.type || "default", // Default type
      file_path: formData.file_path?.[0] || "", // Handle file upload
      posted_by: formData.posted_by || "", // Assuming `posted_by` is a string or ID
    };

  const result = await (type === "create"
    ? createEvent(formattedData)
    : updateEvent(data.id, formattedData));

  if (result.success) {
    toast(`Event ${type === "create" ? "created" : "updated"}!`);
    setOpen(false);
    router.refresh();
    window.location.reload(); 
  } else {
    toast.error("Something went wrong!");
  }
  });

  useEffect(() => {
    if (state.success) {
      toast.success(`Gallery has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      reset(); // Reset form after successful submission
      router.refresh();
    } else if (state.error) {
      toast.error("Failed to submit the form!");
    }
    setState((prev) => ({ ...prev, loading: false })); // Stop loading
  }, [state, router, type, setOpen, reset]);

  // Ensure `postedBy` is defined and is an object with necessary data
  const { postedBy = {} } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new gallery" : "Update the gallery"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Id"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
          hidden
        />
        <InputField
          label="Gallery title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Short title"
          name="short_title"
          defaultValue={data?.short_title}
          register={register}
          error={errors?.short_title}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
        <InputField
          label="Type"
          name="type"
          defaultValue={data?.type}
          register={register}
          error={errors?.type}
        />
        <InputField
          label="File"
          name="file_path"
          defaultValue={data?.file_path}
          register={register}
          error={errors?.file_path}
          type="file"
        />
        <InputField
          label="Posted by"
          name="posted_by"
          defaultValue={data?.posted_by}
          register={register}
          error={errors?.posted_by}
        />
      </div>

      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Posted By</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("posted_by")}
          defaultValue={data?.posted_by || ""}
        >
          {postedBy?.name ? (
            <option value={postedBy.id}>
              {postedBy.name}
            </option>
          ) : (
            <option value="">No poster available</option>
          )}
        </select>
        {errors.posted_by?.message && (
          <p className="text-xs text-red-400">
            {errors.posted_by.message.toString()}
          </p>
        )}
      </div>

      {state.error && <span className="text-red-500">Something went wrong!</span>}
      
      <button
        type="submit"
        className="bg-blue-400 text-white p-2 rounded-md"
        disabled={state.loading} // Disable button when loading
      >
        {state.loading ? "Submitting..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default GalleryForm;
