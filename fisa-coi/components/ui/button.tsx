import * as React from "react";
import { cn } from "./utils";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant="default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-xl transition border";
    const variants = {
      default: "bg-slate-900 text-white border-slate-900 hover:opacity-90",
      outline: "bg-white text-slate-900 border-slate-300 hover:bg-slate-50",
      secondary: "bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200",
      ghost: "bg-transparent text-red-600 border-transparent hover:bg-red-50"
    } as const;
    return <button ref={ref} className={cn(base, variants[variant], className)} {...props} />;
  }
);
Button.displayName = "Button";
