"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Dumbbell, Home, User, Utensils } from "lucide-react";

export default function DashboardSidebar() {
  const path = usePathname();
  const { user, isLoaded } = useUser();

  return (
    <aside className="sticky top-0 h-screen bg-background border-r border-r-border rounded-md sm:px-4 py-4 w-[14%] sm:w-[25%] lg:w-[17%] flex flex-col justify-between items-center sm:items-stretch">
      <div className="flex flex-col gap-2">
        <div className="hidden sm:flex items-center justify-center p-4 font-semibold">
          <Link href={"/"}>Gymbro AI</Link>
        </div>
        <Link href={"/dashboard"}>
          <Button
            variant="ghost"
            className={cn(
              "w-full sm:justify-start bg-transparent hover:bg-accent/50 gap-2",
              path == "/dashboard" && "bg-accent"
            )}
          >
            <Home className="w-5" />
            <p className="hidden sm:block">Home</p>
          </Button>
        </Link>
        <Link href={"/dashboard/profile"}>
          <Button
            variant="ghost"
            className={cn(
              "w-full sm:justify-start bg-transparent hover:bg-accent/50 gap-2",
              path == "/dashboard/profile" && "bg-accent"
            )}
          >
            <User className="w-5" />
            <p className="hidden sm:block">Profile</p>
          </Button>
        </Link>
        <Link href={"/dashboard/workouts"}>
          <Button
            variant="ghost"
            className={cn(
              "w-full sm:justify-start bg-transparent hover:bg-accent/50 gap-2",
              path == "/dashboard/workouts" && "bg-accent"
            )}
          >
            <Dumbbell className="w-5" />
            <p className="hidden sm:block">Workouts</p>
          </Button>
        </Link>
        <Link href={"/dashboard/meals"}>
          <Button
            variant="ghost"
            className={cn(
              "w-full sm:justify-start bg-transparent hover:bg-accent/50 gap-2",
              path == "/dashboard/meals" && "bg-accent"
            )}
          >
            <Utensils className="w-5" />
            <p className="hidden sm:block">Meals</p>
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
