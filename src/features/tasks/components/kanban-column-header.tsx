import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";

import { snakeCaseToTitleCase } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { TaskStatus } from "../types";

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
  [TaskStatus.TODO]: <CircleIcon className="size-[18px] text-red-400" />,
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  ),
};

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

export const KanbanColumnHeader = ({
  board,
  taskCount,
}: KanbanColumnHeaderProps) => {
  const { open } = useCreateTaskModal();
  const icon = statusIconMap[board];

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex gap-x-2 items-center">
        {icon}
        <h2 className="text-sm font-medium">{snakeCaseToTitleCase(board)}</h2>
        <div className="flex justify-center items-center text-xs font-medium rounded-md text-neutral-700 size-5 bg-neutral-200">
          {taskCount}
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="size-5"
        onClick={open}
        aria-label="Add task"
      >
        <PlusIcon className="size-4 text-neutral-500" />
      </Button>
    </div>
  );
};
