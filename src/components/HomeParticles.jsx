import React, { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const HomeParticles = () => {
  const initialSpeed = 1.5;
  const fastSpeed = 6;
  const [speed, setSpeed] = useState(initialSpeed);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setSpeed(fastSpeed);
    const handleMouseUp = () => setSpeed(initialSpeed);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [initialSpeed, fastSpeed]);

  const particleOptions = {
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse'
        }
      },
      modes: {
        repulse: {
          distance: 60,
          duration: 0.4
        }
      }
    },
    particles: {
      color: { value: '#ffffff' },
      links: {
        color: '#ffffff',
        distance: 120,
        enable: true,
        opacity: 0.15,
        width: 1
      },
      shape: { type: 'circle' },
      opacity: { value: 0.4 },
      size: { value: { min: 1, max: 4 } },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: true,
        speed: speed,
        straight: false
      },
      number: {
        density: { enable: true, area: 800 },
        value: 100
      }
    },
    detectRetina: true
  };

  return (
    <Particles
      id="tsparticles-background"
      init={particlesInit}
      options={particleOptions}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default HomeParticles;