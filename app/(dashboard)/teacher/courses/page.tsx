import React from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { columns } from "@/components/courses/Column";
import { DataTable } from "@/components/courses/DataTable";

export async function generateMetadata() {
  const user = await currentUser();
  return {
    title: `${user?.fullName} Courses`,
  };
}

const Page = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default Page;
