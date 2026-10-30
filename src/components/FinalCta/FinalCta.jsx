import { ArrowRight, ExternalLink, Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_HREF, WEBSITE_URL, DISCLAIMER_URL } from '../../config'
import Reveal from '../Reveal/Reveal'
import './FinalCta.css'

function FinalCta({ onApply }) {
  return (
    <section className="rpm-final" id="rpm-cta">
      <div className="rpm-container">
        <Reveal className="rpm-final-cta">
          <h2 className="rpm-final-cta-title">Keep your doors open and your <em>business growing</em></h2>
          <p className="rpm-final-cta-sub">Apply in 30 seconds. No obligation, no hard credit pull.</p>
          <div className="rpm-final-cta-actions">
            <button type="button" className="rpm-btn rpm-btn-pulse rpm-final-cta-main" onClick={onApply}>Get funded today <ArrowRight size={20} aria-hidden="true" /></button>
            <a className="rpm-btn rpm-btn-ghost" href={WEBSITE_URL} target="_blank" rel="noreferrer">Visit our website <ExternalLink size={17} aria-hidden="true" /></a>
          </div>
          <a className="rpm-final-cta-call" href={PHONE_HREF}><Phone size={16} aria-hidden="true" /> Prefer to talk? Call <b>{PHONE_DISPLAY}</b></a>
        </Reveal>

        <footer className="rpm-final-footer">
          <p className="rpm-final-footer-text">RPM Funding Group is not a bank and may act as a broker connecting businesses with third-party financing providers. Applying does not guarantee approval, amount, pricing or timing. For business purposes only. © 2019 RPM Funding Group. <a className="rpm-final-footer-link" href={DISCLAIMER_URL} target="_blank" rel="noreferrer">Full disclaimer</a></p>
        </footer>
      </div>
    </section>
  )
}

export default FinalCta
