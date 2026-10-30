import { useEffect } from 'react'
import { FORM_URL } from '../../config'
import './LeadModal.css'

function LeadModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    // Reason: lock page scroll behind the popup so only the form scrolls
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="rpm-modal" role="dialog" aria-modal="true" aria-label="Apply for funding" onClick={onClose}>
      <div className="rpm-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="rpm-modal-close" aria-label="Close" onClick={onClose}>×</button>

        <aside className="rpm-modal-visual">
          <span className="rpm-modal-glow" />
          <img className="rpm-modal-photo" src="/hero-owner.jpg" alt="" />
          <span className="rpm-modal-eyebrow">Working capital up to</span>
          <strong className="rpm-modal-amount">$5M</strong>
          <ul className="rpm-modal-proof">
            {PROOF.map((item) => <li key={item} className="rpm-modal-proof-item">{item}</li>)}
          </ul>
        </aside>

        <div className="rpm-modal-main">
          <div className="rpm-modal-head">
            <span className="rpm-modal-badge">Free application · About 2 minutes</span>
            <h2 className="rpm-modal-title">Your funding decision is <em>2 minutes away.</em></h2>
            <p className="rpm-modal-text">Tell us about your business. A funding advisor reviews it within hours.</p>
            <ul className="rpm-modal-perks">
              {PERKS.map((item) => <li key={item} className="rpm-modal-perk">{item}</li>)}
            </ul>
          </div>
          <iframe className="rpm-modal-frame" src={FORM_URL} title="RPM Funding application form" />
        </div>
      </div>
    </div>
  )
}

const PROOF = ['$500MM+ funded to date', '5,000+ businesses served', 'Miami, FL since 2019']
const PERKS = ['Funds in as little as 24 hours', 'No hard credit pull required', 'No collateral, all credit welcome']

export default LeadModal
