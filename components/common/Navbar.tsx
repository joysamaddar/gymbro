import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GoToDashboard from "@/components/ui/go-to-dashboard";

export default async function Navbar() {
  return (
    <div className="w-full flex items-center justify-between px-4 h-[10vh] container mx-auto">
      <h1 className="font-semibold">
        <Link href={"/"}>Gymbro AI</Link>
      </h1>
      <SignedIn>
        <div className="flex items-center gap-4">
          <GoToDashboard />
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
      <SignedOut>
        <Link href={"/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      </SignedOut>
    </div>
  );
}
