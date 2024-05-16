"use client";
import { updateProfile } from "@/actions/profile/update-profile";
import clsx from "clsx";
import { useEffect, useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface EditProfileFormProps {
  name: string;
  email: string;
  userId: string;
}

interface InputForms {
  name: string;
  email: string;
}

export function EditProfileForm({
  name,
  email,
  userId,
}: EditProfileFormProps): ReactElement {
  const [loaded, setLoaded] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputForms>({
    defaultValues: {
      name,
      email,
    },
  });

  useEffect(() => {
    setLoaded(true);
  }, [loaded, setLoaded]);

  if (!loaded) {
    return (
      <div className="w-full h-svh text-center">
        <div className="h-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  const onSubmit = handleSubmit(async (data) => {
    if (data.name === name && data.email === email) {
      toast.error("no puedes usar tu informacion anterior");
      return;
    }
    const objectToSend = {
      ...data,
      userId,
    };

    const { ok } = await updateProfile(objectToSend);
    if (!ok) {
      toast.error("no se pudo actualizar el usuario");
      return;
    }
    toast.success("usuario actualizado");
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="container w-full px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-lg">
                  Hola {name}
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
              </div>
            </div>
            <div className=" rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 className=" text-lg font-medium title-font mb-5">
                Editar Perfil
              </h2>
              <div className="relative mb-4">
                <label htmlFor="full-name" className="leading-7 text-sm">
                  Nombre
                </label>
                <input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "name is required",
                    },
                    minLength: {
                      value: 4,
                      message: "name must have 4 characters at least",
                    },
                  })}
                  type="text"
                  className={clsx(
                    "w-full bg-gray-200 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
                    {
                      "border-red-600": errors.name?.message,
                    }
                  )}
                />
                {errors.name?.message && (
                  <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm ">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email is required",
                    },
                  })}
                  type="email"
                  className={clsx(
                    "w-full bg-gray-200 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
                    {
                      "border-red-600": errors.email?.message,
                    }
                  )}
                />
                {errors.email?.message && (
                  <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="text-white btn-primary border-0 py-2 px-8 focus:outline-none rounded text-lg"
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
