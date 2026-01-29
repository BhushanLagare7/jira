import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

interface WorkspaceAvatarProps {
  name: string;
  image?: string;
  className?: string;
}

export const WorkspaceAvatar = ({
  image,
  name,
  className,
}: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("overflow-hidden relative rounded-md size-10", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("rounded-md size-10", className)}>
      <AvatarFallback className="text-lg font-semibold text-white uppercase bg-blue-600 rounded-md">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
