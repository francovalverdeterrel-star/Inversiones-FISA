import * as React from "react";
export function Switch({ checked, onCheckedChange }:{ checked:boolean, onCheckedChange:(v:boolean)=>void }){
  return (
    <button onClick={()=> onCheckedChange(!checked)} className={"w-12 h-6 rounded-full border relative transition "+(checked? "bg-slate-900 border-slate-900":"bg-white border-slate-300")}>
      <span className={"absolute top-0.5 transition " + (checked? "left-6":"left-0.5")}>
        <span className="block h-5 w-5 rounded-full bg-white shadow" />
      </span>
    </button>
  );
}
