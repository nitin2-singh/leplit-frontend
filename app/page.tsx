import CTA from "@/components/common/website/cta";
import Features from "@/components/common/website/feature";
import Hero from "@/components/common/website/hero";
import Stack from "@/components/common/website/stack";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Stack />
        <CTA />
      </main>
    </>
  );
}
