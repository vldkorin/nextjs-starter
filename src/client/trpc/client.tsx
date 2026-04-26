"use client";

import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";

import { TRPC_API_ENDPOINT } from "./constants";
import { makeQueryClient } from "./query-client";
import { TRPCProvider } from "./utils";

import type { AppRouter } from "@/src/server/trpc/router";

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};

const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() => {
    return createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: TRPC_API_ENDPOINT,
          transformer: superjson
        })
      ]
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};

export { TrpcProvider };
