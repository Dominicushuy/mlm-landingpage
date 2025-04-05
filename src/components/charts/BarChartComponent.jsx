import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({
  data,
  bars = [],
  xAxisKey = "name",
  height = 300,
  colors = ["#3b82f6", "#60a5fa", "#93c5fd"],
  layout = "horizontal",
  yAxisDomain,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={layout}
        margin={{
          top: 5,
          right: 30,
          left: layout === "vertical" ? 40 : 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {layout === "vertical" ? (
          <>
            <XAxis type="number" domain={yAxisDomain} />
            <YAxis dataKey={xAxisKey} type="category" width={150} />
          </>
        ) : (
          <>
            <XAxis dataKey={xAxisKey} />
            <YAxis domain={yAxisDomain} />
          </>
        )}
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name || bar.dataKey}
            fill={bar.color || colors[index % colors.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
