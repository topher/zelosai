// /components/ui/button.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 active:scale-100 focus:ring focus:ring-indigo-400 focus:ring-opacity-50",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 active:scale-100 focus:ring focus:ring-red-400 focus:ring-opacity-50",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-inner transform hover:shadow-md hover:scale-105 focus:ring focus:ring-accent-400 focus:ring-opacity-50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 focus:ring focus:ring-gray-400 focus:ring-opacity-50",
        ghost:
          "text-accent-foreground hover:bg-accent/20 shadow-sm transform hover:scale-105 focus:ring focus:ring-indigo-400 focus:ring-opacity-50",
        link:
          "text-primary underline-offset-4 hover:underline transform hover:scale-105",
        premium:
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105 focus:ring focus:ring-pink-400 focus:ring-opacity-50",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-9 px-4 py-2 rounded-md",
        lg: "h-12 px-6 py-3 rounded-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
