import IconBadge from "@/components/IconBadge";
import DescriptionForm from "@/components/course/DescriptionForm";
import ImageForm from "@/components/course/ImageForm";
import OptionForm from "@/components/course/OptionForm";
import TitleForm from "@/components/course/TitleForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  console.log(categories);

  if (!course) {
    return redirect("/");
  }

  const requireFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requireFields.length;
  const completedFields = requireFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields} fields completed`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <OptionForm
            initialData={course}
            courseId={course.id}
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
