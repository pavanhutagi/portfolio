"use client";

import "./style.css";
import Card from "@/components/cards/Card";
import LineParticles from "@/components/particles/LineParticles";

export default function Home() {
  return (
    <>
      <LineParticles />
      <div className="overlay">
        <Card />
      </div>
    </>
  );
}
