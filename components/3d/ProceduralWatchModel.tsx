'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WatchConfiguration } from '@/types/configuration';

interface ProceduralWatchProps {
  config: WatchConfiguration;
  wireframe?: boolean;
  imageUrl?: string;
}

const DEFAULT_WATCH_IMAGES: Record<string, string> = {
  'chrono-apex-42': '/images/watch-apex.jpg',
  'midnight-noir-40': '/images/watch-midnight.jpg',
  'heritage-1958': '/images/watch-heritage.jpg',
  'ocean-diver-300': '/images/watch-aqua.jpg',
  'titanium-edge-41': '/images/watch-celestial.jpg',
  'royal-skeleton-41': '/images/watch-skeleton.jpg',
};

// Custom hook to extract high-res dial face from the authentic studio photograph
function useWatchDialTexture(imageUrl: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill with dark base
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, 1024, 1024);

      // Crop the center dial circular region from the studio photograph
      const minDim = Math.min(img.width, img.height);
      const cropSize = minDim * 0.73; // dial circle area
      const sx = (img.width - cropSize) / 2;
      const sy = (img.height - cropSize) / 2 - minDim * 0.005;

      // Draw cropped dial into 1024x1024 canvas
      ctx.save();
      ctx.beginPath();
      ctx.arc(512, 512, 510, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, 1024, 1024);
      ctx.restore();

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      setTexture(tex);
    };
  }, [imageUrl]);

  return texture;
}

