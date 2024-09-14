import {
  SensorDataContext,
  SensorDataContextType,
} from "@/contexts/SensorDataContext";
import { useContext } from "react";

export function useSensorData(): SensorDataContextType {
  const context = useContext(SensorDataContext);

  if (context === undefined)
    throw new Error(
      "useSensorData must be used within SensorDataContextProvider",
    );

  return context;
}
