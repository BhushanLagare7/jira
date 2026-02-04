import { useRouter } from "next/navigation";

import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useConfirm } from "@/hooks/use-confirm";

import { useDeleteTask } from "../api/use-delete-task";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { open: openEditTaskModal } = useEditTaskModal();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure you want to delete this task? This action cannot be undone.",
    "destructive",
  );

  const { mutateAsync: deleteTask, isPending: isDeletingTask } =
    useDeleteTask();

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    await deleteTask({ param: { taskId: id } });
  };

  const openTaskDetails = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const openProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <>
      <ConfirmDialog />
      <div className="flex justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={openTaskDetails}
              className="font-medium p-[10px]"
            >
              <ExternalLinkIcon className="mr-2 stroke-2 size-4" />
              Task Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={openProject}
              className="font-medium p-[10px]"
            >
              <ExternalLinkIcon className="mr-2 stroke-2 size-4" />
              Open Project
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openEditTaskModal(id)}
              className="font-medium p-[10px]"
            >
              <PencilIcon className="mr-2 stroke-2 size-4" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              disabled={isDeletingTask}
              className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            >
              <TrashIcon className="mr-2 stroke-2 size-4" />
              {isDeletingTask ? "Deleting..." : "Delete Task"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
