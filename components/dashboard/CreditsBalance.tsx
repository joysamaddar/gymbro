import Link from "next/link";
import { Plus } from "lucide-react";
import { CardContent } from "../ui/card";
import { trpc } from "@/trpc/rsc-client";

export default async function CreditsBalance() {
  try {
    const credits = await trpc.getUserCredit();
    return (
      <div className="flex flex-col sm:flex-row sm:gap-4 items-center justify-between -mx-4 -mb-4 border-t border-primary/20 bg-gradient-to-tr from-background to-primary/5 text-primary">
        <p className="font-medium p-4">
          {credits ?? 0} <span className="hidden sm:inline">credits</span>
        </p>
        <Link
          href={`/purchase`}
          className="w-full sm:w-auto sm:h-full aspect-square"
        >
          <CardContent className="h-full bg-primary/20 hover:bg-primary/30 transition-all ease-in duration-300 shrink-0 cursor-pointer flex items-center justify-center p-0">
            <Plus className="w-4 h-4" />
          </CardContent>
        </Link>
      </div>
    );
  } catch (error) {
    return <></>;
  }
}
