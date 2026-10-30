import { useState } from 'react'
import { FORM_URL, PHONE_DISPLAY, PHONE_HREF } from '../../config'
import './Hero.css'

function Hero() {
  const [amount, setAmount] = useState(AMOUNTS[1])
  const [industry, setIndustry] = useState(INDUSTRIES[0])
  const formLink = buildFormLink(amount, industry)

  return (
    <section className="rpm-hero">
      <div className="rpm-container">
        <header className="rpm-hero-top">
          <span className="rpm-hero-logo">RPM<b>Funding</b> Group</span>
          <a className="rpm-hero-phone" href={PHONE_HREF}>
            <i className="rpm-hero-phone-dot" />
            {PHONE_DISPLAY}
          </a>
        </header>

        <div className="rpm-hero-grid">
          <div className="rpm-hero-copy">
            <span className="rpm-hero-badge">Trusted by 5,000+ businesses</span>
            <h1 className="rpm-hero-title">Fast cash for businesses that <em>get paid every day</em></h1>
            <p className="rpm-hero-sub">Get $5K to $5M for your restaurant, salon, med spa or construction business. Repaid from your daily sales. No collateral.</p>
            <figure className="rpm-hero-quote">
              <blockquote className="rpm-hero-quote-text">&ldquo;RPM Funding came through with $150,000 in two days.&rdquo;</blockquote>
              <figcaption className="rpm-hero-quote-by">Marcus Johnson, Restaurant Owner, Atlanta</figcaption>
            </figure>
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
            <ul className="rpm-hero-assure">
              {ASSURANCES.map((item) => <li key={item} className="rpm-hero-assure-item">{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="rpm-hero-trust">
          {TRUST.map(({ value, label }) => (
            <div key={label} className="rpm-hero-trust-item">
              <strong className="rpm-hero-trust-value">{value}</strong>
              <span className="rpm-hero-trust-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const AMOUNTS = ['$5K - $25K', '$25K - $100K', '$100K - $250K', '$250K+']
const INDUSTRIES = ['Restaurant / Food Service', 'Salon / Beauty / Parlor', 'Med Spa / Healthcare', 'Construction / Contracting', 'Retail', 'Other']
const ASSURANCES = ['No hard credit pull', 'Free, no obligation', 'Secure and confidential']
const TRUST = [
  { value: '$500MM+', label: 'Funded to date' },
  { value: '5,000+', label: 'Businesses served' },
  { value: '24hrs', label: 'Average funding time' },
  { value: 'Since 2019', label: 'Based in Miami, FL' }
]

/**
 * Appends the chosen amount to the lead form link so the form can pre-fill it.
 * @param {string} amount Selected funding range label.
 * @param {string} industry Selected business type label.
 * @returns {string} Lead form URL with query params.
 */
function buildFormLink(amount, industry) {
  const joiner = FORM_URL.includes('?') ? '&' : '?'
  return `${FORM_URL}${joiner}amount=${encodeURIComponent(amount)}&industry=${encodeURIComponent(industry)}`
}

export default Hero
