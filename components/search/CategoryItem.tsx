"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";
import qs from "query-string";

interface CategoryItemProps {
  label: string;
  icon?: IconType;
  value?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  label,
  icon: Icon,
  value,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = value === currentCategoryId;

  const handleClick = () => {
    console.log(currentTitle);
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    console.log(url);
    router.push(url);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "min-w-[180px] py-2 px-3 text-sm border border-slate-200 rounded-md flex flex-col items-center gap-x-1 hover:border-sky-700 hover:bg-sky-200/20 hover:text-sky-800 transition gap-1",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
