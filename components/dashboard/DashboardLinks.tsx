"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Dumbbell, Home, User, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardLinks() {
  const path = usePathname();

  return (
    <>
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
    </>
  );
}
