import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// Hide the logo splash once the page is ready (min. 900 ms so it never just flashes)
const boot = document.getElementById('boot')
if (boot) {
  const t0 = performance.now()
  const done = () => setTimeout(() => { boot.classList.add('hide'); setTimeout(() => boot.remove(), 700) }, Math.max(0, 900 - (performance.now() - t0)))
  if (document.readyState === 'complete') done()
  else window.addEventListener('load', done, { once: true })
  setTimeout(done, 4000)
}
