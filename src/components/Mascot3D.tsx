import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Cone } from "@react-three/drei";
import { Mesh } from "three";

interface MascotProps {
  animation?: "idle" | "wave" | "happy" | "sad";
}

function ChibiMascot({ animation = "idle" }: MascotProps) {
  const bodyRef = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (animation === "idle") {
      if (bodyRef.current) {
        bodyRef.current.position.y = Math.sin(t * 2) * 0.1;
      }
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(t * 1.5) * 0.2;
      }
    }

    if (animation === "wave") {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = Math.sin(t * 6) * 0.5 - 0.5;
      }
    }

    if (animation === "happy") {
      if (bodyRef.current) {
        bodyRef.current.position.y = Math.abs(Math.sin(t * 4)) * 0.3;
        bodyRef.current.rotation.y = Math.sin(t * 2) * 0.3;
      }
    }

    if (animation === "sad") {
      if (headRef.current) {
        headRef.current.rotation.x = 0.3;
      }
    }
  });

  return (
    <group>
      {/* Body */}
      <Box ref={bodyRef} args={[0.8, 1, 0.6]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8A2BFF" />
      </Box>

      {/* Head */}
      <Sphere ref={headRef} args={[0.5, 32, 32]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#FFB4D6" />
      </Sphere>

      {/* Eyes */}
      <Sphere args={[0.1, 16, 16]} position={[-0.15, 1.1, 0.4]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere args={[0.1, 16, 16]} position={[0.15, 1.1, 0.4]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>

      {/* Blush */}
      <Sphere args={[0.08, 16, 16]} position={[-0.3, 0.9, 0.35]}>
        <meshStandardMaterial color="#FF2E93" opacity={0.6} transparent />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.3, 0.9, 0.35]}>
        <meshStandardMaterial color="#FF2E93" opacity={0.6} transparent />
      </Sphere>

      {/* Ears */}
      <Cone args={[0.15, 0.4, 16]} position={[-0.4, 1.4, 0]} rotation={[0, 0, -0.5]}>
        <meshStandardMaterial color="#FFB4D6" />
      </Cone>
      <Cone args={[0.15, 0.4, 16]} position={[0.4, 1.4, 0]} rotation={[0, 0, 0.5]}>
        <meshStandardMaterial color="#FFB4D6" />
      </Cone>

      {/* Left Arm */}
      <Box ref={leftArmRef} args={[0.2, 0.6, 0.2]} position={[-0.6, 0.2, 0]}>
        <meshStandardMaterial color="#19E6E6" />
      </Box>

      {/* Right Arm */}
      <Box ref={rightArmRef} args={[0.2, 0.6, 0.2]} position={[0.6, 0.2, 0]}>
        <meshStandardMaterial color="#19E6E6" />
      </Box>

      {/* Legs */}
      <Box args={[0.25, 0.7, 0.25]} position={[-0.25, -0.85, 0]}>
        <meshStandardMaterial color="#FFB4D6" />
      </Box>
      <Box args={[0.25, 0.7, 0.25]} position={[0.25, -0.85, 0]}>
        <meshStandardMaterial color="#FFB4D6" />
      </Box>
    </group>
  );
}

const Mascot3D = ({ animation = "idle", className = "" }: MascotProps & { className?: string }) => {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8A2BFF" />
        <ChibiMascot animation={animation} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Mascot3D;
