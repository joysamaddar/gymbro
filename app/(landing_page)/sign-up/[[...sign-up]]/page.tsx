import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="-mt-[5vh]">
        <SignUp />
      </div>
    </div>
  );
}
