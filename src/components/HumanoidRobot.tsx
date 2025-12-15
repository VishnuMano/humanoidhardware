"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

// ===========================================
// HOTSPOTS CONFIG - Easy to modify or delete
// Set ENABLE_HOTSPOTS to false to disable
// ===========================================
const ENABLE_HOTSPOTS = true;
// width,depth,height
const HOTSPOTS = [
  { id: "actuation", label: "Actuation", position: [0.12, 0.02, 0.31], section: "2" },       // shoulder
  { id: "sensing", label: "Sensing", position: [-0.05, 0, 0.28], section: "3" },           // hand
  { id: "structure", label: "Structure", position: [-0.07, -0.02, -0.15], section: "4" },      // legs
  { id: "computation", label: "Computation", position: [0, 0, 0.45], section: "5" },      // head
  { id: "power", label: "Power", position: [0, 0, 0.1], section: "6" },               // chest
];
// ===========================================

interface HotspotProps {
  position: [number, number, number];
  label: string;
  section: string;
  onHover: (label: string | null) => void;
  isHovered: boolean;
}

function Hotspot({ position, label, section, onHover, isHovered }: HotspotProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      meshRef.current.scale.setScalar(isHovered ? 1.5 : scale);
    }
  });

  // Highlight corresponding section on hover
  useEffect(() => {
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      if (isHovered) {
        element.classList.add("border-t-[#7bb8e6]");
      } else {
        element.classList.remove("border-t-[#7bb8e6]");
      }
    }
  }, [isHovered, section]);

  const handleClick = () => {
    // Scroll to section in the page
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(label)}
        onPointerOut={() => onHover(null)}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial
          color={isHovered ? "#5ba3d9" : "#7bb8e6"}
          transparent
          opacity={isHovered ? 1 : 0.8}
        />
      </mesh>
      {/* Label on hover */}
      {isHovered && (
        <Html
          position={[0.06, 0.03, 0]}
          style={{
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div className="bg-[#1a1a1a] text-[#f5f2eb] px-2 py-1 rounded text-sm font-medium shadow-lg">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

function Hotspots() {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  if (!ENABLE_HOTSPOTS) return null;

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={2.5}>
      {HOTSPOTS.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position as [number, number, number]}
          label={hotspot.label}
          section={hotspot.section}
          onHover={setHoveredLabel}
          isHovered={hoveredLabel === hotspot.label}
        />
      ))}
    </group>
  );
}

function PointCloudRobot({ controlsRef }: { controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null> }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const loader = new PLYLoader();
    loader.load("/models/sam3d-splat.ply", (geo) => {
      geo.computeVertexNormals();
      setGeometry(geo);
    });
  }, []);

  if (!geometry) return null;

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={2.5}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.008}
          vertexColors={false}
          color="#1a1a1a"
          sizeAttenuation={true}
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}

function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.3, 0.05, 16, 32]} />
      <meshStandardMaterial color="#888" />
    </mesh>
  );
}

export default function HumanoidRobot() {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <PointCloudRobot controlsRef={controlsRef} />
        <Hotspots />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
          minDistance={2}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}
