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

interface SensorData {
  airFilterVaccumPressure: number;
  currentSensor: number;
  dischargePressureSensor: number;
  drainValvePressureOutlet: number;
  machine: number;
  oilPressureInlet: number;
  oilPressureOutlet: number;
  oilTemperatureSensor: number;
  voltageSensor: number;
}

interface TransformedData {
  timestamp: string;
  airFilterVaccumPressure: number;
  currentSensor: number;
  dischargePressureSensor: number;
  drainValvePressureOutlet: number;
  machine: number;
  oilPressureInlet: number;
  oilPressureOutlet: number;
  oilTemperatureSensor: number;
  voltageSensor: number;
}

interface ChartData24hrs {
  time: number; // or string if you plan to use a different format
  pressureSensor: number;
  voltageSensor: number;
  currentSensor: number;
  power: number;
  energy: number;
  oilPressureInlet: number;
  oilPressureOutlet: number;
  airFilterVaccumPressure: number;
  drainValvePressureOutlet: number;
}

const data = [
  {
    timestamp: "2024-08-24 11:11:11",
    airFilterVaccumPressure: 29.8,
    currentSensor: 10,
    dischargePressureSensor: 12.5,
    drainValvePressureOutlet: 0.5,
    machine: 1,
    oilPressureInlet: 30.2,
    oilPressureOutlet: 28.9,
    oilTemperatureSensor: 150,
    voltageSensor: 120,
  },
  {
    timestamp: "2024-08-24 12:30:38",
    airFilterVaccumPressure: 700,
    currentSensor: 56,
    dischargePressureSensor: 577,
    drainValvePressureOutlet: 693,
    machine: 1,
    oilPressureInlet: 15005,
    oilPressureOutlet: 5090,
    oilTemperatureSensor: 53,
    voltageSensor: 156,
  },
  {
    timestamp: "2024-08-24 12:30:52",
    airFilterVaccumPressure: 181,
    currentSensor: 32,
    dischargePressureSensor: 522,
    drainValvePressureOutlet: 478,
    machine: 1,
    oilPressureInlet: 5834,
    oilPressureOutlet: 6100,
    oilTemperatureSensor: 134,
    voltageSensor: 207,
  },
  {
    timestamp: "2024-08-24 12:30:54",
    airFilterVaccumPressure: 1483,
    currentSensor: 24,
    dischargePressureSensor: 680,
    drainValvePressureOutlet: 1538,
    machine: 1,
    oilPressureInlet: 9196,
    oilPressureOutlet: 13852,
    oilTemperatureSensor: 87,
    voltageSensor: 429,
  },
  {
    timestamp: "2024-08-24 12:40:11",
    airFilterVaccumPressure: 29.8,
    currentSensor: 10,
    dischargePressureSensor: 12.5,
    drainValvePressureOutlet: 0.5,
    machine: 1,
    oilPressureInlet: 30.2,
    oilPressureOutlet: 28.9,
    oilTemperatureSensor: 150,
    voltageSensor: 120,
  },
  {
    timestamp: "2024-08-24 12:50:38",
    airFilterVaccumPressure: 700,
    currentSensor: 56,
    dischargePressureSensor: 577,
    drainValvePressureOutlet: 693,
    machine: 1,
    oilPressureInlet: 15005,
    oilPressureOutlet: 5090,
    oilTemperatureSensor: 53,
    voltageSensor: 156,
  },
  {
    timestamp: "2024-08-24 12:59:52",
    airFilterVaccumPressure: 181,
    currentSensor: 32,
    dischargePressureSensor: 522,
    drainValvePressureOutlet: 478,
    machine: 1,
    oilPressureInlet: 5834,
    oilPressureOutlet: 6100,
    oilTemperatureSensor: 134,
    voltageSensor: 207,
  },
  {
    timestamp: "2024-08-24 13:00:54",
    airFilterVaccumPressure: 1483,
    currentSensor: 24,
    dischargePressureSensor: 680,
    drainValvePressureOutlet: 1538,
    machine: 1,
    oilPressureInlet: 9196,
    oilPressureOutlet: 13852,
    oilTemperatureSensor: 87,
    voltageSensor: 429,
  },
  {
    timestamp: "2024-08-24 13:11:11",
    airFilterVaccumPressure: 29.8,
    currentSensor: 10,
    dischargePressureSensor: 12.5,
    drainValvePressureOutlet: 0.5,
    machine: 1,
    oilPressureInlet: 30.2,
    oilPressureOutlet: 28.9,
    oilTemperatureSensor: 150,
    voltageSensor: 120,
  },
  {
    timestamp: "2024-08-24 13:20:38",
    airFilterVaccumPressure: 700,
    currentSensor: 56,
    dischargePressureSensor: 577,
    drainValvePressureOutlet: 693,
    machine: 1,
    oilPressureInlet: 15005,
    oilPressureOutlet: 5090,
    oilTemperatureSensor: 53,
    voltageSensor: 156,
  },
  {
    timestamp: "2024-08-24 13:30:52",
    airFilterVaccumPressure: 181,
    currentSensor: 32,
    dischargePressureSensor: 522,
    drainValvePressureOutlet: 478,
    machine: 1,
    oilPressureInlet: 5834,
    oilPressureOutlet: 6100,
    oilTemperatureSensor: 134,
    voltageSensor: 207,
  },
  {
    timestamp: "2024-08-24 13:50:54",
    airFilterVaccumPressure: 1483,
    currentSensor: 24,
    dischargePressureSensor: 680,
    drainValvePressureOutlet: 1538,
    machine: 1,
    oilPressureInlet: 9196,
    oilPressureOutlet: 13852,
    oilTemperatureSensor: 87,
    voltageSensor: 429,
  },
  {
    timestamp: "2024-08-24 14:00:11",
    airFilterVaccumPressure: 29.8,
    currentSensor: 10,
    dischargePressureSensor: 12.5,
    drainValvePressureOutlet: 0.5,
    machine: 1,
    oilPressureInlet: 30.2,
    oilPressureOutlet: 28.9,
    oilTemperatureSensor: 150,
    voltageSensor: 120,
  },
  {
    timestamp: "2024-08-24 14:15:38",
    airFilterVaccumPressure: 700,
    currentSensor: 56,
    dischargePressureSensor: 577,
    drainValvePressureOutlet: 693,
    machine: 1,
    oilPressureInlet: 15005,
    oilPressureOutlet: 5090,
    oilTemperatureSensor: 53,
    voltageSensor: 156,
  },
  {
    timestamp: "2024-08-24 14:30:52",
    airFilterVaccumPressure: 181,
    currentSensor: 32,
    dischargePressureSensor: 522,
    drainValvePressureOutlet: 478,
    machine: 1,
    oilPressureInlet: 5834,
    oilPressureOutlet: 6100,
    oilTemperatureSensor: 134,
    voltageSensor: 207,
  },
  {
    timestamp: "2024-08-24 14:40:54",
    airFilterVaccumPressure: 1483,
    currentSensor: 24,
    dischargePressureSensor: 680,
    drainValvePressureOutlet: 1538,
    machine: 1,
    oilPressureInlet: 9196,
    oilPressureOutlet: 13852,
    oilTemperatureSensor: 87,
    voltageSensor: 429,
  },
];

