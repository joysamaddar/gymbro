"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";

export default function UserInfo() {
  const { user, isLoaded } = useUser();
  return (
    <>
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
    </>
  );
}
