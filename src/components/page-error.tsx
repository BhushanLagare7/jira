import { AlertTriangleIcon } from "lucide-react";

interface PageErrorProps {
  message?: string;
}

export const PageError = ({
  message = "Something went wrong",
}: PageErrorProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <AlertTriangleIcon className="mb-2 size-6 text-muted-foreground" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
};
