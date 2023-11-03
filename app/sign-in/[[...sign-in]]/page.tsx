import Navbar from "@/components/Navbar";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <SignIn />
      </div>
    </>
  );
}
