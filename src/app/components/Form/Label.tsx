import { LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="text-zinc-800 text-sm flex flex-col my-1" {...props} />
  );
}
