import { Hero, NextEvent, FeaturedMatches, WatchSection, Divisions, Banner, Reasons } from "@/components/Home";
import { Partners } from "@/components/Partners";
export const revalidate = 60;
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <Hero />
      <NextEvent /><FeaturedMatches /><WatchSection /><Divisions /><Banner /><Reasons /><Partners />
    </>
  );
}
