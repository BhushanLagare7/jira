import { LoaderIcon } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <LoaderIcon className="animate-spin size-6 text-muted-foreground" />
    </div>
  );
};
