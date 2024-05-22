import { getAnalytics } from "@/actions/getAnalytics";
import Chart from "@/components/analytics/Chart";
import DataCard from "@/components/analytics/DataCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <DataCard label="Total Sales" value={totalSales} />
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat/>
      </div>
      <Chart data={data}/>
    </div>
  );
};

export default Page;
