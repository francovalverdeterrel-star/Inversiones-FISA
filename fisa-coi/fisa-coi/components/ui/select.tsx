import * as React from "react";
export function NativeSelect({ value, onValueChange, options }:{ value: string, onValueChange:(v:string)=>void, options:string[] }){
  return (
    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={value} onChange={e=> onValueChange(e.target.value)}>
      {options.map(o=> <option key={o} value={o}>{o || "—"}</option>)}
    </select>
  );
}
