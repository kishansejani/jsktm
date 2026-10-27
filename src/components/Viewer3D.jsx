import { Component, lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'

const MachineCanvas = lazy(() => import('./Scene3D.jsx').then((m) => ({ default: m.MachineCanvas })))
const HeroCanvas = lazy(() => import('./Scene3D.jsx').then((m) => ({ default: m.HeroCanvas })))
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

/** Mounts the WebGL canvas only while it is near the viewport (saves GPU + battery). */
function Wrap({ children, fallback }) {
  const ok = useMemo(hasWebGL, [])
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ok || !ref.current) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '150px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ok])
  if (!ok) return fallback
  return (
    <div className="v3d-wrap" ref={ref}>
      {visible && (
        <Boundary fallback={fallback}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Boundary>
      )}
    </div>
  )
}

const Fallback = ({ children }) => <div className="v3d-fallback">{children || '3D view is not supported on this device.'}</div>

export function Viewer3D({ fallback, ...props }) {
  return (
    <Wrap fallback={<Fallback>{fallback}</Fallback>}>
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
