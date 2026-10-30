import { useEffect, useState } from 'react'
import { FORM_URL, PRELOAD_DELAY_MS } from '../../config'
import './LeadModal.css'

function LeadModal({ isOpen, onClose }) {
  const [scale, setScale] = useState(1)
  const [isArmed, setIsArmed] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Reason: load the form in the background shortly after the page loads, so it is already ready when the popup opens
    const timer = setTimeout(() => setIsArmed(true), PRELOAD_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const handleLoad = () => {
    // Reason: the iframe load event fires before the form app has fetched its fields, so the loader stays a little longer
    setTimeout(() => setIsReady(true), LOADER_EXTRA_MS)
  }

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    const onResize = () => setScale(getFitScale())
    onResize()
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    // Reason: lock page scroll behind the popup so the whole form is visible without scrolling
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen && !isArmed) return null

  const isStacked = scale === STACKED
  const panelStyle = isStacked ? undefined : { height: `${FORM_HEIGHT * scale}px` }
  const frameStyle = isStacked ? undefined : { width: `${100 / scale}%`, height: `${FORM_HEIGHT}px`, transform: `scale(${scale})` }

  return (
    <div className={`rpm-modal${isOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Apply for funding" aria-hidden={!isOpen} onClick={onClose}>
      <div className="rpm-modal-panel" style={panelStyle} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="rpm-modal-close" aria-label="Close" onClick={onClose}>×</button>

        <div className="rpm-modal-form">
          <iframe className="rpm-modal-frame" style={frameStyle} src={FORM_URL} title="RPM Funding application form" onLoad={handleLoad} />
          <div className={`rpm-modal-loader${isReady ? ' is-done' : ''}`} aria-hidden={isReady}>
            <svg className="rpm-modal-loader-chart" viewBox="0 0 120 70" aria-hidden="true">
              {[14, 24, 20, 34, 30, 46, 58].map((h, i) => <rect key={i} className="rpm-modal-loader-bar" style={{ animationDelay: `${i * 0.12}s` }} x={6 + i * 16} y={64 - h} width="10" height={h} rx="2" />)}
              <path className="rpm-modal-loader-line" d="M8 54 C30 50 38 40 56 36 S88 22 112 8" pathLength="1" fill="none" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <p className="rpm-modal-loader-text">Preparing your application</p>
          </div>
        </div>

        <aside className="rpm-modal-side">
          <span className="rpm-modal-glow" />
          <h2 className="rpm-modal-title">Apply in <em>30 seconds</em></h2>
          <ul className="rpm-modal-perks">
            {PERKS.map((item) => <li key={item} className="rpm-modal-perk">{item}</li>)}
          </ul>
          <div className="rpm-modal-proof">
            <img className="rpm-modal-photo" src="/hero-owner.jpg" alt="" />
            <div className="rpm-modal-proof-copy">
              <p className="rpm-modal-amount">Up to <b>$5M</b> in working capital</p>
              <p className="rpm-modal-fact">5,000+ businesses · $500MM+ funded</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

// Reason: natural rendered height of the SellAgent form page (9 fields, consent, submit), measured from the live form
const LOADER_EXTRA_MS = 900
const FORM_HEIGHT = 762
const STACKED = 'stacked'
const PERKS = ['Funds in as little as 24 hours', 'No hard credit pull, no collateral', 'All credit types welcome']

/**
 * Scale that makes the whole form fit the viewport so it never needs scrolling.
 * @returns {number|string} Scale between 0.6 and 1, or STACKED on narrow screens where the form may scroll.
 */
function getFitScale() {
  if (window.innerWidth <= 860) return STACKED
  return Math.max(0.6, Math.min(1, (window.innerHeight - 32) / FORM_HEIGHT))
}

export default LeadModal
