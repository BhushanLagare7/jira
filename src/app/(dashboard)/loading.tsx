import { Loader } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader className="animate-spin size-6 text-muted-foreground" />
    </div>
  );
};

export default DashboardLoading;
