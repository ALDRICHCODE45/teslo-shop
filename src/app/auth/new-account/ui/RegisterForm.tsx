"use client";
import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

export function RegisterForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = handleSubmit(async (data) => {
    const { name, email, password } = data;
    const resp = await registerUser({ name, email, password });

    if (!resp.ok) {
      toast.error(resp.msg);
      return;
    }

    toast.success("usuario creado");
    await login({ email, password });
    window.location.replace("/");
  });

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col">
        <label htmlFor="text">Nombre completo</label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded  ", {
            "border-red-500": !!errors.name,
          })}
          type="name"
          {...register("name", {
            required: {
              value: true,
              message: "name is required",
            },
          })}
        />
        {errors.name?.message && (
          <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
            {errors.name.message}
          </span>
        )}

        <label className="mt-5" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded  ", {
            "border-red-500": !!errors.email,
          })}
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "email is required",
            },
          })}
        />
        {errors.email?.message && (
          <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
            {errors.email.message}
          </span>
        )}

        <label className="mt-5" htmlFor="email">
          Contraseña
        </label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded ", {
            "border-red-500": !!errors.password,
          })}
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "password required",
            },
            minLength: {
              value: 6,
              message: "password must have 6 characters at least",
            },
          })}
        />
        {errors.password?.message && (
          <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
            {errors.password.message}
          </span>
        )}

        <button className="btn-primary mt-5">Crear cuenta</button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Ingresar
        </Link>
      </form>
    </>
  );
}
