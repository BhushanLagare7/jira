import { MoreHorizontalIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { Task } from "../types";

import { TaskActions } from "./task-actions";
import { TaskDate } from "./task-date";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="p-2.5 mb-1.5 bg-white rounded shadow-sm space-y-3">
      <div className="flex gap-x-2 justify-between items-start">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontalIcon className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
        </TaskActions>
      </div>
      <DottedSeparator />
      <div className="flex gap-x-1.5 items-center">
        <MemberAvatar
          name={task.assignee.name}
          fallbackClassName="text-[10px]"
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          fallbackClassName="text-[10px]"
        />
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
};
