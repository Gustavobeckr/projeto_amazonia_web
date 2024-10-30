import { HTMLAttributes } from "react";

export function Field(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="flex flex-col w-full" {...props} />;
}
