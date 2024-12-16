// /app/components/atomic/atoms/heading_b.tsx

import { Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

interface HeadingProps {
  title: string;
  description: string;
  icon: Icon;
  iconColor?: string;
  bgColor?: string;
}

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const montserratThin = Montserrat({ weight: "400", subsets: ["latin"] });

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
        <h2 className={cn("text-2xl sm:text-3xl font-bold text-white", montserrat.className)}>
          {title}
        </h2>
        <p className={cn("text-sm sm:text-base text-gray-300", montserratThin.className)}>
          {description}
        </p>
      </div>
    </div>
  );
};
