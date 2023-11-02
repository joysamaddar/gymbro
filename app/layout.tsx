import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import TrpcClientProvider from "@/components/TrpcClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gymbro",
  description: "The only gym bro you will ever need.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrpcClientProvider>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "hsl(0 72.2% 50.6%)",
          },
        }}
      >
        <html lang="en" className="dark">
          <body
            className={cn(
              inter.className,
              "mx-auto w-full max-w-screen-xl px-2.5 md:px-20"
            )}
          >
            <Navbar />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </TrpcClientProvider>
  );
}
