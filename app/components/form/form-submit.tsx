"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" ;
  pending?: boolean; // Add pending prop
};

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
  pending = false, // Default pending to false
}: FormSubmitProps) => {
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
