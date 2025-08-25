import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Single 3D Book shape (simple box for now)
function BookShape({ position, color, onClick }) {
  return (
    <mesh position={position} onClick={onClick} castShadow>
      {/* book block */}
      <boxGeometry args={[2, 3, 0.6]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Canvas wrapper
export default function Book({ books }) {
  return (
    <Canvas
      style={{ width: "100%", height: "500px" }}
      shadows
      camera={{ position: [5, 5, 10], fov: 45 }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Camera controls */}
      <OrbitControls />

      {/* Render each book */}
      {books.map((book, i) => (
        <BookShape
          key={i}
          position={[i * 3 - 3, 0, 0]} // space out books on X-axis
          color={book.color}
          onClick={book.onClick}
        />
      ))}
    </Canvas>
  );
}
