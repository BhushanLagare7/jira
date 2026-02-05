import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";

const WorkspaceIdTasksPage = async () => {
  const user = await getCurrent();

  if (!user) return redirect("/sign-in");

  return (
    <div className="flex flex-col h-full">
      <TaskViewSwitcher />
    </div>
  );
};

export default WorkspaceIdTasksPage;
