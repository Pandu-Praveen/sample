import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import sampleLogo from "../img/samplelogo.png";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Switch } from "../components/ui/switch";
import { useSensorData } from "@/hooks/useSensorData";
import { ArrowLeft } from "lucide-react";

// const data = [
//   {
//     timestamp: "2024-08-24 11:11:11",
//     airFilterVacuumPressure: 29.8,
//     currentSensor: 10,
//     dischargePressureSensor: 12.5,
//     drainValvePressureOutlet: 0.5,
//     machine: 1,
//     oilPressureInlet: 30.2,
//     oilPressureOutlet: 28.9,
//     oilTemperatureSensor: 150,
//     voltageSensor: 120,
//   },
//   {
//     timestamp: "2024-08-24 12:30:38",
//     airFilterVacuumPressure: 700,
//     currentSensor: 56,
//     dischargePressureSensor: 577,
//     drainValvePressureOutlet: 693,
//     machine: 1,
//     oilPressureInlet: 15005,
//     oilPressureOutlet: 5090,
//     oilTemperatureSensor: 53,
//     voltageSensor: 156,
//   },
//   {
//     timestamp: "2024-08-24 12:30:52",
//     airFilterVacuumPressure: 181,
//     currentSensor: 32,
//     dischargePressureSensor: 522,
//     drainValvePressureOutlet: 478,
//     machine: 1,
//     oilPressureInlet: 5834,
//     oilPressureOutlet: 6100,
//     oilTemperatureSensor: 134,
//     voltageSensor: 207,
//   },
//   {
//     timestamp: "2024-08-24 12:30:54",
//     airFilterVacuumPressure: 1483,
//     currentSensor: 24,
//     dischargePressureSensor: 680,
//     drainValvePressureOutlet: 1538,
//     machine: 1,
//     oilPressureInlet: 9196,
//     oilPressureOutlet: 13852,
//     oilTemperatureSensor: 87,
//     voltageSensor: 429,
//   },
//   {
//     timestamp: "2024-08-24 12:40:11",
//     airFilterVacuumPressure: 29.8,
//     currentSensor: 10,
//     dischargePressureSensor: 12.5,
//     drainValvePressureOutlet: 0.5,
//     machine: 1,
//     oilPressureInlet: 30.2,
//     oilPressureOutlet: 28.9,
//     oilTemperatureSensor: 150,
//     voltageSensor: 120,
//   },
//   {
//     timestamp: "2024-08-24 12:50:38",
//     airFilterVacuumPressure: 700,
//     currentSensor: 56,
//     dischargePressureSensor: 577,
//     drainValvePressureOutlet: 693,
//     machine: 1,
//     oilPressureInlet: 15005,
//     oilPressureOutlet: 5090,
//     oilTemperatureSensor: 53,
//     voltageSensor: 156,
//   },
//   {
//     timestamp: "2024-08-24 12:59:52",
//     airFilterVacuumPressure: 181,
//     currentSensor: 32,
//     dischargePressureSensor: 522,
//     drainValvePressureOutlet: 478,
//     machine: 1,
//     oilPressureInlet: 5834,
//     oilPressureOutlet: 6100,
//     oilTemperatureSensor: 134,
//     voltageSensor: 207,
//   },
//   {
//     timestamp: "2024-08-24 13:00:54",
//     airFilterVacuumPressure: 1483,
//     currentSensor: 24,
//     dischargePressureSensor: 680,
//     drainValvePressureOutlet: 1538,
//     machine: 1,
//     oilPressureInlet: 9196,
//     oilPressureOutlet: 13852,
//     oilTemperatureSensor: 87,
//     voltageSensor: 429,
//   },
//   {
//     timestamp: "2024-08-24 13:11:11",
//     airFilterVacuumPressure: 29.8,
//     currentSensor: 10,
//     dischargePressureSensor: 12.5,
//     drainValvePressureOutlet: 0.5,
//     machine: 1,
//     oilPressureInlet: 30.2,
//     oilPressureOutlet: 28.9,
//     oilTemperatureSensor: 150,
//     voltageSensor: 120,
//   },
//   {
//     timestamp: "2024-08-24 13:20:38",
//     airFilterVacuumPressure: 700,
//     currentSensor: 56,
//     dischargePressureSensor: 577,
//     drainValvePressureOutlet: 693,
//     machine: 1,
//     oilPressureInlet: 15005,
//     oilPressureOutlet: 5090,
//     oilTemperatureSensor: 53,
//     voltageSensor: 156,
//   },
//   {
//     timestamp: "2024-08-24 13:30:52",
//     airFilterVacuumPressure: 181,
//     currentSensor: 32,
//     dischargePressureSensor: 522,
//     drainValvePressureOutlet: 478,
//     machine: 1,
//     oilPressureInlet: 5834,
//     oilPressureOutlet: 6100,
//     oilTemperatureSensor: 134,
//     voltageSensor: 207,
//   },
//   {
//     timestamp: "2024-08-24 13:50:54",
//     airFilterVacuumPressure: 1483,
//     currentSensor: 24,
//     dischargePressureSensor: 680,
//     drainValvePressureOutlet: 1538,
//     machine: 1,
//     oilPressureInlet: 9196,
//     oilPressureOutlet: 13852,
//     oilTemperatureSensor: 87,
//     voltageSensor: 429,
//   },
//   {
//     timestamp: "2024-08-24 14:00:11",
//     airFilterVacuumPressure: 29.8,
//     currentSensor: 10,
//     dischargePressureSensor: 12.5,
//     drainValvePressureOutlet: 0.5,
//     machine: 1,
//     oilPressureInlet: 30.2,
//     oilPressureOutlet: 28.9,
//     oilTemperatureSensor: 150,
//     voltageSensor: 120,
//   },
//   {
//     timestamp: "2024-08-24 14:15:38",
//     airFilterVacuumPressure: 700,
//     currentSensor: 56,
//     dischargePressureSensor: 577,
//     drainValvePressureOutlet: 693,
//     machine: 1,
//     oilPressureInlet: 15005,
//     oilPressureOutlet: 5090,
//     oilTemperatureSensor: 53,
//     voltageSensor: 156,
//   },
//   {
//     timestamp: "2024-08-24 14:30:52",
//     airFilterVacuumPressure: 181,
//     currentSensor: 32,
//     dischargePressureSensor: 522,
//     drainValvePressureOutlet: 478,
//     machine: 1,
//     oilPressureInlet: 5834,
//     oilPressureOutlet: 6100,
//     oilTemperatureSensor: 134,
//     voltageSensor: 207,
//   },
//   {
//     timestamp: "2024-08-24 14:40:54",
//     airFilterVacuumPressure: 1483,
//     currentSensor: 24,
//     dischargePressureSensor: 680,
//     drainValvePressureOutlet: 1538,
//     machine: 1,
//     oilPressureInlet: 9196,
//     oilPressureOutlet: 13852,
//     oilTemperatureSensor: 87,
//     voltageSensor: 429,
//   },
// ];

