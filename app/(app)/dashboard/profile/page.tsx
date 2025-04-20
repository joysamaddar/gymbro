import Heading from "@/components/common/Heading";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <Heading title="Profile">
        <Link href={"./profile/edit"}>
          <Button variant={"outline"}>Edit Profile</Button>
        </Link>
      </Heading>
      <ProfileInfo />
    </div>
  );
}
