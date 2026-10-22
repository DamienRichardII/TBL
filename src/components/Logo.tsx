import Image from "next/image";
import { IMG } from "@/lib/assets";
export function Logo({ height = 40, priority = false, className = "" }: { height?: number; priority?: boolean; className?: string }) {
  const width = Math.round((IMG.logo.w / IMG.logo.h) * height);
  return <Image src={IMG.logo.src} alt="TBL – The Ballin League" width={width} height={height} priority={priority} className={className} style={{ height, width: "auto" }} />;
}
