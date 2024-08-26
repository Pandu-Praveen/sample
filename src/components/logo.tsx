import { appConfig } from "@/config/app";
import { Icons } from "./icons";
import headerLogo from '../img/sample.png';
export function Logo() {
  return (
    <>
      {/*<Icons.logo className="h-6 w-6" /> */}
      <img src={headerLogo} alt="" width={50} />
      <span className="font-bold ">{appConfig.name}</span>
    </>
  );
}
