import { useEffect, useState } from 'react'
import { FORM_URL } from '../../config'
import './LeadModal.css'

function LeadModal({ isOpen, onClose }) {
  const [scale, setScale] = useState(1)

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

  if (!isOpen) return null

  const isStacked = scale === STACKED
  const panelStyle = isStacked ? undefined : { height: `${FORM_HEIGHT * scale}px` }
  const frameStyle = isStacked ? undefined : { width: `${100 / scale}%`, height: `${FORM_HEIGHT}px`, transform: `scale(${scale})` }

  return (
    <div className="rpm-modal" role="dialog" aria-modal="true" aria-label="Apply for funding" onClick={onClose}>
      <div className="rpm-modal-panel" style={panelStyle} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="rpm-modal-close" aria-label="Close" onClick={onClose}>×</button>

        <div className="rpm-modal-form">
          <iframe className="rpm-modal-frame" style={frameStyle} src={FORM_URL} title="RPM Funding application form" />
        </div>

        <aside className="rpm-modal-side">
          <span className="rpm-modal-glow" />
          <div className="rpm-modal-message">
            <span className="rpm-modal-badge">Free application · About 2 minutes</span>
            <h2 className="rpm-modal-title">Get your funding decision in <em>2 minutes</em></h2>
            <ul className="rpm-modal-perks">
              {PERKS.map((item) => <li key={item} className="rpm-modal-perk">{item}</li>)}
            </ul>
          </div>

          <div className="rpm-modal-proof">
            <img className="rpm-modal-photo" src="/hero-owner.jpg" alt="" />
            <div className="rpm-modal-proof-copy">
              <span className="rpm-modal-eyebrow">Working capital up to</span>
              <strong className="rpm-modal-amount">$5M</strong>
            </div>
          </div>
          <p className="rpm-modal-fact">Trusted by 5,000+ businesses · $500MM+ funded</p>
        </aside>
      </div>
    </div>
  )
}

// Reason: natural rendered height of the SellAgent form page (9 fields, consent, submit), measured from the live form
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
