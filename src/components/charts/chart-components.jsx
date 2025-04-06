import React, { useState, useCallback, useEffect, useMemo } from "react";
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
  Sector,
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
  ZAxis,
  Brush,
  ReferenceArea,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { ChartWrapper, ChartLegend } from "./chart-wrapper";
import {
  Info,
  TrendingUp,
  TrendingDown,
  HelpCircle,
  Filter,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Slider } from "../ui/slider";

// Enhanced color palette with proper contrast and accessibility
const ENHANCED_COLORS = {
  primary: ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"],
  secondary: ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"],
  success: ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
  danger: ["#dc2626", "#ef4444", "#f87171", "#fca5a5", "#fecaca"],
  warning: ["#d97706", "#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"],
  info: ["#0284c7", "#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"],
  neutral: ["#4b5563", "#6b7280", "#9ca3af", "#d1d5db", "#e5e7eb"],
  // Additional gradients and palette options
  gradients: {
    blue: ["#1e40af", "#3b82f6"],
    purple: ["#6d28d9", "#a78bfa"],
    green: ["#047857", "#10b981"],
    red: ["#b91c1c", "#f87171"],
    orange: ["#b45309", "#fbbf24"],
    teal: ["#0f766e", "#2dd4bf"],
    indigo: ["#4338ca", "#818cf8"],
  },
};

