"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DottedSeparator } from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { useConfirm } from "@/hooks/use-confirm";

import { useDeleteProject } from "../api/use-delete-project";
import { useUpdateProject } from "../api/use-update-project";

import { updateProjectSchema } from "../schemas";
import { Project } from "../types";

interface EditProjectFormProps {
  onCancel?: () => void;
  initialValues: Project;
}

export const EditProjectForm = ({
  onCancel,
  initialValues,
}: EditProjectFormProps) => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialValues.imageUrl ?? null,
  );

  const { mutateAsync: deleteProject, isPending: isDeletingProject } =
    useDeleteProject();
  const { mutateAsync: updateProject, isPending } = useUpdateProject();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Project",
    "Are you sure you want to delete this project? This action cannot be undone.",
    "destructive",
  );

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;

    deleteProject(
      { param: { projectId: initialValues.$id } },
      {
        onSuccess: () =>
          router.push(`/workspaces/${initialValues.workspaceId}`),
      },
    );
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    updateProject(
      { form: finalValues, param: { projectId: initialValues.$id } },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        form.setError("image", { message: "File size must be less than 1MB" });
        return;
      }
      form.setValue("image", file);
    }
  };

  useEffect(() => {
    const imageValue = form.watch("image");
    if (imageValue instanceof File) {
      const url = URL.createObjectURL(imageValue);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(imageValue || null);
    }
  }, [form.watch("image")]);

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row gap-x-4 items-center p-7 space-y-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={
              onCancel
                ? onCancel
                : () =>
                    router.push(
                      `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`,
                    )
            }
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-2">
                      <div className="flex gap-x-5 items-center">
                        {previewUrl ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={previewUrl}
                              alt="Logo"
                              className="object-cover"
                              fill
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-9 text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Project Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPEG, max 1MB
                          </p>
                          <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .svg"
                            className="hidden"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          {previewUrl ? (
                            <Button
                              type="button"
                              size="xs"
                              variant="destructive"
                              className="mt-2 w-fit"
                              onClick={() => {
                                field.onChange("");
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                              disabled={isPending}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              size="xs"
                              variant="tertiary"
                              className="mt-2 w-fit"
                              onClick={() => inputRef.current?.click()}
                              disabled={isPending}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DottedSeparator className="py-7" />
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button type="submit" size="lg" disabled={isPending}>
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a project is irreversible and will remove all associated
              data.
            </p>
            <DottedSeparator className="py-7" />
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="mt-6 ml-auto w-fit"
              disabled={isPending || isDeletingProject}
              onClick={handleDelete}
            >
              {isDeletingProject ? "Deleting..." : "Delete Project"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
