"use client"; // This ensures the component is rendered on the client side

import React, { useState } from "react";

// ** import third party package
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children, ...props }) => {
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
      }),
  );
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="7hills-theme"
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
