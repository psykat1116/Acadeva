"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hook/useDebounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search);

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debounceValue,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  }, [debounceValue, currentCategoryId, pathname, router]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        value={search}
        placeholder="Search courses"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        type="text"
      />
    </div>
  );
};

export default SearchInput;