// Custom tooltip component with enhanced styling and animations
const EnhancedTooltip = ({
  active,
  payload,
  label,
  labelFormatter,
  formatter,
  filterOptions,
  unit,
  isComparison,
}) => {
  if (!active || !payload || !payload.length) return null;

  // Format the label if a formatter is provided
  const formattedLabel = labelFormatter ? labelFormatter(label) : label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-xs"
    >
      <div className="font-medium text-gray-900 dark:text-white mb-2">
        {formattedLabel}
      </div>
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const value = formatter ? formatter(entry.value) : entry.value;
          return (
            <div
              key={`tooltip-item-${index}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {entry.name}:
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white ml-2">
                {value}
                {unit ? unit : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Add context insights for enhanced tooltips */}
      {payload.length > 1 && isComparison && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-xs">
            {payload[0].value > payload[1].value ? (
              <>
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium mr-1">
                  +
                  {((payload[0].value / payload[1].value - 1) * 100).toFixed(1)}
                  %
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  increase from previous
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500 font-medium mr-1">
                  {((payload[0].value / payload[1].value - 1) * 100).toFixed(1)}
                  %
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  decrease from previous
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Enhanced chart filter component
const ChartFilter = ({ options, activeFilters, onChange, className }) => {
  return (
    <div className={cn("flex flex-wrap gap-2 mb-4", className)}>
      {options.map((option) => (
        <Button
          key={option.value}
          variant={activeFilters.includes(option.value) ? "default" : "outline"}
          size="sm"
          onClick={() => {
            const newFilters = activeFilters.includes(option.value)
              ? activeFilters.filter((f) => f !== option.value)
              : [...activeFilters, option.value];
            onChange(
              newFilters.length ? newFilters : options.map((o) => o.value)
            ); // Default to all if none selected
          }}
          className={cn(
            activeFilters.includes(option.value)
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "text-gray-600 dark:text-gray-300"
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

// Time range selector component
const TimeRangeSelector = ({ data, xKey, onChange, className }) => {
  const [range, setRange] = useState([0, data.length - 1]);

  const handleChange = (newRange) => {
    setRange(newRange);

    const filteredData = data.slice(newRange[0], newRange[1] + 1);
    onChange(filteredData);
  };

  return (
    <div className={cn("py-4 px-2", className)}>
      <div className="mb-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>From: {data[range[0]]?.[xKey]}</span>
        <span>To: {data[range[1]]?.[xKey]}</span>
      </div>
      <Slider
        min={0}
        max={data.length - 1}
        step={1}
        value={range}
        onValueChange={handleChange}
        className="mt-6"
      />
    </div>
  );
};

// Chart help info component
const ChartInfo = ({ title, content }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
          <HelpCircle className="h-4 w-4 text-gray-400" />
          <span className="sr-only">Chart information</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{content}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

/**
 * Enhanced LineChart component with animations, interactions, and filtering
 */
export const EnhancedLineChart = React.forwardRef(
  (
    {
      data = [],
      lines = [],
      xAxisKey = "name",
      yAxisDomain,
      height = 350,
      grid = true,
      colors = ENHANCED_COLORS.primary,
      title,
      subtitle,
      caption,
      info,
      className,
      chartClassName,
      filterOptions,
      timeRange = false,
      animate = true,
      formatters = {},
      unit,
      annotations = [],
      ...props
    },
    ref
  ) => {
    const [filteredData, setFilteredData] = useState(data);
    const [activeFilters, setActiveFilters] = useState(
      filterOptions ? filterOptions.map((option) => option.value) : []
    );
    const [hoveredLine, setHoveredLine] = useState(null);

    // Filter lines based on active filters
    const visibleLines = useMemo(() => {
      if (!filterOptions) return lines;
      return lines.filter((line) =>
        activeFilters.includes(line.filterValue || line.dataKey)
      );
    }, [lines, activeFilters, filterOptions]);

    // Apply time range filtering if enabled
    useEffect(() => {
      setFilteredData(data);
    }, [data]);

    // Handle filter changes
    const handleFilterChange = useCallback((newFilters) => {
      setActiveFilters(newFilters);
    }, []);

    // Handle time range changes
    const handleTimeRangeChange = useCallback((newData) => {
      setFilteredData(newData);
    }, []);

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

    // Formatting helpers
    const labelFormatter = formatters.labelFormatter || ((value) => value);
    const valueFormatter = formatters.valueFormatter || ((value) => value);

    return (
      <ChartWrapper
        ref={ref}
        title={
          <div className="flex items-center justify-between">
            <span>{title}</span>
            {info && <ChartInfo title={title} content={info} />}
          </div>
        }
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        {/* Controls section */}
        {(filterOptions || timeRange) && (
          <div className="mb-4 space-y-3">
            {filterOptions && (
              <ChartFilter
                options={filterOptions}
                activeFilters={activeFilters}
                onChange={handleFilterChange}
              />
            )}
            {timeRange && (
              <TimeRangeSelector
                data={data}
                xKey={xAxisKey}
                onChange={handleTimeRangeChange}
              />
            )}
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            className={chartClassName}
            onMouseLeave={() => setHoveredLine(null)}
          >
            {grid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                strokeOpacity={0.6}
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickFormatter={labelFormatter}
            />
            <YAxis
              domain={yAxisDomain}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickFormatter={valueFormatter}
            />
            <Tooltip
              content={
                <EnhancedTooltip
                  labelFormatter={labelFormatter}
                  formatter={valueFormatter}
                  unit={unit}
                  isComparison={visibleLines.length > 1}
                />
              }
            />
            <Legend
              onClick={(entry) => {
                if (filterOptions) {
                  const filterValue = entry.dataKey;
                  handleFilterChange(
                    activeFilters.includes(filterValue)
                      ? activeFilters.filter((f) => f !== filterValue)
                      : [...activeFilters, filterValue]
                  );
                }
              }}
              onMouseEnter={(entry) => setHoveredLine(entry.dataKey)}
              onMouseLeave={() => setHoveredLine(null)}
            />

            {/* Optional annotations: ReferenceLine, ReferenceArea, etc. */}
            {annotations.map((annotation, i) => {
              if (annotation.type === "line") {
                return (
                  <ReferenceLine
                    key={`annotation-${i}`}
                    x={annotation.x}
                    y={annotation.y}
                    stroke={annotation.color || "#ef4444"}
                    strokeDasharray="3 3"
                    label={annotation.label}
                  />
                );
              } else if (annotation.type === "area") {
                return (
                  <ReferenceArea
                    key={`annotation-${i}`}
                    x1={annotation.x1}
                    x2={annotation.x2}
                    y1={annotation.y1}
                    y2={annotation.y2}
                    fill={annotation.color || "#3b82f6"}
                    fillOpacity={0.1}
                    stroke={annotation.color || "#3b82f6"}
                    strokeOpacity={0.5}
                    label={annotation.label}
                  />
                );
              } else if (annotation.type === "dot") {
                return (
                  <ReferenceDot
                    key={`annotation-${i}`}
                    x={annotation.x}
                    y={annotation.y}
                    r={6}
                    fill={annotation.color || "#ef4444"}
                    stroke="none"
                    label={annotation.label}
                  />
                );
              }
              return null;
            })}

            {visibleLines.map((line, index) => {
              const isHighlighted =
                hoveredLine === null || hoveredLine === line.dataKey;
              const baseStrokeWidth = line.strokeWidth || 2;

              return (
                <Line
                  key={line.dataKey}
                  type="monotone"
                  dataKey={line.dataKey}
                  name={line.name || line.dataKey}
                  stroke={line.color || colors[index % colors.length]}
                  strokeWidth={
                    isHighlighted ? baseStrokeWidth : baseStrokeWidth / 2
                  }
                  dot={
                    line.dot !== false
                      ? {
                          r: 4,
                          strokeWidth: 2,
                          stroke: line.color || colors[index % colors.length],
                          fill: "white",
                        }
                      : false
                  }
                  activeDot={
                    line.activeDot !== false
                      ? {
                          r: 6,
                          stroke: line.color || colors[index % colors.length],
                          strokeWidth: 2,
                          fill: line.color || colors[index % colors.length],
                        }
                      : false
                  }
                  strokeOpacity={isHighlighted ? 1 : 0.3}
                  // Animation properties
                  isAnimationActive={animate}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              );
            })}
          </RechartsLineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
);

EnhancedLineChart.displayName = "EnhancedLineChart";

/**
 * Enhanced BarChart component with animations and interactions
 */
export const EnhancedBarChart = React.forwardRef(
  (
    {
      data = [],
      bars = [],
      xAxisKey = "name",
      yAxisDomain,
      height = 300,
      grid = true,
      colors = ENHANCED_COLORS.primary,
      layout = "horizontal",
      title,
      subtitle,
      caption,
      info,
      className,
      chartClassName,
      filterOptions,
      stackBars = false,
      animate = true,
      formatters = {},
      unit,
      annotations = [],
      ...props
    },
    ref
  ) => {
    const [filteredData, setFilteredData] = useState(data);
    const [activeFilters, setActiveFilters] = useState(
      filterOptions ? filterOptions.map((option) => option.value) : []
    );
    const [hoveredBar, setHoveredBar] = useState(null);

    // Filter bars based on active filters
    const visibleBars = useMemo(() => {
      if (!filterOptions) return bars;
      return bars.filter((bar) =>
        activeFilters.includes(bar.filterValue || bar.dataKey)
      );
    }, [bars, activeFilters, filterOptions]);

    // Apply time range filtering if enabled
    useEffect(() => {
      setFilteredData(data);
    }, [data]);

    // Handle filter changes
    const handleFilterChange = useCallback((newFilters) => {
      setActiveFilters(newFilters);
    }, []);

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

    // Formatting helpers
    const labelFormatter = formatters.labelFormatter || ((value) => value);
    const valueFormatter = formatters.valueFormatter || ((value) => value);

    // Determine stack IDs based on stackBars prop
    const barsWithStackId = useMemo(() => {
      if (!stackBars) return visibleBars;
      return visibleBars.map((bar) => ({
        ...bar,
        stackId: bar.stackId || "stack1",
      }));
    }, [visibleBars, stackBars]);

    return (
      <ChartWrapper
        ref={ref}
        title={
          <div className="flex items-center justify-between">
            <span>{title}</span>
            {info && <ChartInfo title={title} content={info} />}
          </div>
        }
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        {/* Controls section */}
        {filterOptions && (
          <div className="mb-4">
            <ChartFilter
              options={filterOptions}
              activeFilters={activeFilters}
              onChange={handleFilterChange}
            />
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={filteredData}
            layout={layout}
            margin={{
              top: 10,
              right: 30,
              left: layout === "vertical" ? 60 : 10,
              bottom: 10,
            }}
            className={chartClassName}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {grid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                strokeOpacity={0.6}
              />
            )}

            {layout === "vertical" ? (
              <>
                <XAxis
                  type="number"
                  domain={yAxisDomain}
                  tick={{ fill: "#6b7280" }}
                  tickLine={{ stroke: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                  tickFormatter={valueFormatter}
                />
                <YAxis
                  dataKey={xAxisKey}
                  type="category"
                  width={120}
                  tick={{ fill: "#6b7280" }}
                  tickLine={{ stroke: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                  tickFormatter={labelFormatter}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey={xAxisKey}
                  tick={{ fill: "#6b7280" }}
                  tickLine={{ stroke: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                  tickFormatter={labelFormatter}
                />
                <YAxis
                  domain={yAxisDomain}
                  tick={{ fill: "#6b7280" }}
                  tickLine={{ stroke: "#6b7280" }}
                  axisLine={{ stroke: "#d1d5db" }}
                  tickFormatter={valueFormatter}
                />
              </>
            )}

            <Tooltip
              content={
                <EnhancedTooltip
                  labelFormatter={labelFormatter}
                  formatter={valueFormatter}
                  unit={unit}
                  isComparison={visibleBars.length > 1}
                />
              }
            />

            <Legend
              onClick={(entry) => {
                if (filterOptions) {
                  const filterValue = entry.dataKey;
                  handleFilterChange(
                    activeFilters.includes(filterValue)
                      ? activeFilters.filter((f) => f !== filterValue)
                      : [...activeFilters, filterValue]
                  );
                }
              }}
              onMouseEnter={(entry) => setHoveredBar(entry.dataKey)}
              onMouseLeave={() => setHoveredBar(null)}
            />

            {/* Optional annotations */}
            {annotations.map((annotation, i) => {
              if (annotation.type === "line") {
                return (
                  <ReferenceLine
                    key={`annotation-${i}`}
                    {...(layout === "vertical"
                      ? { y: annotation.y, x: annotation.x }
                      : { x: annotation.x, y: annotation.y })}
                    stroke={annotation.color || "#ef4444"}
                    strokeDasharray="3 3"
                    label={annotation.label}
                  />
                );
              }
              return null;
            })}

            {barsWithStackId.map((bar, index) => {
              const isHighlighted =
                hoveredBar === null || hoveredBar === bar.dataKey;

              return (
                <Bar
                  key={bar.dataKey}
                  dataKey={bar.dataKey}
                  name={bar.name || bar.dataKey}
                  fill={bar.color || colors[index % colors.length]}
                  radius={bar.radius || [4, 4, 0, 0]}
                  barSize={bar.barSize}
                  stackId={bar.stackId}
                  fillOpacity={isHighlighted ? 1 : 0.3}
                  // Animation properties
                  isAnimationActive={animate}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  onMouseOver={() => setHoveredBar(bar.dataKey)}
                />
              );
            })}
          </RechartsBarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
);

EnhancedBarChart.displayName = "EnhancedBarChart";

/**
 * Enhanced PieChart component with animations and interactivity
 */
export const EnhancedPieChart = React.forwardRef(
  (
    {
      data = [],
      dataKey = "value",
      nameKey = "name",
      colors = ENHANCED_COLORS.primary,
      height = 300,
      innerRadius = 0,
      outerRadius = 80,
      paddingAngle = 0,
      showLabel = false,
      title,
      subtitle,
      caption,
      info,
      className,
      chartClassName,
      animate = true,
      formatters = {},
      unit,
      activeIndex = -1,
      ...props
    },
    ref
  ) => {
    const [activeSlice, setActiveSlice] = useState(activeIndex);

    // Reset active slice when data changes
    useEffect(() => {
      setActiveSlice(activeIndex);
    }, [data, activeIndex]);

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

    // Custom label for pie slices
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
    }) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          className="fill-gray-700 dark:fill-gray-300 text-xs font-medium"
          style={{ pointerEvents: "none" }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    // Active shape for interactive pie chart
    const renderActiveShape = (props) => {
      const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        value,
      } = props;
      const RADIAN = Math.PI / 180;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? "start" : "end";

      // Value formatter
      const formattedValue = formatters.valueFormatter
        ? formatters.valueFormatter(value)
        : value;

      return (
        <g>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius + 5}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            stroke="#fff"
            strokeWidth={2}
          />
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
            strokeWidth={2}
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey - 12}
            textAnchor={textAnchor}
            fill="#333"
            className="text-sm font-medium"
          >
            {payload.name}
          </text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey + 12}
            textAnchor={textAnchor}
            fill="#999"
            className="text-xs"
          >
            {`${formattedValue}${unit || ""} (${(
              (value / data.reduce((acc, item) => acc + item[dataKey], 0)) *
              100
            ).toFixed(1)}%)`}
          </text>
        </g>
      );
    };

    // Create legend items with proper colors
    const legendItems = data.map((item, index) => ({
      label: item[nameKey],
      value: formatters.valueFormatter
        ? formatters.valueFormatter(item[dataKey])
        : item[dataKey],
      color: colors[index % colors.length],
    }));

    return (
      <ChartWrapper
        ref={ref}
        title={
          <div className="flex items-center justify-between">
            <span>{title}</span>
            {info && <ChartInfo title={title} content={info} />}
          </div>
        }
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
              labelLine={showLabel && activeSlice === -1}
              label={
                showLabel && activeSlice === -1 ? renderCustomizedLabel : null
              }
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              paddingAngle={paddingAngle}
              dataKey={dataKey}
              nameKey={nameKey}
              activeIndex={activeSlice !== -1 ? activeSlice : undefined}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveSlice(index)}
              onMouseLeave={() => setActiveSlice(activeIndex)}
              onClick={(_, index) =>
                setActiveSlice(index === activeSlice ? -1 : index)
              }
              isAnimationActive={animate}
              animationDuration={1500}
              animationEasing="ease-in-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  stroke="#fff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip
              content={
                <EnhancedTooltip
                  formatter={(value) =>
                    formatters.valueFormatter
                      ? formatters.valueFormatter(value)
                      : value
                  }
                  unit={unit}
                />
              }
            />
          </RechartsPieChart>
        </ResponsiveContainer>

        <ChartLegend
          items={legendItems}
          className="justify-center mt-4"
          onClick={(_, index) =>
            setActiveSlice(index === activeSlice ? -1 : index)
          }
          activeIndex={activeSlice}
          orientation="horizontal"
        />
      </ChartWrapper>
    );
  }
);

EnhancedPieChart.displayName = "EnhancedPieChart";

/**
 * Enhanced AreaChart component with animations and gradients
 */
export const EnhancedAreaChart = React.forwardRef(
  (
    {
      data = [],
      areas = [],
      xAxisKey = "name",
      yAxisDomain,
      height = 300,
      grid = true,
      colors = ENHANCED_COLORS.primary,
      title,
      subtitle,
      caption,
      info,
      className,
      chartClassName,
      filterOptions,
      timeRange = false,
      animate = true,
      formatters = {},
      unit,
      annotations = [],
      ...props
    },
    ref
  ) => {
    const [filteredData, setFilteredData] = useState(data);
    const [activeFilters, setActiveFilters] = useState(
      filterOptions ? filterOptions.map((option) => option.value) : []
    );
    const [hoveredArea, setHoveredArea] = useState(null);

    // Filter areas based on active filters
    const visibleAreas = useMemo(() => {
      if (!filterOptions) return areas;
      return areas.filter((area) =>
        activeFilters.includes(area.filterValue || area.dataKey)
      );
    }, [areas, activeFilters, filterOptions]);

    // Apply time range filtering if enabled
    useEffect(() => {
      setFilteredData(data);
    }, [data]);

    // Handle filter changes
    const handleFilterChange = useCallback((newFilters) => {
      setActiveFilters(newFilters);
    }, []);

    // Handle time range changes
    const handleTimeRangeChange = useCallback((newData) => {
      setFilteredData(newData);
    }, []);

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

    // Formatting helpers
    const labelFormatter = formatters.labelFormatter || ((value) => value);
    const valueFormatter = formatters.valueFormatter || ((value) => value);

    // Generate unique IDs for gradient definitions
    const getGradientId = (index) => `areaGradient-${index}`;

    return (
      <ChartWrapper
        ref={ref}
        title={
          <div className="flex items-center justify-between">
            <span>{title}</span>
            {info && <ChartInfo title={title} content={info} />}
          </div>
        }
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        {/* Controls section */}
        {(filterOptions || timeRange) && (
          <div className="mb-4 space-y-3">
            {filterOptions && (
              <ChartFilter
                options={filterOptions}
                activeFilters={activeFilters}
                onChange={handleFilterChange}
              />
            )}
            {timeRange && (
              <TimeRangeSelector
                data={data}
                xKey={xAxisKey}
                onChange={handleTimeRangeChange}
              />
            )}
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            className={chartClassName}
            onMouseLeave={() => setHoveredArea(null)}
          >
            {/* Gradient definitions for each area */}
            <defs>
              {visibleAreas.map((area, index) => {
                const color = area.color || colors[index % colors.length];
                const id = getGradientId(index);
                return (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                  </linearGradient>
                );
              })}
            </defs>

            {grid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                strokeOpacity={0.6}
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickFormatter={labelFormatter}
            />
            <YAxis
              domain={yAxisDomain}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickFormatter={valueFormatter}
            />
            <Tooltip
              content={
                <EnhancedTooltip
                  labelFormatter={labelFormatter}
                  formatter={valueFormatter}
                  unit={unit}
                  isComparison={visibleAreas.length > 1}
                />
              }
            />
            <Legend
              onClick={(entry) => {
                if (filterOptions) {
                  const filterValue = entry.dataKey;
                  handleFilterChange(
                    activeFilters.includes(filterValue)
                      ? activeFilters.filter((f) => f !== filterValue)
                      : [...activeFilters, filterValue]
                  );
                }
              }}
              onMouseEnter={(entry) => setHoveredArea(entry.dataKey)}
              onMouseLeave={() => setHoveredArea(null)}
            />

            {/* Optional annotations */}
            {annotations.map((annotation, i) => {
              if (annotation.type === "line") {
                return (
                  <ReferenceLine
                    key={`annotation-${i}`}
                    x={annotation.x}
                    y={annotation.y}
                    stroke={annotation.color || "#ef4444"}
                    strokeDasharray="3 3"
                    label={annotation.label}
                  />
                );
              } else if (annotation.type === "area") {
                return (
                  <ReferenceArea
                    key={`annotation-${i}`}
                    x1={annotation.x1}
                    x2={annotation.x2}
                    y1={annotation.y1}
                    y2={annotation.y2}
                    fill={annotation.color || "#3b82f6"}
                    fillOpacity={0.1}
                    stroke={annotation.color || "#3b82f6"}
                    strokeOpacity={0.5}
                    label={annotation.label}
                  />
                );
              }
              return null;
            })}

            {visibleAreas.map((area, index) => {
              const isHighlighted =
                hoveredArea === null || hoveredArea === area.dataKey;
              const color = area.color || colors[index % colors.length];
              const fillColor = area.fill || `url(#${getGradientId(index)})`;

              return (
                <Area
                  key={area.dataKey}
                  type="monotone"
                  dataKey={area.dataKey}
                  name={area.name || area.dataKey}
                  stroke={color}
                  fill={fillColor}
                  fillOpacity={isHighlighted ? area.fillOpacity || 0.6 : 0.1}
                  strokeWidth={area.strokeWidth || 2}
                  dot={
                    area.dot !== false
                      ? {
                          r: 4,
                          strokeWidth: 2,
                          stroke: color,
                          fill: "white",
                        }
                      : false
                  }
                  activeDot={
                    area.activeDot !== false
                      ? {
                          r: 6,
                          stroke: color,
                          strokeWidth: 2,
                          fill: color,
                        }
                      : false
                  }
                  stackId={area.stackId}
                  strokeOpacity={isHighlighted ? 1 : 0.3}
                  // Animation properties
                  isAnimationActive={animate}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              );
            })}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
);

