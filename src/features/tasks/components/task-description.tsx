"use client";

import { useState } from "react";

import { PencilIcon, XIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateTask } from "../api/use-update-task";

import { Task } from "../types";

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);

  const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTask();

  const handleSave = async () => {
    await updateTask({ param: { taskId: task.$id }, json: { description } });
    setIsEditing(false);
  };

  return (
    <div className="p-4 rounded-lg border">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Overview</p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <XIcon className="mr-2 size-4" />
          ) : (
            <PencilIcon className="mr-2 size-4" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      <div className="flex flex-col gap-y-4">
        {isEditing ? (
          <div className="flex flex-col gap-y-2">
            <Textarea
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={isUpdating}
            />
            <Button
              className="ml-auto w-fit"
              size="sm"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </div>
        ) : (
          <div>
            {task.description || (
              <span className="text-muted-foreground">No description set</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
