import { getDashboardCourses } from "@/actions/getDashboardCourses";
import InfoCard from "@/components/dashboard/InfoCard";
import CoursesList from "@/components/search/CoursesList";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, courseInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={courseInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...courseInProgress, ...completedCourses]} />
    </div>
  );
};

export default Home;
