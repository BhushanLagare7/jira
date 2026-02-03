import { LoaderIcon } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <LoaderIcon className="animate-spin size-6 text-muted-foreground" />
    </div>
  );
}
