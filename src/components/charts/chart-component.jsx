import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { ChartWrapper, ChartLegend } from "./chart-wrapper";

// Default color palette
const DEFAULT_COLORS = [
  "#3b82f6", // blue-500
  "#ef4444", // red-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#8b5cf6", // violet-500
  "#14b8a6", // teal-500
  "#f97316", // orange-500
  "#6366f1", // indigo-500
];

/**
 * LineChart component
 *
 * @example
 * <LineChart
 *   data={data}
 *   lines={[
 *     { dataKey: "value", name: "Revenue", color: "#3b82f6" },
 *     { dataKey: "forecast", name: "Forecast", color: "#ef4444" }
 *   ]}
 *   xAxisKey="month"
 *   height={300}
 *   grid={true}
 *   title="Monthly Revenue"
 * />
 */
const LineChart = React.forwardRef(
  (
    {
      data = [],
      lines = [],
      xAxisKey = "name",
      yAxisDomain,
      height = 300,
      grid = true,
      colors = DEFAULT_COLORS,
      title,
      subtitle,
      caption,
      className,
      chartClassName,
      ...props
    },
    ref
  ) => {
    if (!data.length || !lines.length) {
      return (
        <ChartWrapper
          title={title}
          subtitle={subtitle}
          caption={caption}
          className={className}
          height={height}
          {...props}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              No data available
            </p>
          </div>
        </ChartWrapper>
      );
    }

    return (
      <ChartWrapper
        ref={ref}
        title={title}
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className={chartClassName}
          >
            {grid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              domain={yAxisDomain}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#e5e7eb",
                borderRadius: "0.375rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <Legend />
            {lines.map((line, index) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name || line.dataKey}
                stroke={line.color || colors[index % colors.length]}
                strokeWidth={line.strokeWidth || 2}
                dot={line.dot !== false}
                activeDot={line.activeDot !== false ? { r: 6 } : false}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
);

LineChart.displayName = "LineChart";

/**
 * BarChart component
 *
 * @example
 * <BarChart
 *   data={data}
 *   bars={[
 *     { dataKey: "value", name: "Revenue", color: "#3b82f6" },
 *     { dataKey: "forecast", name: "Forecast", color: "#ef4444" }
 *   ]}
 *   xAxisKey="month"
 *   layout="vertical"
 *   height={300}
 *   grid={true}
 *   title="Monthly Revenue"
 * />
 */
const BarChart = React.forwardRef(
  (
    {
      data = [],
      bars = [],
      xAxisKey = "name",
      yAxisDomain,
      height = 300,
      grid = true,
      colors = DEFAULT_COLORS,
      layout = "horizontal",
      title,
      subtitle,
      caption,
      className,
      chartClassName,
      ...props
    },
    ref
  ) => {
    if (!data.length || !bars.length) {
      return (
        <ChartWrapper
          title={title}
          subtitle={subtitle}
          caption={caption}
          className={className}
          height={height}
          {...props}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              No data available
            </p>
          </div>
        </ChartWrapper>
      );
    }

    return (
      <ChartWrapper
        ref={ref}
        title={title}
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            layout={layout}
            margin={{
              top: 5,
              right: 30,
              left: layout === "vertical" ? 60 : 20,
              bottom: 5,
            }}
            className={chartClassName}
          >
            {grid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            {layout === "vertical" ? (
              <>
                <XAxis
                  type="number"
                  domain={yAxisDomain}
                  tick={{ fill: "#6b7280" }}
                  tickLine={{ stroke: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                />
                <YAxis
                  dataKey={xAxisKey}
                  type="category"
                  width={120}
                  tick={{ fill: "#6b7280" }}
                  tickLine={{ stroke: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey={xAxisKey}
                  tick={{ fill: "#6b7280" }}
                  tickLine={{ stroke: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                />
                <YAxis
                  domain={yAxisDomain}
                  tick={{ fill: "#6b7280" }}
                  tickLine={{ stroke: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                />
              </>
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#e5e7eb",
                borderRadius: "0.375rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <Legend />
            {bars.map((bar, index) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                name={bar.name || bar.dataKey}
                fill={bar.color || colors[index % colors.length]}
                radius={bar.radius || [4, 4, 0, 0]}
                barSize={bar.barSize}
                stackId={bar.stackId}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
);

BarChart.displayName = "BarChart";

/**
 * PieChart component
 *
 * @example
 * <PieChart
 *   data={[
 *     { name: "Group A", value: 400 },
 *     { name: "Group B", value: 300 },
 *     { name: "Group C", value: 300 }
 *   ]}
 *   dataKey="value"
 *   nameKey="name"
 *   height={300}
 *   innerRadius={60}
 *   outerRadius={80}
 *   paddingAngle={5}
 *   title="Revenue Breakdown"
 * />
 */
const PieChart = React.forwardRef(
  (
    {
      data = [],
      dataKey = "value",
      nameKey = "name",
      colors = DEFAULT_COLORS,
      height = 300,
      innerRadius = 0,
      outerRadius = 80,
      paddingAngle = 0,
      showLabel = false,
      title,
      subtitle,
      caption,
      className,
      chartClassName,
      ...props
    },
    ref
  ) => {
    if (!data.length) {
      return (
        <ChartWrapper
          title={title}
          subtitle={subtitle}
          caption={caption}
          className={className}
          height={height}
          {...props}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              No data available
            </p>
          </div>
        </ChartWrapper>
      );
    }

    const renderLabel = showLabel
      ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`
      : undefined;

    // Create legend items with proper colors
    const legendItems = data.map((item, index) => ({
      label: item[nameKey],
      color: colors[index % colors.length],
    }));

    return (
      <ChartWrapper
        ref={ref}
        title={title}
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart className={chartClassName}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={showLabel}
              label={renderLabel}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              paddingAngle={paddingAngle}
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#e5e7eb",
                borderRadius: "0.375rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>

        <ChartLegend items={legendItems} className="justify-center" />
      </ChartWrapper>
    );
  }
);

PieChart.displayName = "PieChart";

/**
 * AreaChart component
 *
 * @example
 * <AreaChart
 *   data={data}
 *   areas={[
 *     { dataKey: "value", name: "Revenue", color: "#3b82f6", fill: "#93c5fd" },
 *   ]}
 *   xAxisKey="month"
 *   height={300}
 *   grid={true}
 *   title="Revenue Trend"
 * />
 */
const AreaChart = React.forwardRef(
  (
    {
      data = [],
      areas = [],
      xAxisKey = "name",
      yAxisDomain,
      height = 300,
      grid = true,
      colors = DEFAULT_COLORS,
      title,
      subtitle,
      caption,
      className,
      chartClassName,
      ...props
    },
    ref
  ) => {
    if (!data.length || !areas.length) {
      return (
        <ChartWrapper
          title={title}
          subtitle={subtitle}
          caption={caption}
          className={className}
          height={height}
          {...props}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              No data available
            </p>
          </div>
        </ChartWrapper>
      );
    }

    return (
      <ChartWrapper
        ref={ref}
        title={title}
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className={chartClassName}
          >
            {grid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              domain={yAxisDomain}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#e5e7eb",
                borderRadius: "0.375rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <Legend />
            {areas.map((area, index) => {
              const color = area.color || colors[index % colors.length];
              const fillColor = area.fill || color;

              return (
                <Area
                  key={area.dataKey}
                  type="monotone"
                  dataKey={area.dataKey}
                  name={area.name || area.dataKey}
                  stroke={color}
                  fill={fillColor}
                  fillOpacity={area.fillOpacity || 0.3}
                  strokeWidth={area.strokeWidth || 2}
                  dot={area.dot !== false}
                  activeDot={area.activeDot !== false ? { r: 6 } : false}
                  stackId={area.stackId}
                />
              );
            })}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
);

AreaChart.displayName = "AreaChart";

/**
 * RadarChart component
 *
 * @example
 * <RadarChart
 *   data={[
 *     { subject: 'Math', A: 120, B: 110, fullMark: 150 },
 *     { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
 *     { subject: 'English', A: 86, B: 130, fullMark: 150 },
 *   ]}
 *   series={[
 *     { dataKey: 'A', name: 'Student A', color: '#3b82f6' },
 *     { dataKey: 'B', name: 'Student B', color: '#ef4444' }
 *   ]}
 *   height={300}
 *   title="Performance Comparison"
 * />
 */
const RadarChart = React.forwardRef(
  (
    {
      data = [],
      series = [],
      nameKey = "subject",
      height = 300,
      colors = DEFAULT_COLORS,
      grid = true,
      gridClosed = true,
      title,
      subtitle,
      caption,
      className,
      chartClassName,
      ...props
    },
    ref
  ) => {
    if (!data.length || !series.length) {
      return (
        <ChartWrapper
          title={title}
          subtitle={subtitle}
          caption={caption}
          className={className}
          height={height}
          {...props}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              No data available
            </p>
          </div>
        </ChartWrapper>
      );
    }

    return (
      <ChartWrapper
        ref={ref}
        title={title}
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data} className={chartClassName}>
            <PolarGrid
              gridType={gridClosed ? "circle" : "polygon"}
              stroke={grid ? "#e5e7eb" : "transparent"}
            />
            <PolarAngleAxis dataKey={nameKey} tick={{ fill: "#6b7280" }} />
            <PolarRadiusAxis
              tick={{ fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={{ stroke: "#6b7280" }}
            />
            {series.map((item, index) => (
              <Radar
                key={item.dataKey}
                name={item.name || item.dataKey}
                dataKey={item.dataKey}
                stroke={item.color || colors[index % colors.length]}
                fill={item.color || colors[index % colors.length]}
                fillOpacity={item.fillOpacity || 0.2}
                strokeWidth={item.strokeWidth || 2}
                dot
              />
            ))}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "#e5e7eb",
                borderRadius: "0.375rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <Legend />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
);

RadarChart.displayName = "RadarChart";

export { LineChart, BarChart, PieChart, AreaChart, RadarChart, DEFAULT_COLORS };
