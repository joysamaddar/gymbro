"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { Dumbbell, Home, Utensils } from "lucide-react";

export default function DashboardSidebar() {
  const path = usePathname();
  const { user, isLoaded } = useUser();

  return (
    <aside className="sticky top-0 h-screen bg-zinc-950 border-r border-r-zinc-900 rounded-md sm:px-4 py-8 w-[14%] sm:w-[25%] lg:w-[17%] flex flex-col justify-between items-center sm:items-stretch">
      <h1 className="font-semibold hidden items-center justify-center px-4 sm:flex">
        <Link href={"/"}>Gymbro AI</Link>
      </h1>
      <div className="flex flex-col gap-2">
        <Link href={"/dashboard"}>
          <Button
            variant="ghost"
            className={cn(
              "w-full sm:justify-start bg-transparent hover:bg-zinc-800 gap-2",
              path == "/dashboard" && "bg-zinc-900"
            )}
          >
            <Home className="w-5"/><p className="hidden sm:block">Home</p>
          </Button>
        </Link>
        <Link href={"/dashboard/workouts"}>
          <Button
            variant="ghost"
            className={cn(
              "w-full sm:justify-start bg-transparent hover:bg-zinc-800 gap-2",
              path == "/dashboard/workouts" && "bg-zinc-900"
            )}
          >
             <Dumbbell className="w-5"/><p className="hidden sm:block">Workouts</p>
          </Button>
        </Link>
        <Link href={"/dashboard/meals"}>
          <Button
            variant="ghost"
            className={cn(
              "w-full sm:justify-start bg-transparent hover:bg-zinc-800 gap-2",
              path == "/dashboard/meals" && "bg-zinc-900"
            )}
          >
            <Utensils className="w-5"/><p className="hidden sm:block">Meals</p>
          </Button>
        </Link>
      </div>
      {isLoaded ? (
        <div className="flex gap-4 items-center sm:px-4">
          <UserButton afterSignOutUrl="/" />
          <p className="hidden sm:block">{user?.firstName}</p>
        </div>
      ) : (
        <div className="flex gap-4 items-center sm:px-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 flex-1 hidden sm:block" />
        </div>
      )}
    </aside>
  );
}
