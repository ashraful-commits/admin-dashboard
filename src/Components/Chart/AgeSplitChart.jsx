import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { ageGroup: "18-24", count: 120 },
  { ageGroup: "25-34", count: 200 },
  { ageGroup: "35-44", count: 150 },
  { ageGroup: "45-54", count: 180 },
  { ageGroup: "55+", count: 100 },
];

const AgeSplitChart = () => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#f16821"];

  return (
    <div className="w-full max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Audience Age Split</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="ageGroup" type="category" />
          <Tooltip />
          <Bar
            dataKey="count"
            fill={(entry, index) => colors[index % colors.length]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgeSplitChart;
