"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
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

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useCreateProject } from "../api/use-create-project";

import { createProjectSchema } from "../schemas";

type FormValues = z.infer<typeof createProjectSchema>;

interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutateAsync: createProject, isPending } = useCreateProject();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      workspaceId,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    await createProject(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
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

  const image = form.watch("image");

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(image || null);
    }
  }, [image]);

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new project
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
                {isPending ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
