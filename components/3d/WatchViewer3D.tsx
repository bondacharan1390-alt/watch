'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ProceduralWatchModel } from './ProceduralWatchModel';
import { WatchConfiguration, CameraAngle } from '@/types/configuration';
import { RotateCw, Compass, Maximize2 } from 'lucide-react';

interface WatchViewer3DProps {
  config: WatchConfiguration;
  cameraAngle?: CameraAngle;
  interactive?: boolean;
  autoRotate?: boolean;
  heightClass?: string;
  wireframe?: boolean;
  lightingPreset?: 'studio' | 'dramatic' | 'warm-gold';
  onAngleChange?: (angle: CameraAngle) => void;
  compact?: boolean;
  onExpand?: () => void;
  imageUrl?: string;
}

// Camera controller
function CameraRig({
  angle = 'hero',
  autoRotate = true,
  interactive = true,
}: {
  angle: CameraAngle;
  autoRotate: boolean;
  interactive: boolean;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const targetMap: Record<CameraAngle, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
      hero:     { pos: [2.8, 1.8, 3.8],    lookAt: [0, 0, 0] },
      dial:     { pos: [0, 4.4, 0.05],     lookAt: [0, 0, 0] },
      profile:  { pos: [4.4, 0.2, 0.1],    lookAt: [0, 0, 0] },
      caseback: { pos: [0, -4.5, -0.05],   lookAt: [0, 0, 0] },
      strap:    { pos: [1.2, 2.2, 4.2],    lookAt: [0, 0, 1.5] },
    };

    const target = targetMap[angle] || targetMap.hero;
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(...target.pos);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 0.08;
      if (progress >= 1) {
        camera.position.copy(endPos);
        if (controlsRef.current) {
          controlsRef.current.target.set(...target.lookAt);
          controlsRef.current.update();
        }
        clearInterval(interval);
      } else {
        camera.position.lerpVectors(startPos, endPos, progress);
        if (controlsRef.current) {
          controlsRef.current.target.lerp(new THREE.Vector3(...target.lookAt), 0.1);
          controlsRef.current.update();
        }
      }
    }, 16);

    return () => clearInterval(interval);
  }, [angle, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={interactive}
      autoRotate={autoRotate && angle === 'hero'}
      autoRotateSpeed={0.9}
      enablePan={false}
      minDistance={2.4}
      maxDistance={7.5}
      minPolarAngle={Math.PI / 12}
      maxPolarAngle={Math.PI - Math.PI / 12}
      makeDefault
    />
  );
}

// Lighting presets inside canvas
function SceneLighting({ preset }: { preset: 'studio' | 'dramatic' | 'warm-gold' }) {
  if (preset === 'warm-gold') return (
    <>
      <ambientLight intensity={0.7} color="#FCEFC7" />
      <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFF2C6" castShadow />
      <directionalLight position={[-5, 4, -4]} intensity={1.1} color="#C4A760" />
      <pointLight position={[0, -2, 2]} intensity={0.8} color="#E8C374" />
    </>
  );

  if (preset === 'dramatic') return (
    <>
      <ambientLight intensity={0.3} color="#D8DEE9" />
      <directionalLight position={[6, 9, 3]} intensity={2.6} color="#FFFFFF" castShadow />
      <spotLight position={[-4, 6, 2]} intensity={1.8} angle={0.4} penumbra={1} color="#7E8DA4" />
      <pointLight position={[2, -3, -2]} intensity={0.5} color="#4A5568" />
    </>
  );

  // Default Swiss Studio
  return (
    <>
      <ambientLight intensity={0.65} color="#F0F4F8" />
      <directionalLight position={[4, 8, 4]} intensity={2.0} color="#FFFFFF" castShadow />
      <directionalLight position={[-4, 5, -3]} intensity={1.2} color="#D2D7E0" />
      <directionalLight position={[0, -4, 2]} intensity={0.6} color="#CBB26B" />
      <pointLight position={[3, 1, 3]} intensity={0.8} color="#FFFFFF" />
    </>
  );
}

// The actual 3D scene (rendered inside Canvas, no Suspense needed for procedural model)
function WatchScene({
  config,
  wireframe,
  lightingPreset,
  currentAngle,
  autoRotate,
  interactive,
  prefersReducedMotion,
  imageUrl,
}: {
  config: WatchConfiguration;
  wireframe: boolean;
  lightingPreset: 'studio' | 'dramatic' | 'warm-gold';
  currentAngle: CameraAngle;
  autoRotate: boolean;
  interactive: boolean;
  prefersReducedMotion: boolean;
  imageUrl?: string;
}) {
  return (
    <>
      <SceneLighting preset={lightingPreset} />

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.65}
        scale={7}
        blur={2.4}
        far={4}
        color="#000000"
      />

      {prefersReducedMotion ? (
        <ProceduralWatchModel config={config} wireframe={wireframe} imageUrl={imageUrl} />
      ) : (
        <Float
          speed={currentAngle === 'hero' ? 1.2 : 0}
          rotationIntensity={currentAngle === 'hero' ? 0.15 : 0}
          floatIntensity={currentAngle === 'hero' ? 0.2 : 0}
        >
          <ProceduralWatchModel config={config} wireframe={wireframe} imageUrl={imageUrl} />
        </Float>
      )}

      <CameraRig
        angle={currentAngle}
        autoRotate={autoRotate && !prefersReducedMotion}
        interactive={interactive}
      />
    </>
  );
}

