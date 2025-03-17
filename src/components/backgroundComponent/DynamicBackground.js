
"use client";
import styles from './DynamicBackground.module.css'; 
import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";

export default function DynamicBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div>
      {/* CSS Animated Background */}
      <div className={styles.animatedBackground} />

      {/* Particle Animation with custom colors and settings */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 30 },
            color: { 
                value: [
                  "#C3EBFA", // Sky blue
                  "#CFCEFF", // Soft purple
                  "#FAE27C", // Warm yellow
                  "#F8D49D", // Soft orange
                  "#FFC6D9", // Pastel pink
                  "#B8F2E6", // Mint green
                  "#E0BBE4", // Lavender
                  "#A2D2FF"  // Light blue
                ] 
              },
            shape: { type: "circle" },
            opacity: { value: 0.8 },
            size: {
                value: { min: 5, max: 30 }
              },
            move: { enable: true, speed: 1 },
            links: { enable: true, color: "#ffffff", opacity: 0.5, distance: 150 },
          },
        }}
        className={styles.particlesContainer}
      />
    </div>
  );
}



