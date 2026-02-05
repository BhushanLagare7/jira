import Link from "next/link";
import { redirect } from "next/navigation";

import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getCurrent } from "@/features/auth/queries";

import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { getProject } from "@/features/projects/queries";

import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";

interface ProjectIdPageProps {
  params: Promise<{ projectId: string }>;
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const { projectId } = await params;

  const user = await getCurrent();

  if (!user) return redirect("/sign-in");

  const initialValues = await getProject({ projectId });

  if (!initialValues) throw new Error("Project not found");

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <ProjectAvatar
            className="size-8"
            name={initialValues.name}
            image={initialValues.imageUrl}
          />
          <p className="text-lg font-semibold">{initialValues.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <PencilIcon className="mr-2 size-4" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher hideProjectFilter />
    </div>
  );
};

export default ProjectIdPage;
