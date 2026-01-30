import Image from "next/image";
import Link from "next/link";

import { UserButton } from "@/features/auth/components/user-button";

interface StandaloneLayoutProps {
  children: React.ReactNode;
}

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="p-4 mx-auto max-w-screen-2xl">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/" className="flex gap-2 items-center">
            <Image src="/logo.svg" alt="Logo" height={56} width={56} />
            <h2 className="text-3xl font-semibold text-blue-700">Jira</h2>
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col justify-center items-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
