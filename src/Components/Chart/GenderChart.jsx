import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { gender: "Male", count: 300, color: "#8884d8" },
  { gender: "Female", count: 450, color: "#82ca9d" },
  { gender: "Non-Binary", count: 50, color: "#ffc658" },
];

const COLORS = data.map((entry) => entry.color);

const GenderChart = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Audience Gender Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="gender"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            label={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={24}
          >
            100%
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderChart;
