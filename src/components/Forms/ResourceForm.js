"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resourceSchema } from "@/lib/formValidationSchemas"; // Resource validation schema
import { createResource, updateResource } from "@/lib/actions"; // Import the actions for create and update
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const ResourceForm = ({ type, data, setOpen, relatedData }) => {

  // Set the defaultValues dynamically based on the data prop
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(resourceSchema),
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
      category: formData.category || "",
      category_tag: formData.category_tag || "",
      description: formData.description || "",
      short_description: formData.short_description || "",
      file_url: formData.file_url || "",
      video_url: formData.video_url || "",
      posted_by: formData.posted_by || "",
      image: formData.image || "",
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
      toast.success(`Resource has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      reset(); // Reset form after successful submission
      router.refresh();
    } else if (state.error) {
      toast.error("Failed to submit the form!");
    }
    setState((prev) => ({ ...prev, loading: false })); // Stop loading
  }, [state, router, type, setOpen, reset]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new resource" : "Update the resource"}
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
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Category"
          name="category"
          defaultValue={data?.category}
          register={register}
          error={errors?.category}
        />
        <InputField
          label="Category Tag"
          name="category_tag"
          defaultValue={data?.category_tag}
          register={register}
          error={errors?.category_tag}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
        <InputField
          label="Short Description"
          name="short_description"
          defaultValue={data?.short_description}
          register={register}
          error={errors?.short_description}
        />
        <InputField
          label="File URL"
          name="file_url"
          defaultValue={data?.file_url}
          register={register}
          error={errors?.file_url}
        />
        <InputField
          label="Video URL"
          name="video_url"
          defaultValue={data?.video_url}
          register={register}
          error={errors?.video_url}
        />
        <InputField
          label="Posted By"
          name="posted_by"
          defaultValue={data?.posted_by}
          register={register}
          error={errors?.posted_by}
        />
        <InputField
          label="Image"
          name="image"
          defaultValue={data?.image}
          register={register}
          error={errors?.image}
        />
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

export default ResourceForm;
