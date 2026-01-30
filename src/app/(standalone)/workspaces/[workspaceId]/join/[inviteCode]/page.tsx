import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceInfo } from "@/features/workspaces/queries";

import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";

interface WorkspaceIdJoinPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const user = await getCurrent();

  if (!user) return redirect("/sign-in");

  const { workspaceId } = await params;

  const initialValues = await getWorkspaceInfo({ workspaceId });

  if (!initialValues) return redirect("/");

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdJoinPage;
