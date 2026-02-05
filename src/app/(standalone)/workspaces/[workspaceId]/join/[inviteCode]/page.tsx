import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import JoinWorkspaceClient from "./client";

const WorkspaceIdJoinPage = async () => {
  const user = await getCurrent();

  if (!user) return redirect("/sign-in");

  return <JoinWorkspaceClient />;
};

export default WorkspaceIdJoinPage;
