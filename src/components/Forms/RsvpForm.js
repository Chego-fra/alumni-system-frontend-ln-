"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RSVPFormSchema } from "@/lib/formValidationSchemas"; // Zod schema for RSVP
import { createRSVP, updateRSVP } from "@/lib/actions"; // API handlers
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const RSVPForm = ({ type, data, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RSVPFormSchema),
  });

  const router = useRouter();

  const [state, formAction] = useFormState(
    type === "create"
      ? createRSVP
      : (formData) => updateRSVP(data.id, formData),
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit(async (formData) => {
    const formattedData = {
      event_id: formData.event_id,
      alumni_id: formData.alumni_id,
    };

    const result = await (type === "create"
      ? createRSVP(formattedData)
      : updateRSVP(data.id, formattedData));

    if (result.success) {
      toast(`RSVP ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    } else {
      toast.error("Something went wrong!");
    }
  });

  useEffect(() => {
    if (state.success) {
      toast(`RSVP ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create RSVP" : "Update RSVP"}
      </h1>

      <InputField
        label="Event ID"
        name="event_id"
        defaultValue={data?.event_id}
        register={register}
        error={errors?.event_id}
      />

      <InputField
        label="Alumni ID"
        name="alumni_id"
        defaultValue={data?.alumni_id}
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
