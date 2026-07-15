import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preeti Products - Home",
  description: "Preeti Products - Quality cleaning essentials for your home",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