const label = [
  { label: "Pressure Sensor", key: "dischargePressureSensor" },
  { label: "Voltage sensor", key: "voltageSensor" },
  { label: "Current sensor ", key: "currentSensor" },
  { label: "Power", key: "power" },
  { label: "Energy", key: "energy" },
  // { label: "Oil pressure inlet", key: "oilPressureInlet" },
  // { label: "Oil pressure outlet", key: "oilPressureOutlet" },
  { label: "Air filter Vacuum pressure", key: "airFilterVacuumPressure" },
  { label: "Drain valve pressure outlet", key: "drainValvePressureOutlet" },
];
// Chart configuration
const chartColors = [
  "#FF0000",
  // "#FF8700",
  "#FFD300",
  "#FF33B1",
  // "#DEFF0A",
  // "#33FFA1",
  "#e0aaff",
  "#A1FF0A",
  "#0AEFFF",
  "#344e41",
  "#BE0AFF",
];
const chartConfig = {} satisfies ChartConfig;

label.map((detail, i) => {
  // @ts-ignore
  chartConfig[detail.key] = {
    label: detail.label,
    color: chartColors[i],
  };
});

const Dashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  /** Calling custom hook to retrieve data */
  const { derivedData, isLoading, data, transformedData } = useSensorData();

  const [showContent, setShowContent] = useState(!isLoading);

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
  };

  const backtomainpage = () => {
    setSelectedIndex(null);
  };

  /** Use effect for dashboard loading effect */
  useEffect(() => {
    setShowContent(!isLoading);
  }, [isLoading]);
  console.log(derivedData,"data:",data,transformedData);
  return (
    <>
      {!showContent ? (
        <div className="centered-container">
          <div className="centered-container">
            <img
              src={sampleLogo} // Update with the actual path to your image
              alt="Blinking"
              className={"blink-effect"}
              style={{ width: "450px", height: "auto" }} // Optional: Adjust size
            />
          </div>
        </div>
      ) : (
        <div>
          {selectedIndex === null ? (
            <>
              {/* Cards */}
              <div className="grid grid-cols-2 gap-4">
                {label.map((_, index) => (
                  <Card
                    key={index}
                    className={`w-full h-30 sm:h-auto shadow-md cursor-pointer ${
                      selectedIndex === index ? "bg-blue-100" : ""
                    }`}
                    onClick={() => handleCardClick(index)}
                  >
                    <CardHeader>
                      <CardTitle className="font-semibold text-sm">
                        {label[index].label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form></form>
                    </CardContent>
                    <CardFooter className="flex justify-between font-normal text-xs">
                      {/* // @ts-ignore */}
                      <h1 className="font-bold text-sm">
                        {data
                          ? data.at(-1)?.[
                              label[index].key as keyof (typeof data)[0]
                            ]
                          : "Loading..."}
                          {label[index].label=="Energy"?
                            derivedData ? derivedData.energy.toFixed(2) : 0
                            :""}
                          {label[index].label=="Power"?
                            derivedData ? derivedData.power.toFixed(2) : 0
                            :""}
                      </h1>
                      {/* {(data.at(-1).something === somevalue)? <p>display smth</p>: <p>smth else</p>} */}
                      <p className="text-xs">optimum</p>
                    </CardFooter>
                  </Card>
                ))}
                <Card className="hidden md:block">
                  <br />
                  <CardContent className=" grid gap-4">
                    <p className="font-semibold text-sm">
                      Compressor running duration load :{" "}
                      {derivedData ? derivedData.compressorLoad.toFixed(2) : 0}
                    </p>
                    <p className="font-semibold text-sm">
                      Compressor running duration unload :{" "}
                      {derivedData
                        ? derivedData.compressorUnload.toFixed(2)
                        : 0}
                    </p>
                  </CardContent>
                </Card>
                <Card className="hidden md:block">
                  <br />
                  <CardContent className="grid gap-4">
                    <p className="font-semibold text-sm">
                      Oil filter condition :{" "}
                      {derivedData ? derivedData.oilFilterCondition : 0}
                    </p>
                    <p className="font-semibold text-sm">
                      Oil temperature condition :{" "}
                      {derivedData ? derivedData.oilTemperatureCondition : 0}
                    </p>
                  </CardContent>
                </Card>
                <Card className="hidden md:block ">
                  <br />
                  <CardContent className="grid gap-4">
                    <p className="font-semibold text-sm">
                      Air filter condition :{" "}
                      {derivedData ? derivedData.airFilterCondition : 0}
                    </p>
                    <p className="font-semibold text-sm">
                      Drain duration :{" "}
                      {derivedData ? derivedData.drainDuration.toFixed(2) : 0}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <br />
              <Card className="md:hidden grid gap-4">
                <br />
                <CardContent className="grid gap-4">
                  <p className="font-semibold text-sm">
                    Compressor running duration load :{" "}
                    {derivedData ? derivedData.compressorLoad.toFixed(2) : 0}
                  </p>
                  <p className="font-semibold text-sm">
                    Compressor running duration unload :{" "}
                    {derivedData
                        ? derivedData.compressorUnload.toFixed(2)
                        : 0}
                  </p>
                  <p className="font-semibold text-sm">
                    Oil filter condition :{" "}
                    {derivedData ? derivedData.oilFilterCondition : 0}
                  </p>
                  {/* <p className="font-semibold text-sm">
                    Oil temperature sensor :{" "}
                  </p> */}
                  <p className="font-semibold text-sm">
                    Oil temperature condition :{" "}
                    {derivedData ? derivedData.oilTemperatureCondition : 0}
                  </p>
                  <p className="font-semibold text-sm">
                    Air filter condition :{" "}
                    {derivedData ? derivedData.airFilterCondition : 0}
                  </p>
                  <p className="font-semibold text-sm">Drain duration :{" "}
                    {derivedData ? derivedData.drainDuration.toFixed(2) : 0}
                  </p>
                </CardContent>
              </Card>

              {/* Graph */}
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Overall Graph &#160;&#160;&#160;&#160;&#160;
                      <Switch />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={chartConfig}
                      className="relative w-full"
                    >
                      <AreaChart
                        accessibilityLayer
                        data={transformedData}
                        margin={{ left: 12, right: 12, top: 24, bottom: 24 }}
                        width={800} // Set fixed width
                        height={200} // Set fixed height
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="time"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="line" />}
                        />
                        {Object.keys(chartConfig).map((chart) => (
                          <Area
                            key={chart}
                            dataKey={chart}
                            // @ts-ignore
                            label={chartConfig[chart].label}
                            type="natural"
                            // @ts-ignore
                            fill={chartConfig[chart].color}
                            fillOpacity={0}
                            // @ts-ignore
                            stroke={chartConfig[chart].color}
                          />
                        ))}
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="mt-8">
              <Card>
                <CardHeader className="flex flex-row gap-6">
                  <button
                    onClick={backtomainpage}
                    className="p-2 flex items-center justify-center gap-3 text-center text-sm font-semibold text-blue-600 bg-blue-100 rounded"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <CardTitle>
                    {label[selectedIndex].label} Graph
                    &#160;&#160;&#160;&#160;&#160;
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
                      data={transformedData}
                      margin={{ left: 12, right: 12, top: 24, bottom: 24 }}
                      width={800} // Set fixed width
                      height={400} // Set fixed height
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        // tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Area
                        dataKey={`${label[selectedIndex].key}`}
                        type="natural"
                        // @ts-ignore
                        fill={`${chartConfig[label[selectedIndex].key].color}`}
                        fillOpacity={0.4}
                        // @ts-ignore
                        stroke={`${chartConfig[label[selectedIndex].key].color}`}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          )}
          <br />
          <br />
        </div>
      )}
      ;
    </>
  );
};

export default Dashboard;
