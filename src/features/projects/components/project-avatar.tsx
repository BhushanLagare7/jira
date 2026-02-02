import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

interface ProjectAvatarProps {
  name: string;
  image?: string;
  className?: string;
  fallbackClassName?: string;
}

export const ProjectAvatar = ({
  image,
  name,
  className,
  fallbackClassName,
}: ProjectAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("overflow-hidden relative rounded-md size-5", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("rounded-md size-5", className)}>
      <AvatarFallback
        className={cn(
          "text-sm font-semibold text-white uppercase bg-blue-600 rounded-md",
          fallbackClassName,
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
