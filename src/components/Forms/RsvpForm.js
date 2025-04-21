"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RSVPFormSchema } from "@/lib/formValidationSchemas"; // Zod schema for RSVP
import { createRSVP, updateRSVP } from "@/lib/actions"; // API handlers
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const RSVPForm = ({ type, data, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(RSVPFormSchema),
    defaultValues: data?.attributes || {}, 
  });

  const [state, setState] = useState({ success: false, error: false, loading: false });
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    setState((prev) => ({ ...prev, loading: true }));

    const formattedData = {
      event_id: formData.event_id,
      alumni_id: formData.alumni_id,
    };

    let result;
    try {
      result = type === "create"
        ? await createRSVP(formattedData)
        : await updateRSVP(data.id, formattedData);

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
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create RSVP" : "Update RSVP"}
      </h1>

      <InputField
        label="Event ID"
        name="event_id"
        defaultValue={data?.attributes?.event_id}
        register={register}
        error={errors?.event_id}
      />

      <InputField
        label="Alumni ID"
        name="alumni_id"
        defaultValue={data?.attributes?.alumni_id}
        register={register}
        error={errors?.alumni_id}
      />

      {data?.event_title && (
        <p className="text-sm text-gray-600">Event: {data.event_title}</p>
      )}
      {data?.alumni_name && (
        <p className="text-sm text-gray-600">Alumni: {data.alumni_name}</p>
      )}

      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default RSVPForm;
