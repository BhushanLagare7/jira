import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

interface WorkspaceIdPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdPage = async ({ params }: WorkspaceIdPageProps) => {
  const { workspaceId } = await params;

  const user = await getCurrent();

  if (!user) return redirect("/sign-in");

  return <div>WorkspaceIdPage {workspaceId}</div>;
};

export default WorkspaceIdPage;
