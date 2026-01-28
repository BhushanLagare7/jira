"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="p-4 mx-auto max-w-screen-2xl">
        <nav className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image src="/logo.svg" alt="Logo" height={56} width={56} />
            <h1 className="text-3xl font-semibold text-blue-700">Jira</h1>
          </div>
          <Button variant="secondary" asChild>
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col justify-center items-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