export function ProceduralWatchModel({ config, wireframe = false, imageUrl }: ProceduralWatchProps) {
  const secondHandRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Group>(null);
  const balanceWheelRef = useRef<THREE.Group>(null);

  const resolvedImageUrl =
    imageUrl || (config.modelId && DEFAULT_WATCH_IMAGES[config.modelId]) || '/images/watch-apex.jpg';

  const dialTexture = useWatchDialTexture(resolvedImageUrl);

  // Smooth continuous animation: sweep second hand + oscillating automatic rotor
  useFrame((state, delta) => {
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z -= delta * 1.05;
    }
    if (rotorRef.current) {
      rotorRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.9) * 0.8;
    }
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 22) * 0.9;
    }
  });

  // Premium Case Metallurgy (Gold, Steel, Black DLC)
  const caseMat = useMemo(() => {
    switch (config.caseMaterial) {
      case 'black-steel':
        return { color: '#16181D', metalness: 0.9, roughness: 0.28, clearcoat: 0.4, clearcoatRoughness: 0.15 };
      case 'gold':
        return { color: '#E8C678', metalness: 0.96, roughness: 0.18, clearcoat: 0.6, clearcoatRoughness: 0.1 };
      default: // steel
        return { color: '#E0E3EB', metalness: 0.98, roughness: 0.16, clearcoat: 0.5, clearcoatRoughness: 0.1 };
    }
  }, [config.caseMaterial]);

  // Center link metallurgy for metal bracelets
  const centerLinkMat = useMemo(() => {
    if (config.caseMaterial === 'gold') {
      return { color: '#F3D58C', metalness: 0.98, roughness: 0.1 };
    }
    if (config.caseMaterial === 'black-steel') {
      return { color: '#22252C', metalness: 0.95, roughness: 0.2 };
    }
    return { color: '#EEF2F7', metalness: 0.99, roughness: 0.1 };
  }, [config.caseMaterial]);

  // Strap material
  const strapMat = useMemo(() => {
    if (config.strapType === 'metal') {
      return { color: config.strapColor === 'gold' ? '#E8C678' : '#DDE1E8', metalness: 0.95, roughness: 0.22 };
    }
    if (config.strapType === 'rubber') {
      return { color: config.strapColor === 'navy' ? '#11223A' : '#141518', metalness: 0.05, roughness: 0.85 };
    }
    // Leather
    return { color: config.strapColor === 'brown' ? '#4A2A18' : '#121214', metalness: 0.06, roughness: 0.7 };
  }, [config.strapType, config.strapColor]);

  const accentColor = config.caseMaterial === 'gold' ? '#F7DC98' : '#F0F4FA';
  const isChronograph =
    config.dialStyle === 'chronograph' || (config.modelId && config.modelId.includes('chrono'));
  const isSkeleton = config.dialStyle === 'skeleton';

  return (
    <group dispose={null}>
      {/* ── 1. MAIN WATCH CASE BODY ── */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.52, 1.48, 0.42, 72]} />
        <meshStandardMaterial {...caseMat} wireframe={wireframe} />
      </mesh>

      {/* Outer chamfered bezel ring */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[1.55, 1.52, 0.08, 72]} />
        <meshStandardMaterial {...caseMat} metalness={0.98} roughness={0.12} wireframe={wireframe} />
      </mesh>

      {/* Inner Tachymeter / Bezel Ring (correctly rotated in XZ plane) */}
      <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.34, 1.54, 72]} />
        <meshStandardMaterial
          color={config.dialColor === 'white' ? '#FFFFFF' : '#101216'}
          metalness={0.85}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── 2. SCULPTED LUXURY LUGS ── */}
      {[
        { pos: [-0.94, -0.04, 1.58] as [number, number, number], rot: [0.38, 0, 0.12] as [number, number, number] },
        { pos: [0.94, -0.04, 1.58] as [number, number, number], rot: [0.38, 0, -0.12] as [number, number, number] },
        { pos: [-0.94, -0.04, -1.58] as [number, number, number], rot: [-0.38, 0, -0.12] as [number, number, number] },
        { pos: [0.94, -0.04, -1.58] as [number, number, number], rot: [-0.38, 0, 0.12] as [number, number, number] },
      ].map((lug, i) => (
        <group key={i} position={lug.pos} rotation={lug.rot}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.36, 0.72]} />
            <meshStandardMaterial {...caseMat} wireframe={wireframe} />
          </mesh>
          {/* Polished chamfer bevel */}
          <mesh position={[0, 0.16, 0]}>
            <boxGeometry args={[0.2, 0.04, 0.68]} />
            <meshStandardMaterial {...caseMat} metalness={0.99} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* ── 3. FLUTED CROWN at 3 o'clock ── */}
      <group position={[1.6, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.24, 32]} />
          <meshStandardMaterial {...caseMat} metalness={0.98} roughness={0.15} />
        </mesh>
        {/* Fluted grooves */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[0, 0, 0]} rotation={[0, (i * Math.PI) / 6, 0]}>
            <boxGeometry args={[0.24, 0.02, 0.02]} />
            <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Crown embossed top cabochon */}
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
          <meshStandardMaterial color={accentColor} metalness={0.98} roughness={0.08} />
        </mesh>
      </group>

      {/* ── 4. CHRONOGRAPH PISTON PUSHERS (at 2 & 4 o'clock) ── */}
      {isChronograph && (
        <>
          <mesh position={[1.46, 0, 0.72]} rotation={[0, -0.45, -Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.13, 0.13, 0.26, 24]} />
            <meshStandardMaterial {...caseMat} metalness={0.98} roughness={0.12} />
          </mesh>
          <mesh position={[1.46, 0, -0.72]} rotation={[0, 0.45, -Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.13, 0.13, 0.26, 24]} />
            <meshStandardMaterial {...caseMat} metalness={0.98} roughness={0.12} />
          </mesh>
        </>
      )}

      {/* ── 5. PHOTOREALISTIC DIAL FACE ── */}
      <group position={[0, 0.23, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Dial Face Plate textured with authentic studio photo */}
        <mesh receiveShadow>
          <circleGeometry args={[1.34, 72]} />
          {dialTexture ? (
            <meshStandardMaterial
              map={dialTexture}
              roughness={0.25}
              metalness={0.25}
              wireframe={wireframe}
            />
          ) : (
            <meshStandardMaterial
              color={config.dialColor === 'white' ? '#F7F6F2' : '#0B0C10'}
              roughness={0.3}
              metalness={0.3}
              wireframe={wireframe}
            />
          )}
        </mesh>

        {/* 3D Applied Gold/Steel Hour Batons that catch scene lights */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI) / 6;
          const r = 1.08;
          const x = Math.sin(angle) * r;
          const y = Math.cos(angle) * r;
          const is12 = i === 0;
          return (
            <group key={i} position={[x, y, 0.008]} rotation={[0, 0, -angle]}>
              {is12 ? (
                <>
                  <mesh position={[-0.04, 0, 0]}>
                    <boxGeometry args={[0.035, 0.2, 0.02]} />
                    <meshStandardMaterial color={accentColor} metalness={0.98} roughness={0.1} />
                  </mesh>
                  <mesh position={[0.04, 0, 0]}>
                    <boxGeometry args={[0.035, 0.2, 0.02]} />
                    <meshStandardMaterial color={accentColor} metalness={0.98} roughness={0.1} />
                  </mesh>
                </>
              ) : (
                <mesh>
                  <boxGeometry args={[0.04, 0.16, 0.02]} />
                  <meshStandardMaterial color={accentColor} metalness={0.98} roughness={0.1} />
                </mesh>
              )}
            </group>
          );
        })}

        {/* ── 6. REAL 3D TIMEPIECE HANDS ── */}
        {/* Hour Hand */}
        <group position={[0, 0, 0.02]} rotation={[0, 0, -1.8]}>
          <mesh position={[0, 0.34, 0]}>
            <boxGeometry args={[0.065, 0.68, 0.02]} />
            <meshStandardMaterial color={accentColor} metalness={0.98} roughness={0.12} />
          </mesh>
          {/* Lume insert */}
          <mesh position={[0, 0.34, 0.012]}>
            <boxGeometry args={[0.025, 0.44, 0.005]} />
            <meshStandardMaterial color="#E8F8F0" emissive="#A7E8BD" emissiveIntensity={0.2} />
          </mesh>
        </group>

        {/* Minute Hand */}
        <group position={[0, 0, 0.035]} rotation={[0, 0, 0.72]}>
          <mesh position={[0, 0.48, 0]}>
            <boxGeometry args={[0.055, 0.96, 0.02]} />
            <meshStandardMaterial color={accentColor} metalness={0.98} roughness={0.12} />
          </mesh>
          {/* Lume insert */}
          <mesh position={[0, 0.48, 0.012]}>
            <boxGeometry args={[0.022, 0.64, 0.005]} />
            <meshStandardMaterial color="#E8F8F0" emissive="#A7E8BD" emissiveIntensity={0.2} />
          </mesh>
        </group>

        {/* Sweeping Seconds Hand */}
        <group ref={secondHandRef} position={[0, 0, 0.05]}>
          <mesh position={[0, 0.54, 0]}>
            <boxGeometry args={[0.014, 1.1, 0.01]} />
            <meshStandardMaterial
              color={config.dialColor === 'black' ? '#E8C678' : '#D92525'}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
          {/* Counterbalance arrow / tail */}
          <mesh position={[0, -0.22, 0]}>
            <boxGeometry args={[0.028, 0.44, 0.01]} />
            <meshStandardMaterial color={accentColor} metalness={0.95} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <cylinderGeometry args={[0.055, 0.055, 0.025, 24]} />
            <meshStandardMaterial color={accentColor} metalness={0.98} />
          </mesh>
        </group>

        {/* Center Pivot Cap */}
        <mesh position={[0, 0, 0.066]}>
          <cylinderGeometry args={[0.05, 0.05, 0.015, 24]} />
          <meshStandardMaterial color={accentColor} metalness={0.98} />
        </mesh>

        {/* Skeleton tourbillon cage (if skeleton style) */}
        {isSkeleton && (
          <group position={[0, -0.36, 0.008]}>
            <mesh>
              <ringGeometry args={[0.15, 0.44, 32]} />
              <meshStandardMaterial color="#0A0B0E" metalness={0.6} roughness={0.3} />
            </mesh>
            <group ref={balanceWheelRef} position={[0, 0, 0.015]}>
              <mesh>
                <ringGeometry args={[0.2, 0.3, 24]} />
                <meshStandardMaterial color="#E8C678" metalness={0.98} roughness={0.1} />
              </mesh>
              <mesh>
                <boxGeometry args={[0.44, 0.03, 0.01]} />
                <meshStandardMaterial color="#E8C678" metalness={0.98} />
              </mesh>
              <mesh position={[0, 0, 0.01]}>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshStandardMaterial color="#D90429" roughness={0.1} />
              </mesh>
            </group>
          </group>
        )}
      </group>

      {/* ── 7. DOMED SAPPHIRE CRYSTAL ── */}
      <mesh position={[0, 0.27, 0]}>
        <cylinderGeometry args={[1.44, 1.46, 0.04, 72]} />
        <meshStandardMaterial
          color="#E8F4F8"
          roughness={0.02}
          metalness={0.1}
          transparent
          opacity={0.16}
          wireframe={wireframe}
        />
      </mesh>

      {/* ── 8. REALISTIC OYSTER BRACELET / LEATHER STRAP ── */}
      {(['top', 'bot'] as const).map((side) => {
        const isTop = side === 'top';
        const dir = isTop ? 1 : -1;

        if (config.strapType === 'metal') {
          // Articulated 3-link Oyster rows curving downward
          return (
            <group key={side} position={[0, -0.05, dir * 1.55]}>
              {Array.from({ length: 5 }).map((_, i) => {
                const zOffset = dir * (i * 0.46 + 0.22);
                const yOffset = -Math.pow(i * 0.26, 1.8) * 0.6;
                const linkWidth = 1.48 - i * 0.04;

                return (
                  <group key={i} position={[0, yOffset, zOffset]} rotation={[-dir * (i * 0.12), 0, 0]}>
                    {/* Left brushed link */}
                    <mesh position={[-linkWidth * 0.35, 0, 0]} castShadow>
                      <boxGeometry args={[linkWidth * 0.3, 0.22, 0.44]} />
                      <meshStandardMaterial {...strapMat} wireframe={wireframe} />
                    </mesh>

                    {/* Center polished mirror link */}
                    <mesh position={[0, 0.01, 0]} castShadow>
                      <boxGeometry args={[linkWidth * 0.38, 0.24, 0.44]} />
                      <meshStandardMaterial {...centerLinkMat} wireframe={wireframe} />
                    </mesh>

                    {/* Right brushed link */}
                    <mesh position={[linkWidth * 0.35, 0, 0]} castShadow>
                      <boxGeometry args={[linkWidth * 0.3, 0.22, 0.44]} />
                      <meshStandardMaterial {...strapMat} wireframe={wireframe} />
                    </mesh>
                  </group>
                );
              })}
            </group>
          );
        }

        if (config.strapType === 'rubber') {
          // Textured diver rubber strap with ribbed ridges
          return (
            <group key={side} position={[0, -0.08, dir * 2.3]}>
              <mesh castShadow>
                <boxGeometry args={[1.44, 0.22, 1.65]} />
                <meshStandardMaterial {...strapMat} wireframe={wireframe} />
              </mesh>
              {/* Diver ribs */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <mesh key={idx} position={[0, 0.12, (idx - 1.5) * 0.35]}>
                  <boxGeometry args={[1.38, 0.04, 0.12]} />
                  <meshStandardMaterial color="#0A0B0E" roughness={0.9} />
                </mesh>
              ))}
            </group>
          );
        }

        // Luxury Stitched Leather Strap
        return (
          <group key={side} position={[0, -0.08, dir * 2.3]}>
            <mesh castShadow>
              <boxGeometry args={[1.42, 0.22, 1.65]} />
              <meshStandardMaterial {...strapMat} wireframe={wireframe} />
            </mesh>
            {/* Contrasting artisan edge stitching */}
            {[-0.64, 0.64].map((sx) => (
              <mesh key={sx} position={[sx, 0.12, 0]}>
                <boxGeometry args={[0.024, 0.02, 1.55]} />
                <meshStandardMaterial color="#D1B078" roughness={0.9} />
              </mesh>
            ))}
            {/* Leather keeper loop */}
            {isTop && (
              <mesh position={[0, 0.02, 0.35]}>
                <boxGeometry args={[1.5, 0.28, 0.18]} />
                <meshStandardMaterial {...strapMat} roughness={0.65} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* ── 9. EXHIBITION SAPPHIRE CASEBACK ── */}
      <group position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Outer caseback bevel */}
        <mesh receiveShadow>
          <ringGeometry args={[0.9, 1.48, 72]} />
          <meshStandardMaterial {...caseMat} wireframe={wireframe} />
        </mesh>

        {/* Sapphire window */}
        <mesh position={[0, 0, 0.002]}>
          <circleGeometry args={[0.9, 48]} />
          <meshStandardMaterial color="#1E2330" roughness={0.1} metalness={0.4} transparent opacity={0.88} />
        </mesh>

        {/* 22k Gold Oscillating Rotor */}
        <group ref={rotorRef} position={[0, 0, 0.02]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.82, 0.82, 0.03, 32, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#E8C678" metalness={0.98} roughness={0.18} />
          </mesh>
          {/* Côtes de Genève striping */}
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[-0.35 + i * 0.14, 0.35, 0.025]}>
              <boxGeometry args={[0.02, 0.8, 0.005]} />
              <meshStandardMaterial color="#CCA34A" metalness={0.95} roughness={0.1} />
            </mesh>
          ))}
          {/* Central bearing */}
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.04, 24]} />
            <meshStandardMaterial color="#E0E4EB" metalness={0.98} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <ringGeometry args={[0.08, 0.14, 24]} />
            <meshStandardMaterial color="#D2D6E0" metalness={0.96} roughness={0.12} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
