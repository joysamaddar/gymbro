import { parseGender } from "@/lib/utils";
import { trpc } from "@/trpc/rsc-client";

export async function ProfileInfo() {
  try {
    const profile = await trpc.getProfile();

    if (!profile) {
      return <div>No profile found.</div>;
    }

    return (
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-sm font-medium leading-none">Gender</h2>
          <p className="text-sm">{parseGender(profile.gender)}</p>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-medium leading-none">Age</h2>
          <p className="text-sm">
            {profile.age ? `${profile.age} years old` : "Not set"}
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-medium leading-none">Height</h2>
          <p className="text-sm">
            {profile.height ? `${profile.height} cm` : "Not set"}
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-medium leading-none">Disabilities</h2>
          <p className="text-sm">{profile.disabilities ?? "-"}</p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p className="font-bold">Error loading profile:</p>
        <p>{(error as Error).message ?? "An unexpected error occurred."}</p>
      </div>
    );
  }
}
