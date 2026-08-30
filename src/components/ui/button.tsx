"use client";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-mono tracking-[0.18em] uppercase transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary: "bg-accent text-void hover:bg-accent-strong",
        outline: "border border-accent text-accent hover:bg-accent hover:text-void",
        ghost: "text-muted hover:bg-accent-soft hover:text-ink",
      },
      size: {
        sm: "px-3.5 py-1.5 text-[10px]",
        md: "px-5 py-2.5 text-xs",
        lg: "px-7 py-3.5 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
