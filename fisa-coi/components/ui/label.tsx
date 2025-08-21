import * as React from "react";
import { cn } from "./utils";
export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("block text-sm font-medium mb-1", className)} {...props} />;
}
