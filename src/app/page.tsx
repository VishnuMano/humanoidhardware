"use client";

import dynamic from "next/dynamic";

const HumanoidRobot = dynamic(() => import("@/components/HumanoidRobot"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#888] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const tableOfContents = [
  {
    title: "Skeleton",
    duration: "",
    items: [
      { num: "a", label: "Aluminum" },
      { num: "b", label: "Steel" },
      { num: "c", label: "Titanium" },
      { num: "d", label: "Composites" },
      { num: "e", label: "Polymers" },
    ],
  },
  {
    title: "Motors",
    duration: "",
    items: [
      { num: "a", label: "Servo" },
      { num: "b", label: "Stepper" },
      { num: "c", label: "DC" },
      { num: "d", label: "AC" },
      { num: "e", label: "Brush vs Brushless" },
    ],
  },
  {
    title: "Gearboxes",
    duration: "",
    items: [
      { num: "a", label: "Planetary Gearboxes" },
      { num: "b", label: "Harmonic Gearboxes" },
    ],
  },
  {
    title: "Actuators",
    duration: "",
    items: [
      { num: "a", label: "Power Sources" },
      { num: "b", label: "Motion" },
      { num: "c", label: "Key Evaluation Criteria" },
      { num: "d", label: "Future" },
    ],
  },
  {
    title: "Batteries",
    duration: "",
    items: [
      { num: "a", label: "How Batteries Work" },
      { num: "b", label: "Key Evaluation Criteria" },
      { num: "c", label: "Electrochemistry" },
      { num: "d", label: "Electrodes" },
      { num: "e", label: "Packaging" },
      { num: "f", label: "Future" },
    ],
  },
  {
    title: "Compute",
    duration: "",
    items: [
      { num: "a", label: "How Robot Compute Works" },
      { num: "b", label: "Key Evaluation Criteria" },
      { num: "c", label: "The NVIDIA Ecosystem" },
    ],
  },
  {
    title: "PCBs",
    duration: "",
    items: [],
  },
  {
    title: "Tactile Sensors",
    duration: "",
    items: [
      { num: "a", label: "Optical" },
      { num: "b", label: "Piezoresistive & Piezoelectric" },
      { num: "c", label: "Capacitive" },
      { num: "d", label: "Magnetic" },
      { num: "e", label: "What Tactile Sensors Detect" },
      { num: "f", label: "Bottlenecks" },
    ],
  },
  {
    title: "Data Collection",
    duration: "",
    items: [],
  },
  {
    title: "Supply Chain",
    duration: "",
    items: [
      { num: "a", label: "Lithium" },
      { num: "b", label: "Cobalt" },
      { num: "c", label: "Geopolitics" },
    ],
  },
  {
    title: "Humanoid Landscape",
    duration: "",
    items: [],
  },
  {
    title: "Sources",
    duration: "",
    items: [],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#1a1a1a] overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - 3D Robot */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative order-2 lg:order-1">
          <div className="absolute inset-0">
            <HumanoidRobot />
          </div>
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-[#f5f2eb]/50 lg:to-[#f5f2eb]/80" />
        </div>

        {/* Right side - Content */}
        <div className="w-full lg:w-1/2 px-8 lg:px-16 py-12 lg:py-16 order-1 lg:order-2 overflow-y-auto max-h-screen">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Header */}
            <header className="mb-12">
              <h1 className="font-serif text-4xl lg:text-5xl font-light tracking-wide mb-6 leading-tight text-[#1a1a1a]">
                Humanity's Last Machine
              </h1>
              <p className="text-[#6b6b6b] text-lg leading-relaxed">
                Inside the actuators, sensors, and supply chains that will define the future of labor.
                The race to manufacture humanoids has already begun.
              </p>
            </header>

            {/* Start reading link */}
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#1a1a1a] hover:text-[#000] transition-colors mb-12 group"
            >
              <span className="font-serif text-lg">Start reading</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* Table of Contents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {tableOfContents.map((section, idx) => {
                // Extract section number for hotspot linking
                const sectionNum = section.title.match(/^(\d+)\./)?.[1] || "";
                return (
                <div
                  key={idx}
                  data-section={sectionNum}
                  className="border-t border-[#d9d5cc] pt-4 px-2 -mx-2 hover:border-[#b9b5ac] transition-all duration-300"
                >
                  <div className="flex justify-between items-baseline mb-3">
                    <h2 className="font-serif text-lg font-normal text-[#1a1a1a]">
                      {section.title}
                    </h2>
                    <span className="text-xs text-[#8b8b8b] font-mono">
                      {section.duration}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {section.items.map((item, itemIdx) => (
                      <a
                        key={itemIdx}
                        href="#"
                        className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors flex items-baseline gap-2"
                      >
                        <span className="text-xs text-[#9b9b9b]">{item.num}.</span>
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              );
              })}
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-[#d9d5cc]">
              <p className="text-sm text-[#8b8b8b]">
                Made with curiosity and precision.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
