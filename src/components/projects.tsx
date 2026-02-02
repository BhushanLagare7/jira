"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { RiAddCircleFill } from "react-icons/ri";

import { cn } from "@/lib/utils";

import { useGetProjects } from "@/features/projects/api/use-get-projects";

import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const Projects = () => {
  const projectId = null; // TODO: Use "useProjectId" hook
  const pathname = usePathname();
  const { open } = useCreateProjectModal();
  const workspaceId = useWorkspaceId();
  const { data: projects } = useGetProjects({ workspaceId });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          className="transition cursor-pointer text-neutral-500 size-5 hover:opacity-75"
          onClick={() => open()}
        />
      </div>
      {projects?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${projectId}`;
        const isActive = pathname === href;

        return (
          <Link key={project.$id} href={href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary",
              )}
            >
              <ProjectAvatar name={project.name} image={project.imageUrl} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
