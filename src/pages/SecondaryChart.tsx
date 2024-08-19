import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData24hrs = [
  { time: "9 am", desktop: 186 },
  { time: "10 am", desktop: 305 },
  { time: "11 am", desktop: 237 },
  { time: "12 pm", desktop: 73 },
  { time: "1 pm", desktop: 209 },
  { time: "2 pm", desktop: 214 },
];

const chartData10days = [
  { day: "Day 1", desktop: 300 },
  { day: "Day 2", desktop: 450 },
  { day: "Day 3", desktop: 500 },
  { day: "Day 4", desktop: 600 },
  { day: "Day 5", desktop: 700 },
  { day: "Day 6", desktop: 650 },
  { day: "Day 7", desktop: 800 },
  { day: "Day 8", desktop: 900 },
  { day: "Day 9", desktop: 750 },
  { day: "Day 10", desktop: 850 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SecondaryChart() {
  const [selectedTab, setSelectedTab] = useState("24hrs");

  return (
    <Card className="w-full max-w-lg mx-auto p-4 bg-white rounded-md shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-bold">PT-100</CardTitle>
      </CardHeader>
      <Tabs
        defaultValue="24hrs"
        onValueChange={(value) => setSelectedTab(value)}
        className="mb-4"
      >
        <TabsList className="flex justify-center mb-4">
          <TabsTrigger value="24hrs" className="w-1/2 text-sm">
            Last 24 hours
          </TabsTrigger>
          <TabsTrigger value="10days" className="w-1/2 text-sm">
            Last 10 days
          </TabsTrigger>
        </TabsList>

        <div className="text-center mb-4">
          <p className="text-xl font-semibold">Last Value: 29°C</p>
          <p className="text-gray-500">8:00 PM</p>
        </div>

        <CardContent className="mt-4">
          <h3 className="text-center text-sm font-bold mb-2">STATS</h3>
          <TabsContent value="24hrs">
            <ChartContainer config={chartConfig}>
              <BarChart
                width={300}
                height={200}
                data={chartData24hrs}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  width={40}
                  style={{ fontSize: "12px" }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="desktop"
                  fill="var(--color-desktop)"
                  radius={8}
                  barSize={30}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="10days">
            <ChartContainer config={chartConfig}>
              <BarChart
                width={300}
                height={200}
                data={chartData10days}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  width={40}
                  style={{ fontSize: "12px" }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="desktop"
                  fill="var(--color-desktop)"
                  radius={8}
                  barSize={30}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </CardContent>
      </Tabs>
      <CardFooter className="flex-col items-center gap-2 text-sm mt-4">
        <div className="text-gray-500">
          {selectedTab === "24hrs"
            ? "showing details for Last 24 hours"
            : "showing details for Last 10 days"}{" "}
          <TrendingUp className="h-4 w-4 inline" />
        </div>
        <button className="mt-4 bg-gray-200 text-gray-600 px-4 py-2 rounded-md">
          Download previous data
        </button>
      </CardFooter>
      <br />
    </Card>
  );
}
