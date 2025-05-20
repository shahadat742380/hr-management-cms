"use client";

// ** import core package
import Link from "next/link";
import { usePathname } from "next/navigation";

// ** import component
import { buttonVariants } from "@/components/ui/button";

// Import Dispatch and SetStateAction from React
import { Dispatch, SetStateAction } from "react";

// ** import lib
import { cn } from "@/lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  setTitle: Dispatch<SetStateAction<string>>;
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, setTitle, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
          onClick={() => setTitle(item.title)}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
