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
    defaultValues: data?.attributes || {}, 
  });

  const [state, setState] = useState({ success: false, error: false, loading: false });
  const router = useRouter();

   const onSubmit = handleSubmit(async (formData) => {
     setState((prev) => ({ ...prev, loading: true }));
 
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
 
     let result;
     try {
       result = type === "create"
         ? await createResource(formattedData)
         : await updateResource(data.id, formattedData);
 
       setState(result);
     } catch (error) {
       toast.error("Something went wrong!");
       setState({ success: false, error: true, loading: false });
     }
   });
 
   useEffect(() => {
     if (state.success) {
       toast.success(`User has been ${type === "create" ? "created" : "updated"}!`);
       setOpen(false);
       reset();
       router.refresh();
     }
   
     if (state.success || state.error) {
       setState((prev) => ({ ...prev, loading: false }));
     }
   }, [state.success, state.error]);

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
          defaultValue={data?.attributes?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Category"
          name="category"
          defaultValue={data?.attributes?.category}
          register={register}
          error={errors?.category}
        />
        <InputField
          label="Category Tag"
          name="category_tag"
          defaultValue={data?.attributes?.category_tag}
          register={register}
          error={errors?.category_tag}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.attributes?.description}
          register={register}
          error={errors?.description}
        />
        <InputField
          label="Short Description"
          name="short_description"
          defaultValue={data?.attributes?.short_description}
          register={register}
          error={errors?.short_description}
        />
        <InputField
          label="File URL"
          name="file_url"
          defaultValue={data?.attributes?.file_url}
          register={register}
          error={errors?.file_url}
        />
        <InputField
          label="Video URL"
          name="video_url"
          defaultValue={data?.attributes?.video_url}
          register={register}
          error={errors?.video_url}
        />
        <InputField
          label="Posted By"
          name="posted_by"
          defaultValue={data?.attributes?.posted_by}
          register={register}
          error={errors?.posted_by}
        />
        <InputField
          label="Image"
          name="image"
          defaultValue={data?.attributes?.image}
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
