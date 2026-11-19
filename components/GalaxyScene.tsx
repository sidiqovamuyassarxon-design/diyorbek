"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { CelestialBody } from "@/data/celestial";

function GalaxyDust() {
  const points = useMemo(() => {
    const count = 9000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color("#4c8dff");
    const colorB = new THREE.Color("#c17aff");
    for (let i = 0; i < count; i++) {
      const arm = Math.floor(Math.random() * 4);
      const radius = 0.5 + Math.random() * 8;
      const angle = (arm * Math.PI) / 2 + radius * 0.58 + (Math.random() - 0.5) * 0.7;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * (0.12 + radius * 0.035);
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      const c = colorA.clone().lerp(colorB, Math.random());
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[points.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

function Planet({ body, selected, onSelect }: {
  body: CelestialBody; selected: boolean; onSelect: (body: CelestialBody) => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.18;
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.04, 0]}>
        <ringGeometry args={[body.orbit - 0.004, body.orbit + 0.004, 160]} />
        <meshBasicMaterial color="#4776c9" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        ref={mesh}
        position={[body.orbit, 0, 0]}
        onClick={(event) => { event.stopPropagation(); onSelect(body); }}
      >
        <sphereGeometry args={[body.radius, 48, 48]} />
        <meshStandardMaterial color={body.color} roughness={0.82} metalness={0.05} />
        {selected && (
          <mesh scale={1.16}>
            <sphereGeometry args={[body.radius, 32, 32]} />
            <meshBasicMaterial color="#65d8ff" wireframe transparent opacity={0.5} />
          </mesh>
        )}
        <Html distanceFactor={12} position={[0, body.radius + 0.18, 0]} center>
          <button className="planet-label" onClick={(e) => { e.stopPropagation(); onSelect(body); }}>
            {body.name}
          </button>
        </Html>
      </mesh>
    </group>
  );
}

function SceneContent({ bodies, selectedId, onSelect }: {
  bodies: CelestialBody[]; selectedId: string; onSelect: (body: CelestialBody) => void;
}) {
  return (
    <>
      <color attach="background" args={["#030713"]} />
      <fog attach="fog" args={["#030713", 12, 24]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[0, 0, 0]} intensity={65} color="#fff0c2" distance={16} />
      <mesh>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshBasicMaterial color="#fff0c2" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial color="#ff9d48" transparent opacity={0.08} />
      </mesh>
      <GalaxyDust />
      <Stars radius={90} depth={45} count={4500} factor={3} saturation={0.2} fade speed={0.25} />
      {bodies.map((body) => (
        <Planet key={body.id} body={body} selected={selectedId === body.id} onSelect={onSelect} />
      ))}
      <OrbitControls enablePan enableZoom minDistance={3} maxDistance={17} rotateSpeed={0.55} />
    </>
  );
}

export default function GalaxyScene({ bodies, selectedId, onSelect }: {
  bodies: CelestialBody[]; selectedId: string; onSelect: (body: CelestialBody) => void;
}) {
  return (
    <Canvas camera={{ position: [0, 7, 10], fov: 48 }} dpr={[1, 1.7]}>
      <Suspense fallback={null}>
        <SceneContent bodies={bodies} selectedId={selectedId} onSelect={onSelect} />
      </Suspense>
    </Canvas>
  );
}
