import type { LibraryData } from "../types";
import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  data: LibraryData[];
  children: (item: LibraryData, index: number) => ReactNode;
  rounded?: "top" | "bottom" | "both" | "none";
  className?: string;
}

export default function Section({
  title,
  data,
  children,
  rounded = "none",
  className = "",
}: SectionProps) {
  // Determine rounded corners class
  const roundedClass =
    rounded === "top"
      ? "rounded-t-md"
      : rounded === "bottom"
        ? "rounded-b-md"
        : rounded === "both"
          ? "rounded-md"
          : "";

  return (
    <div
      className={`flex flex-col bg-[#121212] px-6 py-4 ml-4 ${roundedClass} ${className}`}
    >
      <h2 className="text-white font-semibold text-left text-3xl pt-5 gap-3 my-1 items-center hover:underline ml-2">
        {title}
      </h2>
      <div className="flex-row flex overflow-x-auto gap-1">
        {data.map((item, index) => children(item, index))}
      </div>
    </div>
  );
}
