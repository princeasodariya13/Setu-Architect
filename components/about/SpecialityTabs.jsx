"use client";

import { useState } from "react";
import architects from "@/lib/data/architects";
import clients from "@/lib/data/clients";
import cities from "@/lib/data/cities";

const TABS = [
  { key: "architects", label: "Architects Work With" },
  { key: "clients", label: "Our Clients" },
  { key: "cities", label: "Cities Which Have Hosted Our Projects" }
];

export default function SpecialityTabs() {
  const [active, setActive] = useState("architects");

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="uppercase text-xs tracking-[0.2em] font-bold text-[#b08543] mb-2">
          Our Speciality
        </p>
        <h2 className="text-3xl font-display font-bold uppercase tracking-wide text-neutral-900 mb-8">
          Collaborations & Geographic Footprint
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] border transition-colors ${
                active === tab.key
                  ? "bg-[#8b5e1c] text-white border-[#8b5e1c]"
                  : "border-neutral-200 text-neutral-500 hover:border-[#8b5e1c] hover:text-[#8b5e1c]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {active === "architects" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 items-center">
            {architects.map((a) => (
              <div
                key={a.file}
                className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
              >
                <img
                  src={`/img/architect_logo/${a.file}`}
                  alt={`Architect Partner: ${a.name}`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 w-auto mx-auto"
                />
              </div>
            ))}
          </div>
        )}

        {active === "clients" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 items-center">
            {clients.map((c, i) => (
              <div
                key={`${c.file}-${i}`}
                className="flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
              >
                <img
                  src={`/img/developers_logo/${c.file}`}
                  alt={`Client Developer Logo: ${c.name}`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 w-auto mx-auto"
                />
              </div>
            ))}
          </div>
        )}

        {active === "cities" && (
          <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-center">
            {cities.map((city) => (
              <p key={city} className="text-sm font-medium text-neutral-600">
                {city}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
