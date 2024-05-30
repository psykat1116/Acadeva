"use client";
import React from "react";
import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMusic,
  FcSportsMode,
  FcBriefcase,
  FcCommandLine,
  FcLandscape,
  FcStatistics,
  FcElectronics,
  FcSignature,
  FcGoogle,
  FcCollaboration,
  FcAssistant,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Development: FcCommandLine,
  Business: FcBriefcase,
  Design: FcSignature,
  Marketing: FcAssistant,
  Lifestyle: FcLandscape,
  Music: FcMusic,
  "Finance & Accounting": FcStatistics,
  "IT & Software": FcElectronics,
  "Office Productivity": FcGoogle,
  "Personal Development": FcCollaboration,
  "Photography & Video": FcFilmReel,
  "Health & Fitness": FcSportsMode,
  "Teaching & Academics": FcEngineering,
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
