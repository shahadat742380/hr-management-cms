/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // This ensures the component is rendered on the client side

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { IcoSidebarLogo } from "@/assets/icons/ico-sidebar-logo";

// ** import third party package
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  const [colorLoaded, setColorLoaded] = useState(false);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    // Simulate async localStorage read (for SSR/CSR consistency)
    const loadColor = () => {
      localStorage.getItem("primaryBrandColor");
      setColorLoaded(true);
    };
    loadColor();
  }, []);

  if (!colorLoaded) {
    // Skeleton loader with header and body
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <header className="sticky top-0 z-40 w-full shadow-xl">
          <div className="bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary">
            <div className="container mx-auto section-padding flex items-center justify-between py-2 md:py-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 lg:hidden" />
                <IcoSidebarLogo style={{ opacity: 0.3 }} />
              </div>
              <nav className="hidden lg:block ">
                <ul className="flex items-center gap-4">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-center">
                      <Skeleton className="h-8 w-24" />
                      {i < 3 && (
                        <span
                          className="ml-4 h-6 w-px bg-primary-foreground/40"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div
                className="flex items-center justify-end gap-4"
                aria-label="User controls"
              >
                <div className="text-right space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        </header>
        {/* Body Skeleton */}
        <main className="container mx-auto section-padding mt-8 space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-64 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-40 w-1/2" />
            <Skeleton className="h-40 w-1/2" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="hr-management-theme"
      themes={["light", "dark", "system"]}
    >
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <Provider>{children}</Provider>
        </NuqsAdapter>
      </QueryClientProvider>
    </NextThemesProvider>
  );
};

export default QueryProvider;
