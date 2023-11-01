"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

export default function GoToDashboard() {
  const pathname = usePathname();

  if (pathname == "/") {
    return (
      <Link href={"/dashboard"}>
        <Button variant={"outline"}>Go to dashboard</Button>
      </Link>
    );
  } else {
    <></>;
  }
}
