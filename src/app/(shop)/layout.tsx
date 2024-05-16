import { TopMenu, Sidebar, Footer } from "@/components";
import { ToasterProvider } from "@/providers/ToasterProvider";

export interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <main className="min-h-screen">
      <ToasterProvider />
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
