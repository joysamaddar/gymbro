import Heading from "@/components/common/Heading";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { trpc } from "@/trpc/rsc-client";

export default async function Workouts() {
  let profile;
  try {
    profile = await trpc.getProfile();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <Heading title="Edit Profile" />
      <ProfileForm profile={profile} />
    </div>
  );
}
