import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  value: number;
  variant: "up" | "down";
  increaseValue: number;
}

export const AnalyticsCard = ({
  title,
  value,
  variant,
  increaseValue,
}: AnalyticsCardProps) => {
  const iconColor = variant === "up" ? "text-emerald-500" : "text-red-500";
  const increaseValueColor =
    variant === "up" ? "text-emerald-500" : "text-red-500";
  const Icon = variant === "up" ? FaCaretUp : FaCaretDown;

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex overflow-hidden gap-x-2 items-center font-medium">
            <span className="text-base truncate">{title}</span>
          </CardDescription>
          <div className="flex gap-x-1 items-center">
            <Icon className={cn(iconColor, "size-4")} />
            <span
              className={cn(
                increaseValueColor,
                "text-base font-medium truncate",
              )}
            >
              {increaseValue}
            </span>
          </div>
        </div>
        <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};
