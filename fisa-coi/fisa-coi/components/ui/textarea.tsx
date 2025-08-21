import * as React from "react";
import { cn } from "./utils";
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>){
  return <textarea className={cn("w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300", props.className)} {...props} />;
}
