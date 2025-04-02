// src/components/ThreeParticles.jsx
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AiParticleBackground = ({ count = 5000 }) => {
  const pointsRef = useRef();
  const { viewport, mouse } = useThree();
  const [isMouseDown, setIsMouseDown] = useState(false);

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
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const baseSpeed = 0.05;
      const rotationSpeedMultiplier = isMouseDown ? 5 : 1;

      const targetRotationY = (mouse.x * viewport.width / 2) * 0.1;
      const targetRotationX = (mouse.y * viewport.height / 2) * 0.1;

      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotationY, 0.05);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotationX, 0.05);

      pointsRef.current.rotation.z += delta * baseSpeed * rotationSpeedMultiplier;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="var(--accent-color)"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const ThreeParticles = () => {
  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none' // ensures it doesn’t interfere with interactions
      }}>
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
          <AiParticleBackground count={5000} />
        </Canvas>
      </div>
      
  );
};

export default ThreeParticles;