const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;
const oneDayInMs = 24 * 60 * 60 * 1000;

const currtimehr = new Date("2024-08-24T14:40:54").getHours();
const currtime = new Date("2024-08-24T14:40:54").getTime();

let ps = 0,
  vs = 0,
  cs = 0,
  p = 0,
  e = 0,
  opi = 0,
  opo = 0,
  afvp = 0,
  dvpo = 0;
let psd = 0,
  vsd = 0,
  csd = 0,
  pd = 0,
  ed = 0,
  opid = 0,
  opod = 0,
  afvpd = 0,
  dvpod = 0;

const chartData24hrs: ChartData24hrs[] = [];
const chartData10days = [];

const hrsdiff = 60 * 60 * 1000;

let flag = 1;

async function calculatingdata() {
  for (let i = data.length - 1; i >= 0; i--) {
    let j = 0;
    const currdatatime = new Date(
      data[i].timestamp.replace(" ", "T")
    ).getTime();
    const timediff = currtime - currdatatime;
    if (timediff <= oneDayInMs) {
      if (hrsdiff * flag >= currtime - currdatatime) {
        ps += data[i].dischargePressureSensor;
        vs += data[i].voltageSensor;
        cs += data[i].currentSensor;
        let cp =
          (1.732 * data[i].voltageSensor * data[i].currentSensor * 0.8) / 1000;
        let elapsedTime;
        if (i - 1 > 0) {
          elapsedTime =
            new Date(data[i].timestamp.replace(" ", "T")).getTime() -
            new Date(data[i - 1].timestamp.replace(" ", "T")).getTime();
        } else {
          elapsedTime = 0;
        }
        p += cp;
        e += cp * elapsedTime;
        opi += data[i].oilPressureInlet;
        opo += data[i].oilPressureOutlet;
        afvp += data[i].airFilterVaccumPressure;
        dvpo += data[i].drainValvePressureOutlet;
      } else {
        i += 1;
        chartData24hrs.push({
          time: currtimehr - flag,
          pressureSensor: ps,
          voltageSensor: vs,
          currentSensor: cs,
          power: p,
          energy: e,
          oilPressureInlet: opi,
          oilPressureOutlet: opo,
          airFilterVaccumPressure: afvp,
          drainValvePressureOutlet: dvpo,
        });
        flag++;
        ps = vs = cs = p = e = opi = opo = afvp = dvpo = 0;
      }
    } else if (timediff <= tenDaysInMs) {
      if (j == 0) {
      }
      console.log(currdatatime, currtime, timediff, tenDaysInMs);
    } else {
      break;
    }
  }
  console.log(chartData24hrs);
  // console.log(ps,vs,cs,cp,elapsedTime,p,e,opi,opo,afvp,dvpo)
}

