import Link from "next/link";
import CreditsBalance from "../dashboard/CreditsBalance";
import DashboardLinks from "../dashboard/DashboardLinks";
import UserInfo from "../dashboard/UserInfo";

export default function DashboardSidebar() {
  return (
    <aside className="sticky top-0 h-screen bg-background border-r border-r-border rounded-md sm:px-4 py-4 w-[14%] sm:w-[25%] lg:w-[17%] flex flex-col justify-between items-center sm:items-stretch">
      <div className="flex flex-col gap-2">
        <div className="hidden sm:flex items-center justify-center p-4 font-semibold">
          <Link href={"/"}>Gymbro AI</Link>
        </div>
        <DashboardLinks />
      </div>
      <div className="flex flex-col gap-4">
        <UserInfo />
        <CreditsBalance />
      </div>
    </aside>
  );
}
