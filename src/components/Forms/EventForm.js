"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { eventSchema } from "@/lib/formValidationSchemas"; // Event validation schema
import { createEvent, updateEvent } from "@/lib/actions"; // Import the actions for create and update
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const EventForm = ({ type, data, setOpen, relatedData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createEvent : (data) => updateEvent(data.id, data), // Pass `id` for updates
    {
      success: false,
      error: false,
    }
);


const onSubmit = handleSubmit(async (formData) => {
  const formattedData = {
    id: formData.id || undefined, // Only include `id` if updating
    title: formData.title || "",
    description: formData.description || "",
    date: formData.date ? new Date(formData.date).toISOString() : "", // Ensure correct date format
    time: formData.time || "",
    location: formData.location || "",
    organizer: formData.organizer || "",
    attendees: formData.attendees ? Number(formData.attendees) : null, // Convert to number
    image: formData.image || null, // Default to null if empty
    rsvpId: formData.rsvpId || null, // Add rsvpId if needed
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


  
  
  

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Event has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  // Ensure `rsvps` is defined and is an array before trying to map over it
  const { rsvps = [] } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new event" : "Update the event"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">

        <InputField
          label="Event title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
        <InputField
          label="Date"
          name="date"
          defaultValue={data?.date}
          register={register}
          error={errors?.date}
          type="date"
        />
        <InputField
          label="Time"
          name="time"
          defaultValue={data?.time}
          register={register}
          error={errors?.time}
          type="time"
        />
        <InputField
          label="Location"
          name="location"
          defaultValue={data?.location}
          register={register}
          error={errors?.location}
        />
        <InputField
          label="Organizer"
          name="organizer"
          defaultValue={data?.organizer}
          register={register}
          error={errors?.organizer}
        />
        <InputField
          label="Attendees"
          name="attendees"
          defaultValue={data?.attendees}
          register={register}
          error={errors?.attendees}
        />
        <InputField
          label="Event Image URL"
          name="image"
          defaultValue={data?.image}
          register={register}
          error={errors?.image}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">RSVPs</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("rsvpId")}
            defaultValue={data?.rsvpId}
          >
           {rsvps.length > 0 ? (
            rsvps.map((rsvp) => (
              <option value={rsvp.id} key={rsvp.id}>
                {rsvp.alumni?.name || "Unknown"} {/* Use alumni's name */}
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
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default EventForm;