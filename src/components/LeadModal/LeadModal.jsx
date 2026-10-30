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

        <aside className="rpm-modal-pitch">
          <span className="rpm-modal-badge">Free application · About 2 minutes</span>
          <h2 className="rpm-modal-title">You are 2 minutes away from your funding decision</h2>
          <p className="rpm-modal-text">Tell us a little about your business. A funding advisor reviews your application within hours.</p>
          <ul className="rpm-modal-list">
            {PERKS.map((item) => <li key={item} className="rpm-modal-perk">{item}</li>)}
          </ul>
          <p className="rpm-modal-foot">Secure and confidential. Applying is free and there is no obligation.</p>
        </aside>

        <div className="rpm-modal-form">
          <iframe className="rpm-modal-frame" src={FORM_URL} title="RPM Funding application form" />
        </div>
      </div>
    </div>
  )
}

const PERKS = ['Funds in as little as 24 hours', 'No hard credit pull required', 'No collateral, all credit types welcome', 'A dedicated advisor guides you']

export default LeadModal
