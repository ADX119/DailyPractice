import Image from "next/image";
import BgDarkGradient1 from "./components/background";
import Card from "./components/card";
import Gptcard from "./components/card2";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
     <BgDarkGradient1/>
     {/* <Card/> */}
     <Gptcard/>
     
    </div>
  );
}
