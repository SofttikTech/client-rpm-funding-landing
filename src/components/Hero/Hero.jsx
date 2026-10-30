import { PHONE_DISPLAY, PHONE_HREF } from '../../config'
import './Hero.css'

function Hero() {
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
            <h1 className="rpm-hero-title">Fast working capital, <em>repaid from your daily sales</em></h1>
            <p className="rpm-hero-sub">$5K to $5M for restaurants, salons, med spas and contractors. No collateral, no hard credit pull, all credit welcome.</p>
            <div className="rpm-hero-actions">
              <a className="rpm-btn" href="#rpm-apply">See if I qualify <i className="rpm-hero-arrow">→</i></a>
              <span className="rpm-hero-note">Takes about 2 minutes</span>
            </div>
            <p className="rpm-hero-proof">
              {PROOF.map((item) => <span key={item} className="rpm-hero-proof-item">{item}</span>)}
            </p>
          </div>

          <div className="rpm-hero-visual">
            <div className="rpm-hero-frame">
              <img className="rpm-hero-photo" src="/hero-owner.jpg" alt="Smiling small business owner checking sales on his phone" />
            </div>
            <div className="rpm-hero-chip-float">
              <strong className="rpm-hero-chip-float-value">$500MM+</strong>
              <span className="rpm-hero-chip-float-label">funded to date</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PROOF = ['$500MM+ funded', '5,000+ businesses', 'Miami, FL since 2019']

export default Hero
