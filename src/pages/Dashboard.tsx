import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Switch } from "../components/ui/switch";

const chartData = [
  { month: "10", desktop: 186 },
  { month: "11", desktop: 305 },
  { month: "12", desktop: 237 },
  { month: "13", desktop: 73 },
  { month: "14", desktop: 209 },
  { month: "15", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#ADB7F9",
  },
} satisfies ChartConfig;

const WatchlistCard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDetailsClick = () => {
    navigate("/secondarychart"); // Navigate to the SecondaryChart page
  };
  const data = [
    {
      company: "Amazon",
      name: "Amazon Inc",
      price: "1658.00",
      trend: "up",
    },
    {
      company: "Netflix",
      name: "Netflix Inc",
      price: "1658.00",
      trend: "down",
    },
    {
      company: "Amazon",
      name: "Amazon Inc",
      price: "1658.00",
      trend: "up",
    },
  ];

  return (
    <Card className="mt-8 shadow-md">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Watchlist</CardTitle>
          <CardDescription className="text-sm">Daily Average</CardDescription>
        </div>
        <p className="text-sm text-blue-600 cursor-pointer">Price ▼</p>
      </CardHeader>
      <CardContent>
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b last:border-none"
          >
            <div>
              <h2 className="text-sm font-semibold">{item.company}</h2>
              <p className="text-xs text-gray-500">{item.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">{item.price}</span>
              {item.trend === "up" ? (
                <TrendingUp className="text-green-500" />
              ) : (
                <TrendingDown className="text-red-500" />
              )}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <button
          onClick={handleDetailsClick}
          className="w-full py-2 text-center text-sm font-semibold text-blue-600 bg-blue-100 rounded"
        >
          Details
        </button>
      </CardFooter>
    </Card>
  );
};

export default function Dashboard() {
  return (
    <>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="w-full h-30 sm:h-auto shadow-md cursor-pointer"
          >
            <CardHeader>
              <CardTitle className="font-semibold text-sm">
                Create project {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form></form>
            </CardContent>
            <CardFooter className="flex justify-between font-normal text-xs">
              <h1 className="font-bold text-sm">50 PSI</h1>
              <p className="text-xs">optimum</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Graph */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>
              Ps-1 Graph &#160;&#160;&#160;&#160;&#160;
              <Switch />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="relative w-full h-64"
            >
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12, top: 24, bottom: 24 }}
                width={800} // Set fixed width
                height={400} // Set fixed height
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="#ADB7F9"
                  fillOpacity={0.4}
                  stroke="#001DFF"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Watchlist Card */}
      <WatchlistCard />
      <br />
      <br />
    </>
  );
}
