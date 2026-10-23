import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreProps {
  particleCount: number
  skipIntro: boolean
}

/** Layered geometry: wireframe shell, inner faceted core, gyroscope rings and sparse particles. */
function Core({ particleCount, skipIntro }: CoreProps) {
  const root = useRef<THREE.Group>(null)
  const shell = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const cloud = useRef<THREE.Points>(null)
  const intro = useRef(skipIntro ? 1 : 0)

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      // Points on a thick spherical shell around the core.
      const r = 2.1 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [particleCount])

  useFrame((state, delta) => {
    const g = root.current
    if (!g) return

    // Entry: the core assembles over ~1.6s.
    intro.current = Math.min(1, intro.current + delta / 1.6)
    const e = 1 - Math.pow(1 - intro.current, 3)
    g.scale.setScalar(0.55 + 0.45 * e)

    const t = state.clock.elapsedTime
    const scroll = typeof window !== 'undefined' ? window.scrollY / 900 : 0

    // Pointer parallax + scroll-linked rotation, damped for a heavy, engineered feel.
    const targetY = state.pointer.x * 0.45 + scroll * 1.2
    const targetX = -state.pointer.y * 0.3 + scroll * 0.4
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta)

    if (shell.current) {
      shell.current.rotation.y = t * 0.12
      shell.current.rotation.x = t * 0.07
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.25
      inner.current.rotation.z = t * 0.15
      const pulse = 1 + Math.sin(t * 1.6) * 0.03
      inner.current.scale.setScalar(pulse)
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.3
    if (ringB.current) ringB.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.15
    if (cloud.current) cloud.current.rotation.y = t * 0.03
  })

  return (
    <group ref={root}>
      <pointLight position={[3, 2, 4]} intensity={30} color="#22d3ee" />
      <pointLight position={[-4, -2, -3]} intensity={18} color="#a78bfa" />
      <ambientLight intensity={0.25} />

      {/* Outer wireframe lattice */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Inner faceted core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial
          color="#0b1b2e"
          emissive="#0e7490"
          emissiveIntensity={0.9}
          metalness={0.7}
          roughness={0.25}
          flatShading
        />
      </mesh>

      {/* Gyroscope rings */}
      <mesh ref={ringA}>
        <torusGeometry args={[1.45, 0.012, 8, 96]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.8} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.01, 8, 96]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.7} />
      </mesh>

      {/* Sparse particle field */}
      <points ref={cloud}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#9bdcff" size={0.025} sizeAttenuation transparent opacity={0.75} />
      </points>
    </group>
  )
}

interface Props {
  active: boolean
  skipIntro: boolean
}

export default function HeroCore({ active, skipIntro }: Props) {
  const lowPower =
    typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4
  const particleCount = lowPower ? 220 : 420

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, lowPower ? 1 : 1.5]}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      gl={{ antialias: !lowPower, powerPreference: 'high-performance', alpha: true }}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Core particleCount={particleCount} skipIntro={skipIntro} />
    </Canvas>
  )
}
