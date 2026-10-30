import { useState } from 'react'
import { FORM_URL, PHONE_DISPLAY, PHONE_HREF } from '../../config'
import './Hero.css'

function Hero() {
  const [amount, setAmount] = useState(AMOUNTS[1])
  const formLink = buildFormLink(amount)

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
            <h1 className="rpm-hero-title">Fast business funding when <em>you need it most</em></h1>
            <p className="rpm-hero-sub">Get $5,000 to $5,000,000 in working capital, with approval based on your business revenue. No collateral. No long paperwork.</p>
            <ul className="rpm-hero-points">
              {POINTS.map((point) => <li key={point} className="rpm-hero-point">{point}</li>)}
            </ul>
            <div className="rpm-hero-stats">
              {STATS.map(({ value, label }) => (
                <div key={label} className="rpm-hero-stat">
                  <strong className="rpm-hero-stat-value">{value}</strong>
                  <span className="rpm-hero-stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rpm-hero-card" id="rpm-start">
            <p className="rpm-hero-card-step">Step 1 of 2 · Takes about 2 minutes</p>
            <h2 className="rpm-hero-card-title">How much funding do you need?</h2>
            <div className="rpm-hero-chips">
              {AMOUNTS.map((item) => (
                <button key={item} type="button" className={`rpm-hero-chip${item === amount ? ' active' : ''}`} onClick={() => setAmount(item)}>{item}</button>
              ))}
            </div>
            <a className="rpm-btn rpm-btn-full" href={formLink}>Continue to my application <i className="rpm-hero-arrow">→</i></a>
            <p className="rpm-hero-card-note">No hard credit pull required. Free, no obligation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const AMOUNTS = ['$5K - $25K', '$25K - $100K', '$100K - $250K', '$250K+']
const POINTS = ['Simple 2-minute application', 'Funds in as little as 24 hours', 'All credit types welcome']
const STATS = [
  { value: '$500MM+', label: 'Funded to date' },
  { value: '5,000+', label: 'Businesses served' },
  { value: '24hrs', label: 'Average funding time' }
]

/**
 * Appends the chosen amount to the lead form link so the form can pre-fill it.
 * @param {string} amount Selected funding range label.
 * @returns {string} Lead form URL with query params.
 */
function buildFormLink(amount) {
  const joiner = FORM_URL.includes('?') ? '&' : '?'
  return `${FORM_URL}${joiner}amount=${encodeURIComponent(amount)}`
}

export default Hero
