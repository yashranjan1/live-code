
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner"

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import TopNav from "@/components/TopNav";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <div className="grid grid-rows-[auto_1fr] min-h-screen mx-48 py-8 lg:mx-64 max-h-screen gap-10">
            <TopNav />
            <main className="flex flex-col justify-center items-center">
              {children}
            </main>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
