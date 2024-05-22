import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

const DataCard: React.FC<DataCardProps> = ({ value, label, shouldFormat }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{shouldFormat ? formatPrice(value) : value}</div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
