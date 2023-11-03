import type { Metadata } from "next";
import DashboardSidebar from "@/components/DashboardSidebar";
import { currentUser } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Gymbro - The only gym bro you will ever need.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <DashboardSidebar/>
      <main className="flex-1">{children}</main>
    </div>
  );
}
