"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { alumniSchema } from "@/lib/formValidationSchemas"; // Event validation schema
import { createAlumni, updateAlumni } from "@/lib/actions"; // Import the actions for create and update
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const AlumniForm = ({ type, data, setOpen, relatedData }) => {
  // Set the defaultValues dynamically based on the data prop
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(alumniSchema),
    defaultValues: data?.attributes || {}, 
  });

  const [state, setState] = useState({ success: false, error: false, loading: false });
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    setState((prev) => ({ ...prev, loading: true }));

    const formattedData = {
      id: formData.id || undefined,
      name: formData.name || "",
      graduation_year: formData.graduation_year || "",
      major: formData.major || "",
      company: formData.company || "",
      location: formData.location || "",
      profile_summary: formData.profile_summary || "",
      image: formData.image?.[0] || null, // Use actual File object if available
      rsvpId: formData.rsvpId || null,
    };

    let result;
    try {
      result = type === "create"
        ? await createAlumni(formattedData)
        : await  updateAlumni(data.id, formattedData);

      setState(result);
    } catch (error) {
      toast.error("Something went wrong!");
      setState({ success: false, error: true, loading: false });
    }
  });

  useEffect(() => {
    if (state.success) {
      toast.success(`Alumni has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      reset();
      router.refresh();
    }
  
    if (state.success || state.error) {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [state.success, state.error]);

  // Ensure `rsvps` is defined and is an array before trying to map over it
  const { rsvps = [] } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new alumni profile" : "Update the alumni profile"}
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
          label="Name"
          name="name"
          defaultValue={data?.attributes?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Graduation Year"
          name="graduation_year"
          defaultValue={data?.attributes?.graduation_year}
          register={register}
          error={errors?.graduation_year}
        />
        <InputField
          label="Major"
          name="major"
          defaultValue={data?.attributes?.major}
          register={register}
          error={errors?.major}
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
        {/* <InputField
          label="Profile Summary"
          name="profile_summary"
          defaultValue={data?.attributes?.profile_summary}
          register={register}
          error={errors?.profile_summary}
        /> */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">RSVP</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("rsvpId")}
            defaultValue={data?.rsvpId || ""}
          >
            {rsvps.length > 0 ? (
              rsvps.map((rsvp) => (
                <option value={rsvp.id} key={rsvp.id}>
                  {rsvp.alumni?.name || "Unknown"}
                </option>
              ))
            ) : (
              <option value="">No RSVPs available</option>
            )}
          </select>
          {errors.rsvpId?.message && (
            <p className="text-xs text-red-400">
              {errors.rsvpId.message.toString()}
            </p>
          )}
        </div>
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

export default AlumniForm;
