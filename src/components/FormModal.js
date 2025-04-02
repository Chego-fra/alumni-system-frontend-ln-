"use client"
import { deleteAlumni,  } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const deleteActionMap = {
  alumni: deleteAlumni,
};

const dynamicImport = (path) =>
  dynamic(() => import(`./Forms/${path}Form`), {
    loading: () => <h1>Loading...</h1>,
  });

const forms = {
  alumni: dynamicImport("Alumni"),
};

const FormModal = ({ table, type, data, id, relatedData }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create" ? "bg-yellow" : type === "update" ? "bg-sky" : "bg-purple";

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    useEffect(() => {
      if (state.success) {
        toast(`${table.charAt(0).toUpperCase() + table.slice(1)} has been deleted`);
        setOpen(false);
        router.refresh();
      }
    }, [state]);

    if (type === "delete" && id) {
      return (
        <form action={formAction} className="p-4 flex flex-col gap-4">
          <input type="hidden" name="id" value={id} />
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        </form>
      );
    }

    if (type === "create" || type === "update") {
      const DynamicForm = forms[table];
      return <DynamicForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />;
    }

    return "Form Not Found";
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>

      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