function aggregateDataByHour(Data: typeof data) {
  const result = {};

  Data.forEach(entry => {
    const hour = new Date(entry.timestamp).getHours();
    // @ts-ignore
    if (!result[hour]) {
      // @ts-ignore
      result[hour] = {
        time: hour,
        airFilterVaccumPressure: 0,
        currentSensor: 0,
        dischargePressureSensor: 0,
        drainValvePressureOutlet: 0,
        oilPressureInlet: 0,
        oilPressureOutlet: 0,
        oilTemperatureSensor: 0,
        voltageSensor: 0,
        count: 0
      };
    }

    result[hour].airFilterVaccumPressure += entry.airFilterVaccumPressure;
    result[hour].currentSensor += entry.currentSensor;
    result[hour].dischargePressureSensor += entry.dischargePressureSensor;
    result[hour].drainValvePressureOutlet += entry.drainValvePressureOutlet;
    result[hour].oilPressureInlet += entry.oilPressureInlet;
    result[hour].oilPressureOutlet += entry.oilPressureOutlet;
    result[hour].oilTemperatureSensor += entry.oilTemperatureSensor;
    result[hour].voltageSensor += entry.voltageSensor;
    result[hour].count += 1;
  });

  return Object.values(result).map(hourData => ({
    time: hourData.time,
    airFilterVaccumPressure: hourData.airFilterVaccumPressure / hourData.count,
    currentSensor: hourData.currentSensor / hourData.count,
    dischargePressureSensor: hourData.dischargePressureSensor / hourData.count,
    drainValvePressureOutlet: hourData.drainValvePressureOutlet / hourData.count,
    oilPressureInlet: hourData.oilPressureInlet / hourData.count,
    oilPressureOutlet: hourData.oilPressureOutlet / hourData.count,
    oilTemperatureSensor: hourData.oilTemperatureSensor / hourData.count,
    voltageSensor: hourData.voltageSensor / hourData.count
  }));
}

