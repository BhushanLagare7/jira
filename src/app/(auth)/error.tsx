"use client";

import Link from "next/link";

import { AlertTriangleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center h-screen">
      <AlertTriangleIcon className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong</p>
      <Button variant="secondary" size="sm" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
