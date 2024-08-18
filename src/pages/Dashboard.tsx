import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
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

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  return (
    <>
      <br />
      {selectedCard === null ? (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="w-full h-30 sm:h-auto shadow-md cursor-pointer"
              onClick={() => handleCardClick(index)}
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
      ) : (
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
      )}
      {selectedCard !== null && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setSelectedCard(null)}
        >
          Back to Cards
        </button>
      )}
    </>
  );
}
