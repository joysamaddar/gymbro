import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { cn } from "@/lib/utils";
import TrpcClientProvider from "@/components/providers/TrpcClientProvider";
import { Toaster } from "@/components/ui/toaster";

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
          <body className={cn(inter.className)}>
            {children}
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </TrpcClientProvider>
  );
}
