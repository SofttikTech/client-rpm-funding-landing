import { useEffect, useRef, useState } from 'react'
import './Reveal.css'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(canSkipReveal)

  useEffect(() => {
    const node = ref.current
    if (!node || canSkipReveal()) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setIsVisible(true)
      observer.disconnect()
    }, { threshold: 0.15 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`rpm-reveal${isVisible ? ' is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/**
 * Whether content should show immediately.
 * Reason: without IntersectionObserver, or with reduced motion, the reveal animation is skipped.
 * @returns {boolean} True when the reveal should be skipped.
 */
function canSkipReveal() {
  return !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default Reveal
