import { Hero, Shortcuts, NextEvent, Banner, Reasons } from "@/components/Home";
export default function Home() {
  return (<><div className="lg:flex lg:min-h-svh lg:flex-col"><Hero /><Shortcuts /></div><NextEvent /><Banner /><Reasons /></>);
}
