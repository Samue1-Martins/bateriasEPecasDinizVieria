import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "dark" | "outline" | "gray";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-[#D62828] text-white",
    secondary: "bg-[#F4C542] text-[#151515] font-semibold",
    dark: "bg-[#151515] text-white",
    outline: "border border-[#151515] text-[#151515] bg-transparent",
    gray: "bg-[#F5F5F5] text-[#151515] border border-gray-200",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
