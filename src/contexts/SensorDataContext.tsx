import { OTM } from "@/constants";
import { db } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
// import {  } from "firebase/database";

interface SensorData {
  [key: string]: {
    airFilterVaccumPressure: number;
    currentSensor: number;
    dischargePressureSensor: number;
    drainValvePressureOutlet: number;
    machine: number;
    oilPressureInlet: number;
    oilPressureOutlet: number;
    oilTemperatureSensor: number;
    voltageSensor: number;
  };
}

interface ChartData24hrs {
  time: number; // or string if you plan to use a different format
  pressureSensor: number;
  voltageSensor: number;
  currentSensor: number;
  dischargePressureSensor: number;
  power: number;
  energy: number;
  oilPressureInlet: number;
  oilPressureOutlet: number;
  oilTemperatureSensor: number;
  airFilterVaccumPressure: number;
  drainValvePressureOutlet: number;
  count: number;
}

interface TransformedDataType {
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

type DerivedDataType = {
  power: number;
  energy: number;
  compressorUnload: number;
  compressorLoad: number;
  drainDuration: number;
  airFilterCondition: "GOOD" | "BAD" | "CALCULATING";
  oilFilterCondition: "GOOD" | "BAD" | "CALCULATING";
  oilTemperatureCondition: "NORMAL" | "HIGH" | "CALCULATING";
};

const DUMMY_DATA = [
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

const chartData24hrs: ChartData24hrs[] = [];
const chartData10days = [];

function aggregateDataByHour(Data: TransformedDataType[]) {
  const result: { [hour: number]: ChartData24hrs } = {};
  let previousTime = 0,
    currentTime,
    checkPrevTime = false;
  Data.forEach((entry) => {
    const hour = new Date(entry.timestamp).getHours();
    if (!result[hour]) {
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
        power: 0,
        energy: 0,
        pressureSensor: 0,
        count: 0,
      };
      checkPrevTime = false;
    }
    result[hour].power +=
      (1.732 * entry.voltageSensor * entry.currentSensor * 0.8) / 1000;
    let elapsedTime = 0;
    currentTime = new Date(entry.timestamp).getTime();
    if (checkPrevTime) {
      elapsedTime = currentTime - previousTime;
    }
    previousTime = currentTime;
    result[hour].energy += (result[hour].power * elapsedTime) / (3600 * 1000);
    result[hour].airFilterVaccumPressure += entry.airFilterVaccumPressure;
    result[hour].currentSensor += entry.currentSensor;
    result[hour].dischargePressureSensor += entry.dischargePressureSensor;
    result[hour].drainValvePressureOutlet += entry.drainValvePressureOutlet;
    result[hour].oilPressureInlet += entry.oilPressureInlet;
    result[hour].oilPressureOutlet += entry.oilPressureOutlet;
    result[hour].oilTemperatureSensor += entry.oilTemperatureSensor;
    result[hour].voltageSensor += entry.voltageSensor;
    result[hour].count += 1;
    checkPrevTime = true;
  });

  return Object.values(result).map((hourData) => ({
    time: hourData.time,
    airFilterVaccumPressure: hourData.airFilterVaccumPressure / hourData.count,
    currentSensor: hourData.currentSensor / hourData.count,
    dischargePressureSensor: hourData.dischargePressureSensor / hourData.count,
    drainValvePressureOutlet:
      hourData.drainValvePressureOutlet / hourData.count,
    oilPressureInlet: hourData.oilPressureInlet / hourData.count,
    oilPressureOutlet: hourData.oilPressureOutlet / hourData.count,
    oilTemperatureSensor: hourData.oilTemperatureSensor / hourData.count,
    voltageSensor: hourData.voltageSensor / hourData.count,
    power: hourData.power / hourData.count,
    energy: hourData.energy / hourData.count,
  }));
}

export type SensorDataContextType = {
  data: TransformedDataType[] | undefined;
  isLoading: boolean;
  error: string;
  chartData: ChartData24hrs[] | undefined;
  derivedData: DerivedDataType | undefined;
};

export const SensorDataContext = createContext<
  SensorDataContextType | undefined
>(undefined);

export const SensorDataContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("NO_ERROR");
  const [data, setData] = useState<TransformedDataType[] | undefined>();
  const [chartData, setChartData] = useState<ChartData24hrs[] | undefined>();
  const [derivedData, setDerivedData] = useState<DerivedDataType | undefined>();

  /** Useffect for live data subscription */
  useEffect(() => {
    const unSub = onValue(
      ref(db, "indo_logs"),
      (piece) => {
        const sensorData = Object.keys(piece.toJSON() as SensorData).map(
          (k) => ({
            timestamp: k,
            // @ts-ignore
            ...piece[k],
          }),
        ) as TransformedDataType[];
        const transformedData = aggregateDataByHour(sensorData);
        console.log(transformedData);
      },
      (error) => {
        setError(error.message);
      },
    );

    return () => unSub();
  }, []);

  /** Useffect for data transformation/aggregation */
  useEffect(() => {
    function createDerivedData() {
      const power =
        (1.732 *
          (data && data.at(-1) ? data.at(-1)!.voltageSensor : 0) *
          (data && data.at(-1) ? data.at(-1)!.currentSensor : 0) *
          0.8) /
        1000;
      const energy = 0;
      const compressorLoad = power; // duration
      const compressorUnload = power; // duration kandupudi
      const airFilterCondition = data
        ? data.at(-1)!.airFilterVaccumPressure <= 0.8
          ? "BAD"
          : "GOOD"
        : "CALCULATING";
      const oilFilterCondition = data
        ? data.at(-1)!.oilPressureInlet - data?.at(-1)!.oilPressureOutlet >= 0.6
          ? "BAD"
          : "GOOD"
        : "CALCULATING";
      const oilTemperatureCondition = data
        ? data.at(-1)!.oilTemperatureSensor >= OTM
          ? "HIGH"
          : "NORMAL"
        : "CALCULATING";
      const drainDuration = data ? data.at(-1)!.drainValvePressureOutlet : 0; // duration kandupudi

      setDerivedData({
        airFilterCondition,
        compressorLoad,
        compressorUnload,
        drainDuration,
        energy,
        oilFilterCondition,
        oilTemperatureCondition,
        power,
      });
    }

    createDerivedData();
  }, [data]);

  return (
    <SensorDataContext.Provider
      value={{
        isLoading,
        error,
        chartData,
        data,
        derivedData,
      }}
    >
      {children}
    </SensorDataContext.Provider>
  );
};
