// src/components/ThreeParticles.jsx
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AiParticleBackground = ({ count = 2000, speedMultiplier = 1 }) => {
  const pointsRef = useRef();
  const { viewport } = useThree();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const particles = useMemo(() => {
    const temp = [];
    const radius = 5;
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      if (isHovering) {
        // Follow mouse
        const targetRotationY = mousePos.x * 0.5;
        const targetRotationX = mousePos.y * 0.5;

        pointsRef.current.rotation.y = THREE.MathUtils.lerp(
          pointsRef.current.rotation.y,
          targetRotationY,
          0.05
        );
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(
          pointsRef.current.rotation.x,
          targetRotationX,
          0.05
        );
      } else {
        // Default: bottom-right to top-left movement
        // Negative Y rotation = move left
        // Positive X rotation = move up
        pointsRef.current.rotation.y -= delta * 0.3 * speedMultiplier;
        pointsRef.current.rotation.x += delta * 0.3 * speedMultiplier;
      }

      // Always add slight Z rotation for depth
      pointsRef.current.rotation.z += delta * 0.05 * speedMultiplier;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#61dbfb"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const ThreeParticles = ({ speedMultiplier = 1 }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <AiParticleBackground count={1800} speedMultiplier={speedMultiplier} />
      </Canvas>
    </div>
  );
};

export default ThreeParticles;
