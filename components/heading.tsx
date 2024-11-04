// /components/heading.tsx

import { Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  icon: Icon;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-y-4 gap-x-3 mb-4 sm:mb-8 px-2 sm:px-4 lg:px-8">
      <div className={cn("p-2 rounded-md mx-auto sm:mx-0", bgColor)}>
        <Icon className={cn("w-8 h-8 sm:w-10 sm:h-10", iconColor)} />
      </div>
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};
