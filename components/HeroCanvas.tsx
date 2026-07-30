'use client'

import { useRef, type CSSProperties } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Scene({
  mouseRef,
  color,
}: {
  mouseRef: { current: { x: number; y: number } }
  color: string
}) {
  const tiltRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (!meshRef.current || !tiltRef.current) return
    meshRef.current.rotation.y += delta * 0.14
    meshRef.current.rotation.x += delta * 0.08
    tiltRef.current.rotation.x = THREE.MathUtils.lerp(
      tiltRef.current.rotation.x,
      -mouseRef.current.y * 0.25,
      0.06,
    )
    tiltRef.current.rotation.y = THREE.MathUtils.lerp(
      tiltRef.current.rotation.y,
      mouseRef.current.x * 0.25,
      0.06,
    )
  })

  return (
    <Float speed={1.3} rotationIntensity={0} floatIntensity={0.15}>
      {/* scale={3} enlarges the shape to fill and slightly overflow the viewport */}
      <group ref={tiltRef} scale={3}>
        <mesh ref={meshRef}>
          {/* Fewer segments (42 tubular, 7 radial) keeps the wireframe sparse at large scale */}
          <torusKnotGeometry args={[1, 0.35, 42, 7, 2, 3]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroCanvas({
  mouseRef,
  color,
  canvasStyle,
}: {
  mouseRef: { current: { x: number; y: number } }
  color: string
  canvasStyle?: CSSProperties
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 52 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%', ...canvasStyle }}
    >
      <Scene mouseRef={mouseRef} color={color} />
    </Canvas>
  )
}
