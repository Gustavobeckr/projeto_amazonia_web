import { HTMLAttributes } from "react";

interface ColumnProps extends HTMLAttributes<HTMLDivElement> {}

export function Column(props: ColumnProps) {
  return <div className="flex flex-col w-1/2 gap-4" {...props} />;
}
