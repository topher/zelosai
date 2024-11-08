// MainNav.tsx
import Link from "next/link";
import { routes } from "@/app/components/atomic/organisms/sidebar";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link key={route.label} href={route.href}>
          <a className="text-sm lg:text-base font-medium transition-colors hover:text-primary px-4 lg:px-6 whitespace-nowrap">{route.label}</a>
        </Link>
      ))}
    </nav>
  );
}
