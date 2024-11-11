import { HTMLAttributes } from "react";

export function Column(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="flex flex-col w-1/2 gap-4 px-2" {...props} />;
}
