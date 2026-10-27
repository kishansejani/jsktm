import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Lightformer, ContactShadows, Float, Line } from '@react-three/drei'
import * as THREE from 'three'

import { YARN } from './yarn.js'
const NAVY = '#1b3b7b'

/* ---------- procedural wound-yarn texture ---------- */
const texCache = new Map()
function woundTexture(color) {
  if (texCache.has(color)) return texCache.get(color)
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 256
  const g = c.getContext('2d')
  g.fillStyle = color
  g.fillRect(0, 0, 64, 256)
  for (let y = 0; y < 256; y += 4) {
    g.fillStyle = y % 8 ? 'rgba(0,0,0,.16)' : 'rgba(255,255,255,.14)'
    g.fillRect(0, y, 64, 2)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(1, 3)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  texCache.set(color, t)
  return t
}

/* ---------- machine variants ---------- */
export const KINDS = {
  assembly: { rTop: 0.46, rBot: 0.46, len: 0.9, plies: 3, spacing: 1.45 },
  cone: { rTop: 0.2, rBot: 0.52, len: 1.0, plies: 1, spacing: 1.45 },
  soft: { rTop: 0.5, rBot: 0.5, len: 0.82, plies: 1, spacing: 1.5, flanges: true },
  preapp: { rTop: 0.3, rBot: 0.38, len: 0.7, plies: 2, spacing: 1.3 },
  jumbo: { rTop: 0.78, rBot: 0.78, len: 1.05, plies: 1, spacing: 2.1 },
}

const DRUM_R = 0.32
const DRUM_Y = 0.5

function Hl({ on }) {
  return on ? { emissive: '#3d7bff', emissiveIntensity: 0.9 } : {}
}

function Head({ x, kind, color, spin, focus }) {
  const cfg = KINDS[kind]
  const drum = useRef()
  const pkg = useRef()
  const tex = useMemo(() => woundTexture(color), [color])
  const avgR = (cfg.rTop + cfg.rBot) / 2
  const pkgY = DRUM_Y + DRUM_R + avgR * 0.9
  const top = pkgY + Math.max(cfg.rTop, cfg.rBot)

  useFrame((_, d) => {
    if (!spin) return
    drum.current.rotation.y += d * 3.2
    pkg.current.rotation.y -= d * (3.2 * DRUM_R) / avgR
  })

  const yarnPts = useMemo(() => {
    const out = []
    for (let i = 0; i < cfg.plies; i++) {
      const bx = (i - (cfg.plies - 1) / 2) * 0.28
      out.push([
        [bx, top + 0.95, -0.95],
        [bx * 0.6, top + 0.55, -0.55],
        [bx * 0.2, top + 0.15, -0.2],
        [0, pkgY + cfg.rTop * 0.9, 0.05],
      ])
    }
    return out
  }, [cfg, top, pkgY])

  const dOn = focus === 'drum'
  const pOn = focus === 'package'
  const sOn = focus === 'sensor'
  const bOn = focus === 'panel'

  return (
    <group position={[x, 0, 0]}>
      {/* grooved drum (axis along Z) */}
      <group rotation={[Math.PI / 2, 0, 0]} position={[0, DRUM_Y, 0]}>
        <mesh ref={drum}>
          <cylinderGeometry args={[DRUM_R, DRUM_R, 1.0, 40]} />
          <meshStandardMaterial color="#cfd6e4" metalness={0.9} roughness={0.25} {...Hl({ on: dOn })} />
          {[-0.36, -0.18, 0, 0.18, 0.36].map((y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[DRUM_R + 0.004, 0.014, 8, 40]} />
              <meshStandardMaterial color="#7f8aa3" metalness={0.8} roughness={0.35} />
            </mesh>
          ))}
        </mesh>
      </group>

      {/* AC co-axial motor */}
      <mesh position={[0, DRUM_Y, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.34, 32]} />
        <meshStandardMaterial color={NAVY} metalness={0.5} roughness={0.4} {...Hl({ on: dOn })} />
      </mesh>

      {/* package */}
      <group rotation={[Math.PI / 2, 0, 0]} position={[0, pkgY, 0]}>
        <mesh ref={pkg}>
          <cylinderGeometry args={[cfg.rTop, cfg.rBot, cfg.len, 48]} />
          <meshStandardMaterial attach="material-0" map={tex} roughness={0.85} {...Hl({ on: pOn })} />
          <meshStandardMaterial attach="material-1" color={color} roughness={0.8} />
          <meshStandardMaterial attach="material-2" color={color} roughness={0.8} />
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, cfg.len + 0.2, 20]} />
            <meshStandardMaterial color="#f3f1ea" roughness={0.6} />
          </mesh>
          {cfg.flanges &&
            [-1, 1].map((s) => (
              <mesh key={s} position={[0, (s * cfg.len) / 2, 0]}>
                <cylinderGeometry args={[cfg.rTop + 0.04, cfg.rTop + 0.04, 0.03, 40]} />
                <meshStandardMaterial color="#e9edf5" roughness={0.5} />
              </mesh>
            ))}
        </mesh>
      </group>

      {/* cradle arms */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0, (DRUM_Y + pkgY) / 2 + 0.1, s * (cfg.len / 2 + 0.16)]}>
          <boxGeometry args={[0.07, pkgY - DRUM_Y + 0.35, 0.06]} />
          <meshStandardMaterial color="#26324f" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* optical yarn sensor */}
      <group position={[0, top + 0.28, -0.3]}>
        <mesh>
          <boxGeometry args={[0.3, 0.13, 0.13]} />
          <meshStandardMaterial color="#1a2340" metalness={0.5} roughness={0.4} {...Hl({ on: sOn })} />
        </mesh>
        <mesh position={[0, -0.02, 0.075]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#38f0e0" emissive="#38f0e0" emissiveIntensity={2.2} />
        </mesh>
      </group>

      {/* programmable braking / display */}
      <mesh position={[0, 0.3, 0.92]}>
        <boxGeometry args={[0.5, 0.24, 0.07]} />
        <meshStandardMaterial color="#0c1430" metalness={0.4} roughness={0.5} {...Hl({ on: bOn })} />
      </mesh>
      <mesh position={[0, 0.3, 0.957]}>
        <planeGeometry args={[0.38, 0.12]} />
        <meshStandardMaterial color="#38b0d8" emissive="#38b0d8" emissiveIntensity={1.4} />
      </mesh>

      {/* feed bobbins + yarn path */}
      {yarnPts.map((pts, i) => {
        const bx = pts[0][0]
        return (
          <group key={i}>
            <mesh position={[bx, top + 0.95, -0.95]}>
              <cylinderGeometry args={[0.13, 0.13, 0.34, 20]} />
              <meshStandardMaterial color={YARN[(YARN.indexOf(color) + i + 1) % YARN.length]} roughness={0.8} />
            </mesh>
            <Line points={pts} color={color} lineWidth={1.6} />
          </group>
        )
      })}
    </group>
  )
}

