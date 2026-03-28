"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import ProductShowcase from "@/components/ProductShowcase";
import Capabilities from "@/components/Capabilities";
import WhyDifferent from "@/components/WhyDifferent";
import Evidence from "@/components/Evidence";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Philosophy />
      <ProductShowcase />
      <Capabilities />
      <WhyDifferent />
      <Evidence />
      <Closing />
      <Footer />
    </main>
  );
}
