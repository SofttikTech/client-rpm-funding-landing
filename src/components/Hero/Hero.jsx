import { useEffect, useState } from 'react'
import { PHONE_DISPLAY, PHONE_HREF } from '../../config'
import './Hero.css'

function Hero({ onApply }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Reason: respect users who ask for reduced motion, keep the first photo static
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % PHOTOS.length), ROTATE_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="rpm-hero">
      <span className="rpm-hero-glow rpm-hero-glow-a" />
      <span className="rpm-hero-glow rpm-hero-glow-b" />
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
            <p className="rpm-hero-sub">$5K to $5M. No collateral, no hard credit pull, all credit welcome.</p>
            <div className="rpm-hero-actions">
              <button type="button" className="rpm-btn rpm-btn-pulse" onClick={onApply}>See if I qualify <i className="rpm-hero-arrow">→</i></button>
              <span className="rpm-hero-note">Takes about 2 minutes</span>
            </div>
            <p className="rpm-hero-proof">
              {PROOF.map((item) => <span key={item} className="rpm-hero-proof-item">{item}</span>)}
            </p>
          </div>

          <div className="rpm-hero-visual">
            <div className="rpm-hero-frame">
              {PHOTOS.map(({ src, alt, position }, i) => (
                <img key={src} className={`rpm-hero-photo${i === index ? ' active' : ''}`} src={src} alt={alt} style={{ objectPosition: position }} />
              ))}
              <span className="rpm-hero-tag" key={index}>{PHOTOS[index]['tag']}</span>
              <div className="rpm-hero-dots">
                {PHOTOS.map(({ tag }, i) => (
                  <button key={tag} type="button" aria-label={`Show ${tag}`} className={`rpm-hero-dot${i === index ? ' active' : ''}`} onClick={() => setIndex(i)} />
                ))}
              </div>
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

const ROTATE_MS = 4500
const PROOF = ['$500MM+ funded', '5,000+ businesses', 'Miami, FL since 2019']
const PHOTOS = [
  { src: '/hero-owner.jpg', alt: 'Smiling restaurant owner checking sales on his phone', tag: 'Restaurants', position: '40% 50%' },
  { src: '/hero-salon.jpg', alt: 'Smiling salon owner standing in her salon', tag: 'Salons and parlors', position: '45% 50%' },
  { src: '/hero-medspa.jpg', alt: 'Smiling clinic owner in a bright studio', tag: 'Med spas', position: '50% 25%' }
]

export default Hero
