import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "Task name is required"),
  status: z.nativeEnum(TaskStatus),
  workspaceId: z.string().min(1, "Workspace is required"),
  projectId: z.string().min(1, "Project is required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().min(1, "Assignee is required"),
  description: z.string().optional(),
});
