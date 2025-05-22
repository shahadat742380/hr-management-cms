import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/providers/Providers";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Employee Management System",
  description: "A comprehensive system for managing employee data and records",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased `}>
        <QueryProvider>
          {children}
          </QueryProvider>
      </body>
    </html>
  );
}
