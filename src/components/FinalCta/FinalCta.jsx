import { PHONE_DISPLAY, PHONE_HREF, WEBSITE_URL } from '../../config'
import Reveal from '../Reveal/Reveal'
import './FinalCta.css'

function FinalCta({ onApply }) {
  return (
    <section className="rpm-final" id="rpm-cta">
      <div className="rpm-container">
        <Reveal className="rpm-final-cta">
          <span className="rpm-final-cta-glow" />
          <h2 className="rpm-final-cta-title">Keep your doors open and your <em>business growing</em></h2>
          <p className="rpm-final-cta-sub">Apply in 30 seconds. No obligation, no hard credit pull.</p>
          <ul className="rpm-final-cta-perks">
            {PERKS.map((item) => <li key={item} className="rpm-final-cta-perk">{item}</li>)}
          </ul>
          <div className="rpm-final-cta-actions">
            <button type="button" className="rpm-btn rpm-btn-pulse" onClick={onApply}>Get funded today →</button>
            <a className="rpm-btn rpm-btn-ghost" href={WEBSITE_URL} target="_blank" rel="noreferrer">Visit our website ↗</a>
          </div>
          <p className="rpm-final-cta-call">Prefer to talk? Call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
        </Reveal>

        <footer className="rpm-final-footer">
          <p className="rpm-final-footer-text">RPM Funding Group is a commercial financing company that may act as a broker, referral source, or intermediary connecting businesses with third-party financing providers. It is not a bank or depository financial institution. Applying does not guarantee approval, a particular funding amount, pricing, or same-day or next-day funding. Products are for business purposes only. Merchant cash advances involve the purchase of future business receivables and are not loans.</p>
          <p className="rpm-final-footer-copy">© 2019 RPM Funding Group. All rights reserved.</p>
        </footer>
      </div>
    </section>
  )
}

const PERKS = ['Funds in as little as 24 hours', 'No collateral', 'All credit types welcome']
export default FinalCta
