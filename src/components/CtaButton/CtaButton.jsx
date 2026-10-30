import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import './CtaButton.css'

function CtaButton({ children, onClick, className = '' }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    // Reason: touch and pen input have no hover, so the spotlight and magnetic pull are mouse only
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.setProperty('--tx', `${(x - rect.width / 2) * 0.12}px`)
    el.style.setProperty('--ty', `${(y - rect.height / 2) * 0.22}px`)
  }

  const handleLeave = () => {
    const el = ref.current
    el.style.setProperty('--tx', '0px')
    el.style.setProperty('--ty', '0px')
  }

  return (
    <button ref={ref} type="button" className={`rpm-cta-btn ${className}`} onClick={onClick} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <span className="rpm-cta-btn-gloss" aria-hidden="true" />
      <span className="rpm-cta-btn-label">{children}</span>
      <span className="rpm-cta-btn-arrow" aria-hidden="true">
        <ArrowRight className="rpm-cta-btn-arrow-out" size={20} strokeWidth={2} />
        <ArrowRight className="rpm-cta-btn-arrow-in" size={20} strokeWidth={2} />
      </span>
    </button>
  )
}

export default CtaButton
