import { appConfig } from "@/config/app";
import { Icons } from "./icons";
import sampleLogo from '../../src/img/sample.png';
export function Logo() {
  return (
    <>
      {/*<Icons.logo className="h-6 w-6" /> */}
      <img src="sampleLogo" alt="" width={50} />
      <span className="font-bold ">{appConfig.name}</span>
    </>
  );
}
