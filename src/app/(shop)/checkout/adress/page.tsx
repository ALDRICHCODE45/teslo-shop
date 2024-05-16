import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

export interface pageProps {}

export default async function Adress({}: pageProps) {
  const session = await auth();
  const countries = await getCountries();
  const userStoredAddress =
    (await getUserAddress(session!.user.id)) ?? undefined;
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subTitle="Dirección de entrega" />
        <AddressForm
          countries={countries}
          userStoredAddress={userStoredAddress}
        />
      </div>
    </div>
  );
}
