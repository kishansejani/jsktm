import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container">
        <span className="nf-code">404</span>
        <h1>This thread snapped.</h1>
        <p>The page you’re looking for doesn’t exist or has moved.</p>
        <Link to="/" className="btn btn-accent">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    </section>
  )
}
