"use client";
import React from "react";
import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcGlobe,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Engineering: FcEngineering,
  Filming: FcFilmReel,
  "Computer Science": FcMultipleDevices,
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Accounting: FcSalesPerformance,
  Fitness: FcSportsMode,
  Geography: FcGlobe,
};

const Categories: React.FC<CategoriesProps> = ({ items }) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
