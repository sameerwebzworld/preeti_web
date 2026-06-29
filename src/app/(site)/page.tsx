import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preeti Products - Home",
  description: "This is Home for Preeti Products Template",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
