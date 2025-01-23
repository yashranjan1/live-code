"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {

    const queryClient = new QueryClient();
    
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={true}
            >
                <SessionProvider>
                    <TRPCReactProvider>
                        {children}
                    </TRPCReactProvider>
                </SessionProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}