// app/components/auth-wrapper.tsx

"use client";

// ** import components
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/Providers";

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <main className="w-full">
        <Header />
        <div>{children}</div>
        <Toaster richColors position="top-center" visibleToasts={1} />
      </main>
    </QueryProvider>
  );
};

export default WrapperLayout;
