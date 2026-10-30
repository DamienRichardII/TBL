import { Hero, Shortcuts, NextEvent, FeaturedMatches, WatchSection, Banner, Reasons } from "@/components/Home";
import { Partners } from "@/components/Partners";
export const revalidate = 60;
export default function Home() {
  return (
    <>
      <div className="lg:flex lg:min-h-svh lg:flex-col"><Hero /><Shortcuts /></div>
      <NextEvent /><FeaturedMatches /><WatchSection /><Banner /><Reasons /><Partners />
    </>
  );
}
