import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex w-full items-center justify-center h-[90vh]">
        <h1 className="font-extrabold text-6xl -mt-[5vh]">
          The best gym bro you can get!
        </h1>
      </main>
    </>
  );
}