EnhancedAreaChart.displayName = "EnhancedAreaChart";

/**
 * Enhanced RadialChart component with interactive animations
 */
export const EnhancedRadialChart = React.forwardRef(
  (
    {
      data = [],
      angleField = "value",
      colorField = "name",
      colors = ENHANCED_COLORS.primary,
      height = 300,
      innerRadius = "30%",
      outerRadius = "80%",
      startAngle = 0,
      endAngle = 360,
      title,
      subtitle,
      caption,
      info,
      className,
      chartClassName,
      animate = true,
      formatters = {},
      unit,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(-1);

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

    // Formatting helper for values
    const valueFormatter = formatters.valueFormatter || ((value) => value);

    // Create legend items with proper colors
    const legendItems = data.map((item, index) => ({
      label: item[colorField],
      value: valueFormatter(item[angleField]),
      color: colors[index % colors.length],
    }));

    return (
      <ChartWrapper
        ref={ref}
        title={
          <div className="flex items-center justify-between">
            <span>{title}</span>
            {info && <ChartInfo title={title} content={info} />}
          </div>
        }
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            data={data}
            startAngle={startAngle}
            endAngle={endAngle}
            className={chartClassName}
            barSize={10}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            <RadialBar
              label={false}
              background
              dataKey={angleField}
              nameKey={colorField}
              isAnimationActive={animate}
              animationDuration={1500}
              animationEasing="ease-in-out"
              onClick={(_, index) =>
                setActiveIndex(index === activeIndex ? -1 : index)
              }
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  opacity={
                    activeIndex === -1 || activeIndex === index ? 1 : 0.3
                  }
                  stroke="#fff"
                  strokeWidth={1}
                />
              ))}
            </RadialBar>
            <Tooltip
              content={
                <EnhancedTooltip
                  formatter={(value) =>
                    formatters.valueFormatter
                      ? formatters.valueFormatter(value)
                      : value
                  }
                  unit={unit}
                />
              }
            />
            {/* Center label for total if needed */}
            {activeIndex === -1 && (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-700 dark:fill-gray-300 font-bold text-lg"
              >
                {valueFormatter(
                  data.reduce((sum, item) => sum + item[angleField], 0)
                )}
                {unit && (
                  <tspan className="text-sm fill-gray-500 dark:fill-gray-400">
                    {unit}
                  </tspan>
                )}
              </text>
            )}
          </RadialBarChart>
        </ResponsiveContainer>

        <ChartLegend
          items={legendItems}
          className="justify-center mt-4"
          onClick={(_, index) =>
            setActiveIndex(index === activeIndex ? -1 : index)
          }
          activeIndex={activeIndex}
          orientation="horizontal"
        />
      </ChartWrapper>
    );
  }
);

