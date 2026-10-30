import { Hero, NextEvent, FeaturedMatches, WatchSection, Banner, Reasons } from "@/components/Home";
import { Partners } from "@/components/Partners";
export const revalidate = 60;
export default function Home() {
  return (
    <>
      <Hero />
      <NextEvent /><FeaturedMatches /><WatchSection /><Banner /><Reasons /><Partners />
    </>
  );
}