export function WatchViewer3D({
  config,
  cameraAngle = 'hero',
  interactive = true,
  autoRotate = false,
  heightClass = 'h-[520px] lg:h-[640px]',
  wireframe = false,
  lightingPreset = 'studio',
  onAngleChange,
  compact = false,
  onExpand,
  imageUrl,
}: WatchViewer3DProps) {
  const [currentAngle, setCurrentAngle] = useState<CameraAngle>(cameraAngle);
  const [internalAutoRotate, setInternalAutoRotate] = useState<boolean>(autoRotate);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentAngle(cameraAngle);
  }, [cameraAngle]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
    }
    // Procedural model has no async loading — mark ready after brief mount delay
    const t = setTimeout(() => setIsLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  const handleSelectAngle = (angle: CameraAngle) => {
    setCurrentAngle(angle);
    setInternalAutoRotate(false);
    if (onAngleChange) onAngleChange(angle);
  };

  const handleResetCamera = () => {
    handleSelectAngle('hero');
    setInternalAutoRotate(true);
  };

  return (
    <div
      className={`relative w-full ${heightClass} bg-chrono-950 overflow-hidden select-none ${
        compact ? 'rounded-none' : 'rounded-2xl border border-chrono-border shadow-2xl'
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(203,178,107,0.08)_0%,transparent_60%)]" />

      {/* Loading overlay — shows only briefly on mount */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-chrono-950/90">
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-chrono-900/90 border border-chrono-gold/30">
            <div className="w-8 h-8 rounded-full border-2 border-t-chrono-gold border-r-chrono-gold/40 border-b-transparent border-l-transparent animate-spin" />
            <p className="font-mono tracking-widest text-[10px] uppercase text-chrono-gold">Loading 3D</p>
          </div>
        </div>
      )}

      {/* Top badges & controls */}
      {compact ? (
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono bg-chrono-950/80 backdrop-blur-md border border-chrono-gold/30 text-chrono-gold flex items-center gap-1.5 shadow-lg pointer-events-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            3D Interactive
          </span>

          <div className="flex items-center gap-1 pointer-events-auto">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setInternalAutoRotate(!internalAutoRotate);
              }}
              title={internalAutoRotate ? 'Pause 3D Spin' : 'Resume 3D Spin'}
              className={`p-1.5 rounded-full border backdrop-blur-md transition-colors ${
                internalAutoRotate
                  ? 'bg-chrono-gold/20 border-chrono-gold text-chrono-gold'
                  : 'bg-chrono-900/80 border-chrono-border text-chrono-ivory-muted hover:text-chrono-ivory'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${internalAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
            {onExpand && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onExpand();
                }}
                title="Fullscreen 3D Studio"
                className="p-1.5 rounded-full bg-chrono-900/80 border border-chrono-border hover:border-chrono-gold/60 text-chrono-ivory-muted hover:text-chrono-gold backdrop-blur-md transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Standard Top badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-widest font-mono bg-chrono-800/80 backdrop-blur-md border border-chrono-border text-chrono-gold flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Interactive 3D
            </span>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] tracking-wider uppercase font-mono bg-chrono-800/50 backdrop-blur-md border border-chrono-border/60 text-chrono-ivory-muted">
              PBR Metallurgy
            </span>
          </div>

          {/* Hint */}
          <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-chrono-ivory-muted bg-chrono-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-chrono-border/50">
            <span>Drag to rotate</span>
            <span className="text-chrono-gold">•</span>
            <span>Scroll to zoom</span>
          </div>
        </>
      )}

      {/* Canvas */}
      <Canvas
        camera={{ position: [2.8, 1.8, 3.8], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        onCreated={() => setIsLoaded(true)}
      >
        <WatchScene
          config={config}
          wireframe={wireframe}
          lightingPreset={lightingPreset}
          currentAngle={currentAngle}
          autoRotate={internalAutoRotate}
          interactive={interactive}
          prefersReducedMotion={prefersReducedMotion}
          imageUrl={imageUrl}
        />
      </Canvas>

      {/* Bottom controls / hints */}
      {compact ? (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-[9px] font-mono tracking-widest uppercase text-chrono-gold/80 bg-chrono-950/80 backdrop-blur-sm px-3 py-1 rounded-full border border-chrono-gold/20 shadow-md">
          Drag to spin 360°
        </div>
      ) : (
        <>
          {/* Angle selector toolbar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1.5 bg-chrono-900/85 backdrop-blur-md rounded-full border border-chrono-border shadow-xl">
            {(
              [
                { id: 'hero' as CameraAngle, label: '360°' },
                { id: 'dial' as CameraAngle, label: 'Dial' },
                { id: 'profile' as CameraAngle, label: 'Profile' },
                { id: 'strap' as CameraAngle, label: 'Strap' },
                { id: 'caseback' as CameraAngle, label: 'Caseback' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleSelectAngle(btn.id)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all duration-200 ${
                  currentAngle === btn.id
                    ? 'bg-chrono-gold text-chrono-950 font-bold shadow-md'
                    : 'text-chrono-ivory-muted hover:text-chrono-ivory hover:bg-chrono-800/80'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setInternalAutoRotate(!internalAutoRotate)}
              title="Toggle Auto Rotation"
              className={`p-2.5 rounded-full border backdrop-blur-md transition-colors shadow-lg ${
                internalAutoRotate
                  ? 'bg-chrono-gold/20 border-chrono-gold text-chrono-gold'
                  : 'bg-chrono-800/80 border-chrono-border text-chrono-ivory-muted hover:text-chrono-ivory'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${internalAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
            <button
              onClick={handleResetCamera}
              title="Reset Camera"
              className="p-2.5 rounded-full bg-chrono-800/80 border border-chrono-border text-chrono-ivory-muted hover:text-chrono-ivory backdrop-blur-md transition-colors shadow-lg"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
