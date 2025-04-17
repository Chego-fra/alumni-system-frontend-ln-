"use client";
import { deleteAlumni, deleteEvent, deleteUser, deleteCareer, deleteGallery, deleteResource, deleteRSVP  } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

// Dynamic imports for form components
const EventForm = dynamic(() => import("./Forms/EventForm"), {
  loading: () => <h1>Loading...</h1>,
});
const UserForm  = dynamic(() => import("./Forms/UserForm"), {
  loading: () => <h1>Loading...</h1>,
});

const CareerForm  = dynamic(() => import("./Forms/CareerForm"), {
  loading: () => <h1>Loading...</h1>,
});
const GalleryForm  = dynamic(() => import("./Forms/GalleryForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ResourceForm  = dynamic(() => import("./Forms/ResourceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const RsvpForm  = dynamic(() => import("./Forms/RsvpForm"), {
  loading: () => <h1>Loading...</h1>,
});

// Map delete actions to table types
const deleteActionMap = {
  event: deleteEvent,
  user: deleteUser,
  career: deleteCareer,
  gallery: deleteGallery ,
  resource: deleteResource,
  rsvp: deleteRSVP,
};

// Forms mapping
const forms = {
  event: (setOpen, type, data, relatedData) => (
    <EventForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  user: (setOpen, type, data, relatedData) => (
    <UserForm type={type} data={data} setOpen={setOpen} elatedData={relatedData}/>
  ),
  career: (setOpen, type, data, relatedData) => (
    <CareerForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  gallery: (setOpen, type, data, relatedData) => (
    <GalleryForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  resource: (setOpen, type, data, relatedData) => (
    <ResourceForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  rsvp: (setOpen, type, data, relatedData) => (
    <RsvpForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
};

const FormModal = ({ table, type, data, id, relatedData }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-yellow"
      : type === "update"
      ? "bg-sky"
      : "bg-purple";

  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Ensure delete function exists
  const deleteAction = deleteActionMap[table] || (() => Promise.resolve({ success: false }));

  const [state, formAction] = useFormState(deleteAction, { success: false, error: false });

  useEffect(() => {
    console.log("State:", state); // Debugging
    if (state?.success) {
      toast(`${table.charAt(0).toUpperCase() + table.slice(1)} has been deleted`);
      setOpen(false);
      router.refresh();
    }
  }, [state, table, router]);

  const Form = () => {
    // Delete form
    if (type === "delete" && id) {
      return (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await deleteAction(id); // pass raw ID
            if (result.success) {
              toast(`${table.charAt(0).toUpperCase() + table.slice(1)} has been deleted`);
              setOpen(false);
              router.refresh();
            }
          }}
          className="p-4 flex flex-col gap-4"
        >
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        </form>
      );
    }

    // Create or update form
    return forms[table] ? forms[table](setOpen, type, data, relatedData) : <p>Form Not Found</p>;
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt={`${type}`} width={16} height={16} />
      </button>

      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
              <Image src="/close.png" alt="Close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
