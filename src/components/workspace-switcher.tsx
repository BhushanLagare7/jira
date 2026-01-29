"use client";

import { useRouter } from "next/navigation";

import { RiAddCircleFill } from "react-icons/ri";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

export const WorkspaceSwitcher = () => {
  const currentWorkspaceId = useWorkspaceId();
  const router = useRouter();
  const { data: workspaces } = useWorkspaces();
  const { open } = useCreateWorkspaceModal();

  const handleSelectWorkspace = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          className="transition cursor-pointer text-neutral-500 size-5 hover:opacity-75"
          onClick={open}
        />
      </div>
      <Select onValueChange={handleSelectWorkspace} value={currentWorkspaceId}>
        <SelectTrigger className="p-1 w-full font-medium bg-neutral-200">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex gap-3 justify-start items-center font-medium">
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.imageUrl}
                />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
