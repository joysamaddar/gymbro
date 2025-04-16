import Navbar from "@/components/common/Navbar";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <>{children}</>
    </>
  );
}