function Frame({ width, creel }) {
  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[width, 0.2, 1.9]} />
        <meshStandardMaterial color="#121c3a" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.215, 0]}>
        <boxGeometry args={[width + 0.02, 0.03, 1.92]} />
        <meshStandardMaterial color={NAVY} emissive={NAVY} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.9, -0.82]}>
        <boxGeometry args={[width, 0.14, 0.14]} />
        <meshStandardMaterial color="#1c2850" metalness={0.6} roughness={0.4} />
      </mesh>
      {creel && (
        <mesh position={[0, 1.7, -0.95]}>
          <boxGeometry args={[width, 0.06, 0.1]} />
          <meshStandardMaterial color="#1c2850" metalness={0.6} roughness={0.4} />
        </mesh>
      )}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[(s * width) / 2, 0.9, -0.82]}>
            <boxGeometry args={[0.12, 1.6, 0.12]} />
            <meshStandardMaterial color="#1c2850" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[(s * width) / 2, 0.5, 0.2]}>
            <boxGeometry args={[0.12, 0.6, 1.8]} />
            <meshStandardMaterial color="#17224a" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function Machine({ kind = 'cone', heads = 4, color = 0, multi = true, spin = true, focus = null }) {
  const cfg = KINDS[kind]
  const total = heads
  const width = total * cfg.spacing + 0.4
  return (
    <group>
      <Frame width={width} creel />
      {Array.from({ length: total }).map((_, i) => {
        const x = (i - (total - 1) / 2) * cfg.spacing
        const c = multi ? YARN[(color + i) % YARN.length] : YARN[color % YARN.length]
        return <Head key={i} x={x} kind={kind} color={c} spin={spin} focus={focus} />
      })}
    </group>
  )
}

