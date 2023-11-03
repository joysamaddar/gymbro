import Navbar from "@/components/Navbar";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <SignUp />
      </div>
    </>
  );
}
