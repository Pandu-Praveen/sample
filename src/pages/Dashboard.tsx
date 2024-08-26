import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
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
  airFilterVacuumPressure: number;
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
  airFilterVacuumPressure: number;
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
  airFilterVacuumPressure: number;
  drainValvePressureOutlet: number;
}



const data =[
  
{
  timestamp: '2024-08-24 11:11:11', 
  airFilterVacuumPressure: 29.8, 
  currentSensor: 10, 
  dischargePressureSensor: 12.5, 
  drainValvePressureOutlet: 0.5,
  machine: 1,
  oilPressureInlet: 30.2,
  oilPressureOutlet: 28.9,
  oilTemperatureSensor: 150,
  voltageSensor: 120
},
{
  timestamp: '2024-08-24 12:30:38', 
  airFilterVacuumPressure: 700, 
  currentSensor: 56, 
  dischargePressureSensor: 577, 
  drainValvePressureOutlet: 693,
  machine: 1,
  oilPressureInlet: 15005,
  oilPressureOutlet: 5090,
  oilTemperatureSensor: 53,
  voltageSensor: 156
},
{
  timestamp: '2024-08-24 12:30:52', 
  airFilterVacuumPressure: 181, 
  currentSensor: 32, 
  dischargePressureSensor: 522, 
  drainValvePressureOutlet: 478,
  machine: 1,
  oilPressureInlet: 5834,
  oilPressureOutlet: 6100,
  oilTemperatureSensor: 134,
  voltageSensor: 207
},
{
  timestamp: '2024-08-24 12:30:54', 
  airFilterVacuumPressure: 1483, 
  currentSensor: 24, 
  dischargePressureSensor: 680, 
  drainValvePressureOutlet: 1538,
  machine: 1,
  oilPressureInlet: 9196,
  oilPressureOutlet: 13852,
  oilTemperatureSensor: 87,
  voltageSensor: 429
},
{
  timestamp: '2024-08-24 12:40:11', 
  airFilterVacuumPressure: 29.8, 
  currentSensor: 10, 
  dischargePressureSensor: 12.5, 
  drainValvePressureOutlet: 0.5,
  machine: 1,
  oilPressureInlet: 30.2,
  oilPressureOutlet: 28.9,
  oilTemperatureSensor: 150,
  voltageSensor: 120
},
{
  timestamp: '2024-08-24 12:50:38', 
  airFilterVacuumPressure: 700, 
  currentSensor: 56, 
  dischargePressureSensor: 577, 
  drainValvePressureOutlet: 693,
  machine: 1,
  oilPressureInlet: 15005,
  oilPressureOutlet: 5090,
  oilTemperatureSensor: 53,
  voltageSensor: 156
},
{
  timestamp: '2024-08-24 12:59:52', 
  airFilterVacuumPressure: 181, 
  currentSensor: 32, 
  dischargePressureSensor: 522, 
  drainValvePressureOutlet: 478,
  machine: 1,
  oilPressureInlet: 5834,
  oilPressureOutlet: 6100,
  oilTemperatureSensor: 134,
  voltageSensor: 207
},
{
  timestamp: '2024-08-24 13:00:54', 
  airFilterVacuumPressure: 1483, 
  currentSensor: 24, 
  dischargePressureSensor: 680, 
  drainValvePressureOutlet: 1538,
  machine: 1,
  oilPressureInlet: 9196,
  oilPressureOutlet: 13852,
  oilTemperatureSensor: 87,
  voltageSensor: 429
},
{
  timestamp: '2024-08-24 13:11:11', 
  airFilterVacuumPressure: 29.8, 
  currentSensor: 10, 
  dischargePressureSensor: 12.5, 
  drainValvePressureOutlet: 0.5,
  machine: 1,
  oilPressureInlet: 30.2,
  oilPressureOutlet: 28.9,
  oilTemperatureSensor: 150,
  voltageSensor: 120
},
{
  timestamp: '2024-08-24 13:20:38', 
  airFilterVacuumPressure: 700, 
  currentSensor: 56, 
  dischargePressureSensor: 577, 
  drainValvePressureOutlet: 693,
  machine: 1,
  oilPressureInlet: 15005,
  oilPressureOutlet: 5090,
  oilTemperatureSensor: 53,
  voltageSensor: 156
},
{
  timestamp: '2024-08-24 13:30:52', 
  airFilterVacuumPressure: 181, 
  currentSensor: 32, 
  dischargePressureSensor: 522, 
  drainValvePressureOutlet: 478,
  machine: 1,
  oilPressureInlet: 5834,
  oilPressureOutlet: 6100,
  oilTemperatureSensor: 134,
  voltageSensor: 207
},
{
  timestamp: '2024-08-24 13:50:54', 
  airFilterVacuumPressure: 1483, 
  currentSensor: 24, 
  dischargePressureSensor: 680, 
  drainValvePressureOutlet: 1538,
  machine: 1,
  oilPressureInlet: 9196,
  oilPressureOutlet: 13852,
  oilTemperatureSensor: 87,
  voltageSensor: 429
},
{
  timestamp: '2024-08-24 14:00:11', 
  airFilterVacuumPressure: 29.8, 
  currentSensor: 10, 
  dischargePressureSensor: 12.5, 
  drainValvePressureOutlet: 0.5,
  machine: 1,
  oilPressureInlet: 30.2,
  oilPressureOutlet: 28.9,
  oilTemperatureSensor: 150,
  voltageSensor: 120
},
{
  timestamp: '2024-08-24 14:15:38', 
  airFilterVacuumPressure: 700, 
  currentSensor: 56, 
  dischargePressureSensor: 577, 
  drainValvePressureOutlet: 693,
  machine: 1,
  oilPressureInlet: 15005,
  oilPressureOutlet: 5090,
  oilTemperatureSensor: 53,
  voltageSensor: 156
},
{
  timestamp: '2024-08-24 14:30:52', 
  airFilterVacuumPressure: 181, 
  currentSensor: 32, 
  dischargePressureSensor: 522, 
  drainValvePressureOutlet: 478,
  machine: 1,
  oilPressureInlet: 5834,
  oilPressureOutlet: 6100,
  oilTemperatureSensor: 134,
  voltageSensor: 207
},
{
  timestamp: '2024-08-24 14:40:54', 
  airFilterVacuumPressure: 1483, 
  currentSensor: 24, 
  dischargePressureSensor: 680, 
  drainValvePressureOutlet: 1538,
  machine: 1,
  oilPressureInlet: 9196,
  oilPressureOutlet: 13852,
  oilTemperatureSensor: 87,
  voltageSensor: 429
},
]
const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;
const oneDayInMs= 24 * 60 * 60 * 1000;
const currtimehr: number = new Date("2024-08-24T14:40:54").getHours();
const currtime = new Date("2024-08-24T14:40:54").getTime();
let ps=0,vs=0,cs=0,p=0,e=0,opi=0,opo=0,afvp=0,dvpo=0;
let psd=0,vsd=0,csd=0,pd=0,ed=0,opid=0,opod=0,afvpd=0,dvpod=0;
const chartData24hrs: ChartData24hrs[] = [];
const chartData10days=[];
const hrsdiff=60*60*1000;
let flag=1; 
async function calculatingdata(){
  for (let i=data.length -1;i>=0;i--){
    let j=0;
    const currdatatime = new Date(data[i].timestamp.replace(" ","T")).getTime();
    const timediff=currtime-currdatatime;
    if(timediff<=oneDayInMs){
      console.log()
      if(hrsdiff*flag>=currtime-currdatatime){
        ps+=data[i].dischargePressureSensor;
        vs+=data[i].voltageSensor;
        cs+=data[i].currentSensor;
        let cp=(1.732*data[i].voltageSensor*data[i].currentSensor*0.8)/1000;
        let elapsedTime;
        if(i-1>0){
          elapsedTime = new Date(data[i].timestamp.replace(" ","T")).getTime()-(new Date(data[i-1].timestamp.replace(" ","T")).getTime());
        }
        else{
          elapsedTime=0;
        }
        p+=cp;
        e+=cp*elapsedTime;
        opi+=data[i].oilPressureInlet;
        opo+=data[i].oilPressureOutlet;
        afvp+=data[i].airFilterVacuumPressure;
        dvpo+=data[i].drainValvePressureOutlet;
        console.log(ps,vs,cs,cp,elapsedTime,p,e,opi,opo,afvp,dvpo)
      }
      else{
        i+=1;
        console.log(ps,vs,cs,p,e,opi,opo,afvp,dvpo)
        chartData24hrs.push({
          time: currtimehr-flag,
          pressureSensor: ps,
          voltageSensor: vs,
          currentSensor: cs,
          power: p,
          energy: e,
          oilPressureInlet: opi,
          oilPressureOutlet: opo,
          airFilterVacuumPressure: afvp,
          drainValvePressureOutlet: dvpo
        })
        flag++;
        ps=vs=cs=p=e=opi=opo=afvp=dvpo=0;
      }
      
    }else if(timediff<=tenDaysInMs){
      if(j==0){
      }
      console.log(currdatatime,currtime,timediff,tenDaysInMs);
    }else{
      break;
    }

  }
  console.log(chartData24hrs);
}
// Dummy data for the chart
const chartData = [
  { month: "10", ps1: 186, ps2: 196, ps3: 152, ps4: 148, ps5: 120, ps6: 150, ps7: 148, ps8:130 ,ps9:150},
  { month: "11", ps1: 305, ps2: 150, ps3: 179, ps4: 165, ps5: 136, ps6: 201, ps7: 196, ps8:110 ,ps9:170 },
  { month: "12", ps1: 237, ps2: 196, ps3: 175, ps4: 148, ps5: 174, ps6: 150, ps7: 184, ps8:140 ,ps9:190 },
  { month: "13", ps1: 73, ps2: 136, ps3: 162, ps4: 126, ps5: 156, ps6: 86, ps7: 95, ps8:190 ,ps9:200 },
  { month: "14", ps1: 209, ps2: 187, ps3: 150, ps4: 172, ps5: 182, ps6: 192, ps7: 186, ps8:200 ,ps9:220 },
  { month: "15", ps1: 214, ps2: 150, ps3: 186, ps4: 150, ps5: 146, ps6: 96, ps7: 196, ps8:230 ,ps9:250 },
];