/* ---------- gear (from the JSK logo) ---------- */
function Gear({ r = 2.6, teeth = 18, ...props }) {
  const geo = useMemo(() => {
    const s = new THREE.Shape()
    const step = (Math.PI * 2) / teeth
    for (let i = 0; i < teeth; i++) {
      const a = i * step
      const pts = [
        [r * 0.88, a],
        [r, a + step * 0.12],
        [r, a + step * 0.38],
        [r * 0.88, a + step * 0.5],
      ]
      pts.forEach(([rad, ang], j) => {
        const x = Math.cos(ang) * rad
        const y = Math.sin(ang) * rad
        i === 0 && j === 0 ? s.moveTo(x, y) : s.lineTo(x, y)
      })
    }
    const hole = new THREE.Path()
    hole.absarc(0, 0, r * 0.62, 0, Math.PI * 2, true)
    s.holes.push(hole)
    return new THREE.ExtrudeGeometry(s, { depth: 0.18, bevelEnabled: false })
  }, [r, teeth])
  const ref = useRef()
  useFrame((_, d) => (ref.current.rotation.z += d * 0.12))
  return (
    <mesh ref={ref} geometry={geo} {...props}>
      <meshStandardMaterial color={NAVY} metalness={0.7} roughness={0.35} emissive={NAVY} emissiveIntensity={0.35} />
    </mesh>
  )
}

function Particles({ count = 90 }) {
  const ref = useRef()
  const { positions, colors } = useMemo(() => {
    const p = new Float32Array(count * 3)
    const c = new Float32Array(count * 3)
    const col = new THREE.Color()
    for (let i = 0; i < count; i++) {
      p.set([(Math.random() - 0.5) * 14, Math.random() * 6 - 1, (Math.random() - 0.5) * 8], i * 3)
      col.set(YARN[i % YARN.length])
      c.set([col.r, col.g, col.b], i * 3)
    }
    return { positions: p, colors: c }
  }, [count])
  useFrame((_, d) => (ref.current.rotation.y += d * 0.03))
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 6]} intensity={1.6} />
      <pointLight position={[-6, 3, -4]} intensity={30} color="#3d7bff" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 4]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={2} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#8fb4ff" />
        <Lightformer form="rect" intensity={2} position={[6, 1, -2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} color="#ffd9b0" />
      </Environment>
    </>
  )
}

/** Moves the camera to a preset (used by the scroll "anatomy" section). */
function CameraRig({ preset }) {
  const { camera } = useThree()
  const look = useRef(new THREE.Vector3(...preset.look))
  useFrame((_, d) => {
    const k = 1 - Math.exp(-d * 3.2)
    camera.position.lerp(new THREE.Vector3(...preset.pos), k)
    look.current.lerp(new THREE.Vector3(...preset.look), k)
    camera.lookAt(look.current)
  })
  return null
}

/* ---------- public canvases ---------- */
export function MachineCanvas({ kind, heads = 4, color = 0, multi = true, autoRotate = true, zoom = false, camera = [7.6, 4.2, 9.0], fov = 36 }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: camera, fov }} gl={{ antialias: true, alpha: true }}>
      <Lights />
      <group position={[0, -0.8, 0]}>
        <Machine kind={kind} heads={heads} color={color} multi={multi} />
        <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={16} blur={2.6} far={4} color="#000814" />
      </group>
      <OrbitControls enablePan={false} enableZoom={zoom} minDistance={5} maxDistance={13} minPolarAngle={0.35} maxPolarAngle={Math.PI / 2.05} autoRotate={autoRotate} autoRotateSpeed={1.1} makeDefault />
    </Canvas>
  )
}

export function HeroCanvas() {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [7.2, 3.8, 8.6], fov: 36 }} gl={{ antialias: true, alpha: true }}>
      <Lights />
      <Particles />
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
        <group position={[0, -0.6, 0]}>
          <Machine kind="cone" heads={3} color={0} multi />
        </group>
      </Float>
      <Gear position={[-0.6, 2.6, -4.2]} r={2.3} />
      <Gear position={[3.6, 3.8, -4.8]} r={1.1} teeth={12} rotation={[0, 0, 0.2]} />
      <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={16} blur={2.8} far={4} color="#000814" />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.6} maxPolarAngle={Math.PI / 2.05} autoRotate autoRotateSpeed={0.9} makeDefault />
    </Canvas>
  )
}

export function AnatomyCanvas({ focus, preset }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: preset.pos, fov: 34 }} gl={{ antialias: true, alpha: true }}>
      <Lights />
      <group position={[0, -0.6, 0]}>
        <Machine kind="assembly" heads={1} color={3} multi={false} focus={focus} />
        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={8} blur={2.4} far={3} color="#000814" />
      </group>
      <CameraRig preset={preset} />
    </Canvas>
  )
}
