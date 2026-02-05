import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import { TaskIdClient } from "./client";

const WorkspaceIdTaskIdPage = async () => {
  const user = await getCurrent();

  if (!user) return redirect("/sign-in");

  return <TaskIdClient />;
};

export default WorkspaceIdTaskIdPage;
