import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "outline" | "whatsapp";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }[size];

  const variantStyles = {
    primary:
      "bg-[#D62828] text-white hover:bg-[#b91c1c] focus:ring-[#D62828] shadow-sm",
    secondary:
      "bg-[#F4C542] text-[#151515] hover:bg-[#e0b030] focus:ring-[#F4C542] shadow-sm",
    dark: "bg-[#151515] text-white hover:bg-black focus:ring-[#151515] shadow-sm",
    outline:
      "border-2 border-[#151515] text-[#151515] bg-transparent hover:bg-[#151515] hover:text-white focus:ring-[#151515]",
    whatsapp:
      "bg-[#25D366] text-white hover:bg-[#1ebc59] focus:ring-[#25D366] shadow-sm",
  }[variant];

  return (
    <button
      className={cn(baseStyles, sizeStyles, variantStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
}
