import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Loading...</p>
      </div>
    </div>
  );
}
