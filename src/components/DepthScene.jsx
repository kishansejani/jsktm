import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const vert = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`
const frag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D map; uniform sampler2D dmap; uniform vec2 m; uniform float k;
void main(){
  float d = texture2D(dmap, vUv).r;
  vec2 off = vec2(m.x, -m.y) * (d - 0.42) * k;
  vec4 c = texture2D(map, vUv - off);
  float sheen = smoothstep(0.0, 1.0, 1.0 - abs(vUv.x - (0.5 + m.x * 0.45)) * 3.0) * 0.10 * d;
  c.rgb += sheen * c.a;
  if (c.a < 0.01) discard;
  gl_FragColor = c;
}`

function Layer({ src, strength }) {
  const [map, dmap] = useTexture([`${src}.webp`, `${src}-depth.webp`])
  const { viewport } = useThree()
  const group = useRef()
  const mat = useRef()
  const m = useRef(new THREE.Vector2())
  const target = useRef(new THREE.Vector2())
  const last = useRef(-10)
  const gl = useThree((s) => s.gl)

  useEffect(() => {
    ;[map, dmap].forEach((t) => {
      t.colorSpace = THREE.NoColorSpace
      t.anisotropy = 8
      t.generateMipmaps = false
      t.minFilter = THREE.LinearFilter
      t.needsUpdate = true
    })
    const el = gl.domElement
    const move = (e) => {
      const r = el.getBoundingClientRect()
      target.current.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1))
      last.current = performance.now() / 1000
    }
    const leave = () => (last.current = performance.now() / 1000 - 1.2)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [map, dmap, gl])

  const aspect = map.image.width / map.image.height
  const w = Math.min(viewport.width * 0.98, viewport.height * 0.98 * aspect)
  const h = w / aspect
  const uniforms = useMemo(() => ({ map: { value: map }, dmap: { value: dmap }, m: { value: m.current }, k: { value: strength } }), [map, dmap, strength])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const idle = t - last.current > 2.2
    if (idle) target.current.set(Math.sin(t * 0.55) * 0.95, Math.sin(t * 0.37) * 0.35)
    m.current.lerp(target.current, 0.05)
    group.current.rotation.y = m.current.x * 0.2
    group.current.rotation.x = -m.current.y * 0.07
    group.current.position.y = Math.sin(t * 0.9) * 0.04
  })

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} transparent depthWrite={false} />
      </mesh>
    </group>
  )
}

export function DepthCanvas({ src, strength = 0.085 }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7], fov: 32 }} gl={{ antialias: true, alpha: true }} style={{ touchAction: 'pan-y' }}>
      <Layer src={src} strength={strength} />
    </Canvas>
  )
}
