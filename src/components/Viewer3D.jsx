import { Children, cloneElement, Component, lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'

const MachineCanvas = lazy(() => import('./Scene3D.jsx').then((m) => ({ default: m.MachineCanvas })))
const HeroCanvas = lazy(() => import('./Scene3D.jsx').then((m) => ({ default: m.HeroCanvas })))
const DepthCanvas = lazy(() => import('./DepthScene.jsx').then((m) => ({ default: m.DepthCanvas })))
const AnatomyCanvas = lazy(() => import('./Scene3D.jsx').then((m) => ({ default: m.AnatomyCanvas })))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function Loading() {
  return (
    <div className="v3d-loading" aria-hidden="true">
      <span className="spinner" />
      <small>Loading 3D…</small>
    </div>
  )
}

/** Mounts the WebGL canvas only while it is near the viewport. With `gate`, dragging only works after a click,
 *  so normal page scrolling (wheel / touch) is never hijacked by the 3D view. */
function Wrap({ children, fallback, gate = false, hint = true }) {
  const ok = useMemo(hasWebGL, [])
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [live, setLive] = useState(!gate)
  useEffect(() => {
    if (!ok || !ref.current) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '150px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ok])
  useEffect(() => {
    if (!gate || !live) return
    const off = (e) => ref.current && !ref.current.contains(e.target) && setLive(false)
    const leave = (e) => e.pointerType === 'mouse' && setLive(false)
    const el = ref.current
    document.addEventListener('pointerdown', off)
    el.addEventListener('pointerleave', leave)
    return () => {
      document.removeEventListener('pointerdown', off)
      el.removeEventListener('pointerleave', leave)
    }
  }, [gate, live])
  if (!ok) return fallback
  const kid = gate ? Children.map(children, (c) => cloneElement(c, { live })) : children
  return (
    <div className={`v3d-wrap ${gate && !live ? 'is-gated' : ''}`} ref={ref}>
      {visible && (
        <Boundary fallback={fallback}>
          <Suspense fallback={<Loading />}>{kid}</Suspense>
        </Boundary>
      )}
      {gate && !live && visible && (
        <button type="button" className="v3d-gate" onClick={() => setLive(true)} aria-label="Click to interact with the 3D model">
          {hint && <span>Click to rotate</span>}
        </button>
      )}
    </div>
  )
}

const Fallback = ({ children }) => <div className="v3d-fallback">{children || '3D view is not supported on this device.'}</div>

export function Viewer3D({ fallback, hint = true, ...props }) {
  return (
    <Wrap gate hint={hint} fallback={<Fallback>{fallback}</Fallback>}>
      <MachineCanvas {...props} />
    </Wrap>
  )
}

export function HeroViewer() {
  return (
    <Wrap fallback={<Fallback />}>
      <HeroCanvas />
    </Wrap>
  )
}

export function AnatomyViewer(props) {
  return (
    <Wrap fallback={<Fallback />}>
      <AnatomyCanvas {...props} />
    </Wrap>
  )
}

/** Real photo turned into a depth-parallax 3D view (cut-out + depth map). */
export function DepthViewer({ src, strength, fallback }) {
  return (
    <Wrap fallback={<Fallback>{fallback}</Fallback>}>
      <DepthCanvas src={src} strength={strength} />
    </Wrap>
  )
}
