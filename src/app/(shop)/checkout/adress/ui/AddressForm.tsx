"use client";
import { deleteUserAddress, setUserAddress } from "@/actions";
import { Country } from "@/interfaces";
import { useAddressState } from "@/store";
import clsx from "clsx";
import { Address } from "cluster";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type InputForm = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
};

interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<InputForm>({
    defaultValues: {
      ...(userStoredAddress as any),
      rememberAddress: false,
    },
  });
  const { data: session } = useSession({
    required: true,
  });

  const setAddress = useAddressState((state) => state.setAddress);
  const address = useAddressState((state) => state.address);

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
  }, [address, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const { rememberAddress, ...rest } = data;

    setAddress(rest);

    if (rememberAddress) {
      await setUserAddress(rest, session!.user.id);
    } else {
      //todo eliminar direcccion
      await deleteUserAddress(session!.user.id);
    }
    router.push("/checkout");
  });

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-2">
        <span>Nombres</span>
        <input
          type="text"
          {...register("firstName", {
            required: { value: true, message: "campo requerido" },
          })}
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-red-500": errors.firstName,
          })}
        />
        {errors.firstName?.message && (
          <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Apellidos</span>
        <input
          type="text"
          {...register("lastName", {
            required: { value: true, message: "campo requerido" },
          })}
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-red-500": errors.lastName,
          })}
        />
        {errors.lastName?.message && (
          <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección</span>
        <input
          type="text"
          {...register("address", {
            required: { value: true, message: "campo requerido" },
          })}
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-red-500": errors.address,
          })}
        />
        {errors.address?.message && (
          <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
            {errors.address.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          {...register("address2", { required: false })}
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          type="text"
          {...register("postalCode", {
            required: { value: true, message: "campo requerido" },
          })}
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-red-500": errors.postalCode,
          })}
        />
        {errors.postalCode?.message && (
          <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
            {errors.postalCode.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad</span>
        <input
          type="text"
          {...register("city", {
            required: { value: true, message: "campo requerido" },
          })}
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-red-500": errors.city,
          })}
        />
        {errors.city?.message && (
          <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
            {errors.city.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2">
        <span>País</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          {...register("country", { required: true })}
        >
          <option value="">[ Seleccione ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono</span>
        <input
          type="text"
          {...register("phone", {
            required: {
              value: true,
              message: "campo requerido",
            },
          })}
          className={clsx("p-2 border rounded-md bg-gray-200", {
            "border-red-500": errors.phone,
          })}
        />
        {errors.phone?.message && (
          <span className=" font-medium tracking-wide text-red-500 text-xs ml-1">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mb-2 sm:mt-10">
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register("rememberAddress", { required: false })}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <p>Recordar Direccion?</p>
        </div>

        <button
          disabled={!isValid}
          className={clsx("cursor-pointer", {
            "btn-primary": isValid,
            "btn-disabled": !isValid,
          })}
          type="submit"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
