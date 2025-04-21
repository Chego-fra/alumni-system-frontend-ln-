"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { careerSchema } from "@/lib/formValidationSchemas";
import { createCareer, updateCareer } from "@/lib/actions";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const CareerForm = ({ type, data, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(careerSchema),
    defaultValues: data?.attributes || {},
  });

  const [state, setState] = useState({ success: false, error: false, loading: false });
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    setState((prev) => ({ ...prev, loading: true }));

    const formattedData = {
      id: formData.id || undefined,
      title: formData.title || "",
      company: formData.company || "",
      location: formData.location || "",
      description: formData.description || "",
      requirements: formData.requirements || "",
      posted_by: formData.posted_by || "",
      date_posted: formData.date_posted || "", 
      image: formData.image?.[0] || null,
    };
    
    

    let career;
    try {
      career = type === "create"
        ? await createCareer(formattedData)
        : await updateCareer(data.id, formattedData);

      setState(career);
    } catch (error) {
      toast.error("Something went wrong!");
      setState({ success: false, error: true, loading: false });
      console.error("Update career error:", error.response?.data || error.message);
    }
  });

  useEffect(() => {
    if (state.success) {
      toast.success(`Career has been ${type === "create" ? "created" : "updated"}!`);
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
        {type === "create" ? "Create a new Career" : "Update the Career"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Job Title"
          name="title"
          defaultValue={data?.attributes?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Company"
          name="company"
          defaultValue={data?.attributes?.company}
          register={register}
          error={errors?.company}
        />
        <InputField
          label="Location"
          name="location"
          defaultValue={data?.attributes?.location}
          register={register}
          error={errors?.location}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.attributes?.description}
          register={register}
          error={errors?.description}
        />
        <InputField
          label="Requirements"
          name="requirements"
          defaultValue={data?.attributes?.requirements}
          register={register}
          error={errors?.requirements}
        />
        <InputField
          label="Posted By (User ID)"
          name="posted_by"
          defaultValue={data?.attributes?.posted_by}
          register={register}
          error={errors?.posted_by}
        />
         <InputField
          label="Date Posted"
          name="date_posted"
          defaultValue={data?.attributes?.date_posted}
          register={register}
          error={errors?.date_posted}
        />


        {/* Uncomment and use image input if needed */}
        {/* 
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
          />
          {errors.image?.message && (
            <p className="text-xs text-red-400">
              {errors.image.message.toString()}
            </p>
          )}
        </div>
        */}
      </div>

      {state.error && <span className="text-red-500">Something went wrong!</span>}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={state.loading}
      >
        {state.loading ? "Submitting..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default CareerForm;