const dataConfigs = [
  { dataKey: "ps1", type: "natural", fill: "#17A2B8", fillOpacity: 0.4, stroke: "#17A2B8" },
  { dataKey: "ps2", type: "natural", fill: "#03fcb1", fillOpacity: 0.4, stroke: "#03fcb1" },
  { dataKey: "ps3", type: "natural", fill: "#FF5733", fillOpacity: 0.4, stroke: "#FF5733" },
  { dataKey: "ps4", type: "natural", fill: "#28A745", fillOpacity: 0.4, stroke: "#28A745" },
  { dataKey: "ps5", type: "natural", fill: "#FFC107", fillOpacity: 0.4, stroke: "#FFC107" },
  { dataKey: "ps6", type: "natural", fill: "#6F42C1", fillOpacity: 0.4, stroke: "#6F42C1" },
  { dataKey: "ps7", type: "natural", fill: "#17A2B8", fillOpacity: 0.4, stroke: "#17A2B8" },
  { dataKey: "ps8", type: "natural", fill: "#03fcb1", fillOpacity: 0.4, stroke: "#03fcb1" },
  { dataKey: "ps9", type: "natural", fill: "#FF5733", fillOpacity: 0.4, stroke: "#FF5733" },
];


const label = ["Pressure Sensor", "Voltage sensor", "Current sensor ", "Power", "Energy", "Oil pressure inlet", "Oil pressure outlet", "Air filter vacuum pressure", "Drain valve pressure outlet"]
// Chart configuration
const chartConfig = {
  ps1: {
    label: "ps1",
    color: "#17A2B8",
  },
  ps2: {
    label: "ps2",
    color: "#0076E5",
  },
  ps3: {
    label: "ps3",
    color: "#FF5733",
  },
  ps4: {
    label: "ps4",
    color: "#28A745",
  },
  ps5: {
    label: "ps5",
    color: "#FFC107",
  },
  ps6: {
    label: "ps6",
    color: "#6F42C1",
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


const Dashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(true);

  const handleCardClick = (index: number) => {
    console.log("Selected Index:", index); // Log the selected index
    setSelectedIndex(index);
  };
  
  const backtomainpage = () => {
    setSelectedIndex(null);
  }
  useEffect(() => {
    // Disable the blink effect and show the content after 5 seconds
    const timer = setTimeout(() => {
      // setShowBlink(false);
      setShowContent(false);
    }, 3000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);
  useEffect(()=>{
    calculatingdata();
  })
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
      {showContent ? (
        <div className="centered-container">
          <div className="centered-container">
            <img
              src="src/img/samplelogo.png" // Update with the actual path to your image
              alt="Blinking"
              className={"blink-effect"}
              style={{ width: "450px", height: "auto" }} // Optional: Adjust size
            />
          </div>

          {/* Other content of the Dashboard */}
        </div>
      ) : (
      <div>
      {selectedIndex === null ? (
        <>
          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <Card
                key={index}
                className={`w-full h-30 sm:h-auto shadow-md cursor-pointer ${selectedIndex === index ? 'bg-blue-100' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <CardHeader>
                  <CardTitle className="font-semibold text-sm">
                    {label[index]}
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
          <Card className="hidden md:block" >
            <br />
            <CardContent className=" grid gap-4">
              <p className="font-semibold text-sm">Compressor running duration load :</p>
              <p className="font-semibold text-sm">Compressor running duration unload :</p>
            </CardContent>
          </Card>
          <Card className="hidden md:block" >
            <br />
            <CardContent className="grid gap-4">
              <p className="font-semibold text-sm">Oil filter condition :</p>
              <p className="font-semibold text-sm">Oil temperature sensor :</p>
              <p className="font-semibold text-sm">Oil temperature condition :</p>
            </CardContent>
          </Card>
          <Card className="hidden md:block ">
            <br />
            <CardContent className="grid gap-4">
              <p className="font-semibold text-sm">Air filter condition  :</p>
              <p className="font-semibold text-sm">Drain duration :</p>	
            </CardContent>
          </Card>
          </div>
          <br />
          <Card className="block md:hidden grid gap-4">
            <br />
            <CardContent className="grid gap-4">
              <p className="font-semibold text-sm">Compressor running duration load :</p>
              <p className="font-semibold text-sm">Compressor running duration unload :</p>
              <p className="font-semibold text-sm">Oil filter condition :</p>
              <p className="font-semibold text-sm">Oil temperature sensor :</p>
              <p className="font-semibold text-sm">Oil temperature condition :</p>
              <p className="font-semibold text-sm">Air filter condition  :</p>
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
                      dataKey="ps1"
                      type="natural"
                      fill="#17A2B8"
                      fillOpacity={0}
                      stroke="#17A2B8"
                    />
                    <Area
                      dataKey="ps2"
                      type="natural"
                      fill="#03fcb1"
                      fillOpacity={0}
                      stroke="#03fcb1"
                    />
                    <Area
                      dataKey="ps3"
                      type="natural"
                      fill="#FF5733"
                      fillOpacity={0}
                      stroke="#FF5733"
                    />
                    <Area
                      dataKey="ps4"
                      type="natural"
                      fill="#28A745"
                      fillOpacity={0}
                      stroke="#28A745"
                    />
                    <Area
                      dataKey="ps5"
                      type="natural"
                      fill="#FFC107"
                      fillOpacity={0}
                      stroke="#FFC107"
                    />
                    <Area
                      dataKey="ps6"
                      type="natural"
                      fill="#6F42C1"
                      fillOpacity={0}
                      stroke="#6F42C1"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Watchlist Card */}
          {/* <WatchlistCard /> */}
        </>
      ) : (
        
        <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  PS{selectedIndex+1} Graph &#160;&#160;&#160;&#160;&#160;
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
                      dataKey= {`${dataConfigs[selectedIndex].dataKey}`}
                      type='natural'
                      fill={`${dataConfigs[selectedIndex].fill}`}
                      fillOpacity={`${dataConfigs[selectedIndex].fillOpacity}`}
                      stroke={`${dataConfigs[selectedIndex].stroke}`}
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
      <br/>
      <br/>
      </div>
      )};
    </>
  );
};

export default Dashboard;
