# JSK Tex Mech — Website (React + Vite)

A redesigned website for **JSK Tex Mech Pvt. Ltd.**, a yarn winding machinery and spares manufacturer
(reference: https://www.jsktm.com/).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview
```

## Stack
React 18 · Vite · React Router 6 · Framer Motion · Three.js (@react-three/fiber + drei) · lucide-react

## Structure
```
src/
  data/site.js        ← ALL company info, products, contact details (edit content here)
  components/         ← Header, Footer, ThreadHero (animated SVG), ProductCard,
                        MachineFinder, QuoteModal, ui.jsx (shared bits)
  pages/              ← Home, About, Products, ProductDetail, Contact, NotFound
  index.css           ← design tokens, light/dark themes, responsive rules
```

## Features
- **Interactive 3D machines (Three.js)** — drag-to-rotate hero, a 3D showroom for all 5 machines (spin, zoom, change yarn colour, switch to real photos), a scroll-driven "anatomy of a winder" section, and a 3D/Photos toggle on every product page. Models are procedural (built in code) and illustrative; to use real CAD models, export `.glb` files and load them with drei's `useGLTF` in `src/components/Scene3D.jsx`.
- Theme built from the logo colours: navy `#1b3b7b` plus the yarn spectrum (teal, cyan, blue, purple, red, orange)
- FAQ accordion
- Animated hero (SVG yarn threads winding onto a cone), count-up stats, marquee, scroll reveals, page transitions, scroll-progress bar
- Products page with filter chips + search; a detail page per machine with gallery and feature list
- **Machine finder** — one question, recommends the right winder
- Quote modal + contact form (validated; opens a pre-filled email, with WhatsApp as an alternative)
- Mobile drawer menu, floating WhatsApp / back-to-top buttons
- Responsive for mobile, tablet and desktop; respects `prefers-reduced-motion`

## Images
The logo is `public/mobilelogo.png`. Product photos and certification badges are loaded directly from `https://www.jsktm.com/img/...`
(see `src/data/site.js`). Each has a designed fallback if it can’t load. To self-host, download the
files into `public/img/` and change the paths in `site.js`.

## Notes
- The reference site lists two addresses (Zak-GIDC, Gandhinagar and Kathwada GIDC, Ahmedabad); both are shown.
- “Pre-Application” and “Jumbo Package” winders are listed on the original site without specifications,
  so their pages say specifications are available on request.
- The contact form has no backend; it opens the visitor’s email client. Wire it to an API when ready.