EnhancedRadialChart.displayName = "EnhancedRadialChart";

/**
 * Enhanced ScatterChart for visualizing relationships between variables
 */
export const EnhancedScatterChart = React.forwardRef(
  (
    {
      data = [],
      series = [],
      xAxisKey = "x",
      yAxisKey = "y",
      zAxisKey,
      height = 300,
      grid = true,
      colors = ENHANCED_COLORS.primary,
      title,
      subtitle,
      caption,
      info,
      className,
      chartClassName,
      filterOptions,
      animate = true,
      formatters = {},
      xLabel,
      yLabel,
      zLabel,
      ...props
    },
    ref
  ) => {
    const [activeFilters, setActiveFilters] = useState(
      filterOptions ? filterOptions.map((option) => option.value) : []
    );
    const [hoveredSeries, setHoveredSeries] = useState(null);

    // Filter series based on active filters
    const visibleSeries = useMemo(() => {
      if (!filterOptions) return series;
      return series.filter((s) =>
        activeFilters.includes(s.filterValue || s.name)
      );
    }, [series, activeFilters, filterOptions]);

    // Handle filter changes
    const handleFilterChange = useCallback((newFilters) => {
      setActiveFilters(newFilters);
    }, []);

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

    // Formatting helpers
    const xFormatter = formatters.xFormatter || ((value) => value);
    const yFormatter = formatters.yFormatter || ((value) => value);
    const zFormatter = formatters.zFormatter || ((value) => value);

    return (
      <ChartWrapper
        ref={ref}
        title={
          <div className="flex items-center justify-between">
            <span>{title}</span>
            {info && <ChartInfo title={title} content={info} />}
          </div>
        }
        subtitle={subtitle}
        caption={caption}
        className={className}
        height={height}
        {...props}
      >
        {/* Controls section */}
        {filterOptions && (
          <div className="mb-4">
            <ChartFilter
              options={filterOptions}
              activeFilters={activeFilters}
              onChange={handleFilterChange}
            />
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            className={chartClassName}
            onMouseLeave={() => setHoveredSeries(null)}
          >
            {grid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                strokeOpacity={0.6}
              />
            )}
            <XAxis
              type="number"
              dataKey={xAxisKey}
              name={xLabel || xAxisKey}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickFormatter={xFormatter}
              label={
                xLabel && {
                  value: xLabel,
                  position: "bottom",
                  offset: 0,
                  fill: "#6b7280",
                }
              }
            />
            <YAxis
              type="number"
              dataKey={yAxisKey}
              name={yLabel || yAxisKey}
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickFormatter={yFormatter}
              label={
                yLabel && {
                  value: yLabel,
                  angle: -90,
                  position: "left",
                  fill: "#6b7280",
                }
              }
            />
            {zAxisKey && (
              <ZAxis
                type="number"
                dataKey={zAxisKey}
                range={[50, 1000]}
                name={zLabel || zAxisKey}
              />
            )}
            <Tooltip
              cursor={{ strokeDasharray: "3 3", stroke: "#6b7280" }}
              content={
                <EnhancedTooltip
                  formatter={(value, name) => {
                    if (name === xAxisKey || name === (xLabel || xAxisKey)) {
                      return xFormatter(value);
                    } else if (
                      name === yAxisKey ||
                      name === (yLabel || yAxisKey)
                    ) {
                      return yFormatter(value);
                    } else if (
                      name === zAxisKey ||
                      name === (zLabel || zAxisKey)
                    ) {
                      return zFormatter(value);
                    }
                    return value;
                  }}
                />
              }
            />
            <Legend
              onClick={(entry) => {
                if (filterOptions) {
                  const filterValue = entry.dataKey;
                  handleFilterChange(
                    activeFilters.includes(filterValue)
                      ? activeFilters.filter((f) => f !== filterValue)
                      : [...activeFilters, filterValue]
                  );
                }
              }}
              onMouseEnter={(entry) => setHoveredSeries(entry.dataKey)}
              onMouseLeave={() => setHoveredSeries(null)}
            />

            {/* Create scatter series */}
            {visibleSeries.map((s, index) => {
              const isHighlighted =
                hoveredSeries === null || hoveredSeries === s.name;

              return (
                <Scatter
                  key={s.name}
                  name={s.name}
                  data={s.data || data}
                  fill={s.color || colors[index % colors.length]}
                  opacity={isHighlighted ? 1 : 0.3}
                  isAnimationActive={animate}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              );
            })}
          </ScatterChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }
);

EnhancedScatterChart.displayName = "EnhancedScatterChart";

/**
 * Dashboard KPI Card Component for displaying key metrics
 */
export const KpiCard = ({
  title,
  value,
  previousValue,
  change,
  changeType = "percentage", // 'percentage', 'value', 'none'
  trend = "auto", // 'up', 'down', 'neutral', 'auto'
  trendDirection = "up", // Whether 'up' is good or bad
  icon,
  color = "blue",
  className,
  formatter,
  precision = 1,
  prefix,
  suffix,
  loading = false,
  onClick,
  hoverEffect = true,
  ...props
}) => {
  // Determine actual trend if set to auto
  const actualTrend = useMemo(() => {
    if (trend !== "auto") return trend;

    if (typeof change === "number") {
      if (change === 0) return "neutral";
      return change > 0 ? "up" : "down";
    }

    if (previousValue && value !== undefined) {
      if (value === previousValue) return "neutral";
      return value > previousValue ? "up" : "down";
    }

    return "neutral";
  }, [trend, change, previousValue, value]);

  // Calculate change if not provided
  const calculatedChange = useMemo(() => {
    if (change !== undefined) return change;

    if (previousValue && value !== undefined) {
      if (changeType === "percentage") {
        return previousValue !== 0
          ? ((value - previousValue) / Math.abs(previousValue)) * 100
          : 0;
      } else if (changeType === "value") {
        return value - previousValue;
      }
    }

    return null;
  }, [change, previousValue, value, changeType]);

  // Format the value
  const formattedValue = useMemo(() => {
    let processed = value;

    if (formatter) {
      return formatter(processed);
    }

    if (typeof processed === "number") {
      processed = processed.toLocaleString();
    }

    return (prefix || "") + processed + (suffix || "");
  }, [value, formatter, prefix, suffix]);

  // Format the change value
  const formattedChange = useMemo(() => {
    if (calculatedChange === null) return null;

    if (changeType === "none") return null;

    const sign = calculatedChange > 0 ? "+" : "";

    if (changeType === "percentage") {
      return `${sign}${calculatedChange.toFixed(precision)}%`;
    } else {
      return formatter
        ? `${sign}${formatter(calculatedChange)}`
        : `${sign}${calculatedChange.toLocaleString()}`;
    }
  }, [calculatedChange, changeType, precision, formatter]);

  // Determine if trend is positive or negative
  const isPositiveTrend = useMemo(() => {
    if (trendDirection === "up") {
      return actualTrend === "up";
    } else {
      return actualTrend === "down";
    }
  }, [actualTrend, trendDirection]);

  // Color configurations
  const colorConfig = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-100 dark:border-blue-800/30",
      text: "text-blue-600 dark:text-blue-400",
      icon: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-100 dark:border-green-800/30",
      text: "text-green-600 dark:text-green-400",
      icon: "bg-green-500/10 text-green-500 dark:text-green-400",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-100 dark:border-red-800/30",
      text: "text-red-600 dark:text-red-400",
      icon: "bg-red-500/10 text-red-500 dark:text-red-400",
    },
    yellow: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-100 dark:border-amber-800/30",
      text: "text-amber-600 dark:text-amber-400",
      icon: "bg-amber-500/10 text-amber-500 dark:text-amber-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-100 dark:border-purple-800/30",
      text: "text-purple-600 dark:text-purple-400",
      icon: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
    },
    gray: {
      bg: "bg-gray-50 dark:bg-gray-800/50",
      border: "border-gray-100 dark:border-gray-700",
      text: "text-gray-600 dark:text-gray-400",
      icon: "bg-gray-500/10 text-gray-500 dark:text-gray-400",
    },
  };

  const colors = colorConfig[color] || colorConfig.blue;

  // Trend icon based on actual trend
  const TrendIcon = () => {
    if (actualTrend === "up") {
      return (
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isPositiveTrend ? "text-green-500" : "text-red-500"
          )}
        >
          <TrendingUp className="h-3 w-3" />
          {formattedChange}
        </div>
      );
    } else if (actualTrend === "down") {
      return (
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isPositiveTrend ? "text-green-500" : "text-red-500"
          )}
        >
          <TrendingDown className="h-3 w-3" />
          {formattedChange}
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "rounded-lg p-4 border shadow-sm",
        colors.bg,
        colors.border,
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

          {loading ? (
            <div className="animate-pulse h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ) : (
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {formattedValue}
              </h3>
              {calculatedChange !== null && <TrendIcon />}
            </div>
          )}
        </div>

        {icon && (
          <div className={cn("p-2 rounded-lg", colors.icon)}>{icon}</div>
        )}
      </div>
    </motion.div>
  );
};

