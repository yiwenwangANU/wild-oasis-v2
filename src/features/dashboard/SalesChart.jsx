import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/darkModeContext";
import { format, parseISO, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const getSaleData = (days, recentBookings) => {
  let data = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    data.push({
      label: format(subDays(today, i), "MMM dd"),
      totalSales: 0,
      extrasSales: 0,
    });
  }

  const formatedBookings = recentBookings.map((booking) => ({
    ...booking,
    created_at: format(parseISO(booking.created_at), "MMM dd"),
  }));

  for (let booking of formatedBookings)
    for (let item of data) {
      if (booking.created_at === item.label) {
        item.totalSales = item.totalSales + booking.totalPrice;
        item.extrasSales = item.extrasSales + booking.extrasPrice;
      }
    }
  return data;
};
function SalesChart({ days, recentBookings }) {
  const { theme: isDarkMode } = useDarkMode();
  getSaleData(days, recentBookings);
  // console.log(recentBookings);
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">Sales</Heading>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={getSaleData(days, recentBookings)}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" tick={{ fill: colors.text }} />
          <YAxis
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            tick={{ fill: colors.text }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            type="monotone"
            dataKey="totalSales"
            name="Total Sales"
            stroke={colors.totalSales.stroke}
            strokeWidth={2}
            fillOpacity={0.6}
            fill={colors.totalSales.fill}
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            name="Extra Sales"
            stroke={colors.extrasSales.stroke}
            strokeWidth={2}
            fillOpacity={0.6}
            fill={colors.extrasSales.fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
