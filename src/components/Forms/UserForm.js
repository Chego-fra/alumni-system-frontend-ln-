"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema } from "@/lib/formValidationSchemas"; // Create this schema based on your needs
import { createUser, updateUser } from "@/lib/actions"; // Your user action handlers
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const UserForm = ({ type, data, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: data?.attributes || {}, 
  });

  const [state, setState] = useState({ success: false, error: false, loading: false });
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    setState((prev) => ({ ...prev, loading: true }));

    const formattedData = {
      id: formData.id || undefined,
      name: formData.name || "",
      email: formData.email || "",
      role: formData.role || "alumni",
      is_verified: formData.is_verified === "true",
      summary: formData.summary || "",
      ...(type === "create" && { password: formData.password || "password123" })

    };

    let result;
    try {
      result = type === "create"
        ? await createUser(formattedData)
        : await updateUser(data.id, formattedData);

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
        {type === "create" ? "Create a new user" : "Update user"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="ID"
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
          label="Email"
          name="email"
          defaultValue={data?.attributes?.email}
          register={register}
          error={errors?.email}
          type="email"
        />
        <InputField
          label="Role"
          name="role"
          defaultValue={data?.attributes?.role}
          register={register}
          error={errors?.role}
        />
        <InputField
          label="Summary"
          name="summary"
          defaultValue={data?.attributes?.summary}
          register={register}
          error={errors?.summary}
        />
        {type === "create" && (
          <InputField
            label="Password"
            name="password"
            register={register}
            error={errors?.password}
            type="password"
          />
        )}

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Is Verified</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("is_verified")}
            defaultValue={data?.attributes?.is_verified ? "true" : "false"}
          >
            <option value="true">Verified</option>
            <option value="false">Not Verified</option>
          </select>
          {errors.is_verified?.message && (
            <p className="text-xs text-red-400">
              {errors.is_verified.message.toString()}
            </p>
          )}
        </div>
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

export default UserForm;
