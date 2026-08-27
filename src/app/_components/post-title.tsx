import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  favicon?: string;
};

export function PostTitle({ children, favicon }: Props) {
  return (
    <div className="flex items-start justify-between gap-4">
      <h1 className="min-w-0 flex-1 text-left text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
        {children}
      </h1>
      {favicon && (
        <img src={favicon} alt="" className="mt-1 h-8 w-8 flex-shrink-0 md:h-10 md:w-10 lg:h-12 lg:w-12" />
      )}
    </div>
  );
}