KpiCard.displayName = "KpiCard";

/**
 * SparklineCard combines a KPI with a small inline chart
 */
export const SparklineCard = ({
  title,
  value,
  change,
  sparklineData,
  sparklineKey = "value",
  sparklineType = "line", // line, area, bar
  color = "blue",
  icon,
  formatter,
  className,
  ...props
}) => {
  const colorConfig = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-100 dark:border-blue-800/30",
      text: "text-blue-600 dark:text-blue-400",
      icon: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
      chart: "#3b82f6",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-100 dark:border-green-800/30",
      text: "text-green-600 dark:text-green-400",
      icon: "bg-green-500/10 text-green-500 dark:text-green-400",
      chart: "#10b981",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-100 dark:border-red-800/30",
      text: "text-red-600 dark:text-red-400",
      icon: "bg-red-500/10 text-red-500 dark:text-red-400",
      chart: "#ef4444",
    },
    yellow: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-100 dark:border-amber-800/30",
      text: "text-amber-600 dark:text-amber-400",
      icon: "bg-amber-500/10 text-amber-500 dark:text-amber-400",
      chart: "#f59e0b",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-100 dark:border-purple-800/30",
      text: "text-purple-600 dark:text-purple-400",
      icon: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
      chart: "#8b5cf6",
    },
  };

  const colors = colorConfig[color] || colorConfig.blue;

  // Determine if trend is positive
  const isPositive = change >= 0;

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-lg p-4 border shadow-sm",
        colors.bg,
        colors.border,
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatter ? formatter(value) : value}
            </h3>
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium pb-1",
                isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositive ? "+" : ""}
              {change}%
            </div>
          </div>
        </div>

        {icon && (
          <div className={cn("p-2 rounded-lg", colors.icon)}>{icon}</div>
        )}
      </div>

      {sparklineData && sparklineData.length > 0 && (
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            {sparklineType === "line" && (
              <RechartsLineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey={sparklineKey}
                  stroke={colors.chart}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                />
              </RechartsLineChart>
            )}

            {sparklineType === "area" && (
              <RechartsAreaChart data={sparklineData}>
                <defs>
                  <linearGradient
                    id={`sparklineGradient-${color}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={colors.chart}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors.chart}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey={sparklineKey}
                  stroke={colors.chart}
                  fillOpacity={1}
                  fill={`url(#sparklineGradient-${color})`}
                  isAnimationActive={true}
                />
              </RechartsAreaChart>
            )}

            {sparklineType === "bar" && (
              <RechartsBarChart data={sparklineData}>
                <Bar
                  dataKey={sparklineKey}
                  fill={colors.chart}
                  isAnimationActive={true}
                  radius={[2, 2, 0, 0]}
                />
              </RechartsBarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};

SparklineCard.displayName = "SparklineCard";

/**
 * Dashboard Grid Layout Component
 */
export const DashboardGrid = ({
  children,
  columns = 3,
  gap = "md",
  className,
  ...props
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    "2-1": "grid-cols-1 md:grid-cols-3", // First item spans 2, second spans 1
    "1-2": "grid-cols-1 md:grid-cols-3", // First item spans 1, second spans 2
  };

  const gapSizes = {
    sm: "gap-3",
    md: "gap-5",
    lg: "gap-8",
  };

  return (
    <div
      className={cn(
        "grid",
        gridCols[columns] || gridCols[3],
        gapSizes[gap] || gapSizes.md,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

DashboardGrid.displayName = "DashboardGrid";

/**
 * Dashboard Grid Item
 */
export const DashboardGridItem = ({
  children,
  span = 1,
  className,
  ...props
}) => {
  const spanClasses = {
    1: "",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    "2-1": "md:col-span-2", // For first item in a 2-1 layout
    "1-2": "md:col-span-1", // For first item in a 1-2 layout
  };

  return (
    <div className={cn(spanClasses[span] || "", className)} {...props}>
      {children}
    </div>
  );
};

DashboardGridItem.displayName = "DashboardGridItem";

export {
  ENHANCED_COLORS,
  EnhancedTooltip,
  ChartFilter,
  TimeRangeSelector,
  ChartInfo,
};
