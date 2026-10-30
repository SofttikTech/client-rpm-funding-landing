import { useState } from 'react'
import { FORM_URL, PHONE_DISPLAY, PHONE_HREF } from '../../config'
import './Hero.css'

function Hero() {
  const [amount, setAmount] = useState(AMOUNTS[1])
  const [industry, setIndustry] = useState(INDUSTRIES[0])
  const formLink = buildFormLink(amount, industry)

  return (
    <section className="rpm-hero">
      <div className="rpm-container rpm-hero-inner">
        <header className="rpm-hero-top">
          <span className="rpm-hero-logo">RPM<b>Funding</b> Group</span>
          <a className="rpm-hero-phone" href={PHONE_HREF}>
            <i className="rpm-hero-phone-dot" />
            {PHONE_DISPLAY}
          </a>
        </header>

        <div className="rpm-hero-grid">
          <div className="rpm-hero-copy">
            <span className="rpm-hero-badge">Funds in as little as 24 hours</span>
            <h1 className="rpm-hero-title">Working capital for businesses that <em>get paid every day</em></h1>
            <p className="rpm-hero-sub">$5K to $5M based on your revenue. Repaid from a share of your daily sales. No collateral.</p>
            <p className="rpm-hero-proof">
              {PROOF.map((item) => <span key={item} className="rpm-hero-proof-item">{item}</span>)}
            </p>
          </div>

          <div className="rpm-hero-card" id="rpm-start">
            <p className="rpm-hero-card-step">Step 1 of 2 · About 2 minutes</p>
            <h2 className="rpm-hero-card-title">See what your business can get</h2>
            <label className="rpm-hero-label" htmlFor="rpm-industry">Your business type</label>
            <select id="rpm-industry" className="rpm-hero-select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
              {INDUSTRIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <p className="rpm-hero-label">How much do you need?</p>
            <div className="rpm-hero-chips">
              {AMOUNTS.map((item) => (
                <button key={item} type="button" className={`rpm-hero-chip${item === amount ? ' active' : ''}`} onClick={() => setAmount(item)}>{item}</button>
              ))}
            </div>
            <a className="rpm-btn rpm-btn-full" href={formLink}>Check my options <i className="rpm-hero-arrow">→</i></a>
            <p className="rpm-hero-card-note">No hard credit pull required</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const AMOUNTS = ['$5K - $25K', '$25K - $100K', '$100K - $250K', '$250K+']
const INDUSTRIES = ['Restaurant / Food Service', 'Salon / Beauty / Parlor', 'Med Spa / Healthcare', 'Construction / Contracting', 'Retail', 'Other']
const PROOF = ['$500MM+ funded', '5,000+ businesses', 'Miami, FL since 2019']

/**
 * Appends the chosen amount and business type to the lead form link so the form can pre-fill them.
 * @param {string} amount Selected funding range label.
 * @param {string} industry Selected business type label.
 * @returns {string} Lead form URL with query params.
 */
function buildFormLink(amount, industry) {
  const joiner = FORM_URL.includes('?') ? '&' : '?'
  return `${FORM_URL}${joiner}amount=${encodeURIComponent(amount)}&industry=${encodeURIComponent(industry)}`
}

export default Hero
