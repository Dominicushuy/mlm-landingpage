import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { CHART_COLORS } from "../../data/siteData";

const PieChartComponent = ({
  data,
  dataKey = "value",
  nameKey = "name",
  height = 300,
  colors = CHART_COLORS,
  outerRadius = 80,
  innerRadius = 0,
  showLabel = true,
}) => {
  const renderLabel = showLabel
    ? (entry) => `${entry[nameKey]} (${Math.round(entry.percent * 100)}%)`
    : undefined;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={showLabel}
          label={renderLabel}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
