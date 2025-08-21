import * as React from "react";
import { cn } from "./utils";
export function Tabs({ children, defaultValue }: any){ return <div data-tabs-default={defaultValue}>{children}</div>; }
export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>){ return <div className={cn("inline-flex rounded-xl border bg-slate-50 p-1 gap-1", className)} {...props} />; }
export function TabsTrigger({ value, children }: any){ return <button className="px-3 py-1.5 text-sm rounded-xl data-[state=active]:bg-white" data-value={value}>{children}</button>; }
export function TabsContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>){ return <div className={cn("", className)} {...props} />; }