const label = [
  { label: "Pressure Sensor", key: "dischargePressureSensor"},
  { label: "Voltage sensor", key: "voltageSensor"},
  { label: "Current sensor ", key: "currentSensor"},
  { label: "Power", key: "power"},
  // { label: "Energy", key: "energy"},
  { label: "Oil pressure inlet", key: "oilPressureInlet"},
  { label: "Oil pressure outlet", key: "oilPressureOutlet"},
  { label: "Air filter vaccum pressure", key: "airFilterVaccumPressure"},
  { label: "Drain valve pressure outlet", key: "drainValvePressureOutlet"},
];
// Chart configuration
const chartColors = [
    "#FF5763", 
    "#33FF57",
    "#3357FF",
    "#FF33B1",
    "#A133FF",
    "#33FFA1",
    "#FF3C33",
    "#33FF8C",
    "#8C33F0",
    "#F9338C"
];
const chartConfig = {
} satisfies ChartConfig;

label.map((detail, i) => {
  // @ts-ignore
  chartConfig[detail.key] = {
    label: detail.label,
    color: chartColors[i]
  }
})

const Dashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [transformedData, setTransformedData] = useState();
  console.log("🚀 ~ Dashboard ~ transformedData:", transformedData)

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
  };

  const backtomainpage = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    // Disable the blink effect and show the content after 5 seconds
    const timer = setTimeout(() => {
      // setShowBlink(false);
      setShowContent(true);
    }, 30); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // calculatingdata();
    setTransformedData(aggregateDataByHour(data));
  }, []);
  // const [loading, setLoading] = useState(true);

  // const [data, setData] = useState<TransformedData[]>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("https://indotech-server.vercel.app/");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const rawData: Record<string, SensorData> = await response.json(); // Assuming rawData is an object where keys are timestamps and values are SensorData
  //       const transformedData: TransformedData[] = Object.keys(rawData).map(timestamp => ({
  //         timestamp,
  //         ...rawData[timestamp]
  //       }));
  //       console.log(transformedData)
  //       setData(transformedData); // Now TypeScript knows this is of type TransformedData[]
  //     } catch (error) {
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // if (loading) return <div className="loader">Loading...</div>; //replace this for loader

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
                      <h1 className="font-bold text-sm">{data.at(-1)[label[index].key]}</h1>
                      <p className="text-xs">optimum</p>
                    </CardFooter>
                  </Card>
                ))}
                <Card className="hidden md:block">
                  <br />
                  <CardContent className=" grid gap-4">
                    <p className="font-semibold text-sm">
                      Compressor running duration load :
                    </p>
                    <p className="font-semibold text-sm">
                      Compressor running duration unload :
                    </p>
                  </CardContent>
                </Card>
                <Card className="hidden md:block">
                  <br />
                  <CardContent className="grid gap-4">
                    <p className="font-semibold text-sm">
                      Oil filter condition :
                    </p>
                    <p className="font-semibold text-sm">
                      Oil temperature sensor :
                    </p>
                    <p className="font-semibold text-sm">
                      Oil temperature condition :
                    </p>
                  </CardContent>
                </Card>
                <Card className="hidden md:block ">
                  <br />
                  <CardContent className="grid gap-4">
                    <p className="font-semibold text-sm">
                      Air filter condition :
                    </p>
                    <p className="font-semibold text-sm">Drain duration :</p>
                  </CardContent>
                </Card>
              </div>
              <br />
              <Card className="md:hidden grid gap-4">
                <br />
                <CardContent className="grid gap-4">
                  <p className="font-semibold text-sm">
                    Compressor running duration load :
                  </p>
                  <p className="font-semibold text-sm">
                    Compressor running duration unload :
                  </p>
                  <p className="font-semibold text-sm">
                    Oil filter condition :
                  </p>
                  <p className="font-semibold text-sm">
                    Oil temperature sensor :
                  </p>
                  <p className="font-semibold text-sm">
                    Oil temperature condition :
                  </p>
                  <p className="font-semibold text-sm">
                    Air filter condition :
                  </p>
                  <p className="font-semibold text-sm">Drain duration :</p>
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
                        {
                            Object.keys(chartConfig).map(chart => (
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
                            ))
                        }
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {label[selectedIndex].label} Graph &#160;&#160;&#160;&#160;&#160;
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
                <CardFooter>
                  <button
                    onClick={backtomainpage}
                    className="w-full py-2 text-center text-sm font-semibold text-blue-600 bg-blue-100 rounded"
                  >
                    Back
                  </button>
                </CardFooter>
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
