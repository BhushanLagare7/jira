import Link from "next/link";
import Image from "next/image";

import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";

export const Sidebar = () => {
  return (
    <aside className="p-4 w-full h-full bg-neutral-100">
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="Logo" height={48} width={48} />
        <h2 className="text-2xl font-semibold text-blue-700">Jira</h2>
      </Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};
