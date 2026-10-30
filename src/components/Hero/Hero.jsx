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
            <div className="rpm-hero-actions">
              <button type="button" className="rpm-btn rpm-btn-pulse" onClick={onApply}>See if I qualify <i className="rpm-hero-arrow">→</i></button>
              <span className="rpm-hero-note">Takes about 2 minutes</span>
            </div>
            <div className="rpm-hero-trust">
              <div className="rpm-hero-trust-top">
                <div className="rpm-hero-trust-icons">
                  {TRUST_ICONS.map(({ label, path }) => (
                    <span key={label} className="rpm-hero-trust-icon" title={label}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>
                    </span>
                  ))}
                </div>
                <div className="rpm-hero-trust-text">
                  <strong className="rpm-hero-trust-headline">Trusted by <b>5,000+</b> business owners</strong>
                  <span className="rpm-hero-trust-sub">Miami, FL · Since 2019</span>
                </div>
              </div>
              <div className="rpm-hero-trust-stats">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="rpm-hero-trust-stat">
                    <strong className="rpm-hero-trust-value">{value}</strong>
                    <span className="rpm-hero-trust-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </section>
  )
}

const ROTATE_MS = 4500
const STATS = [
  { value: '$500MM+', label: 'funded to date' },
  { value: '5,000+', label: 'businesses served' },
  { value: '24hrs', label: 'average funding time' }
]
// Reason: one icon per industry RPM serves, in place of customer faces we do not have permission to show
const TRUST_ICONS = [
  { label: 'Restaurants', path: 'M7 3v7M4.5 3v4a2.5 2.5 0 0 0 5 0V3M7 10v11M17 3c-2.2 1.8-3 4.2-3 7 0 1.8 1 3 3 3v8' },
  { label: 'Salons', path: 'M8 8L20 18M8 16L20 6M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
  { label: 'Med spas', path: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z' },
  { label: 'Contractors', path: 'M4 16a8 8 0 0 1 16 0M2 16h20M10 8V5h4v3M12 8v8' },
  { label: 'Retail shops', path: 'M6 8h12l1 12H5zM9 8a3 3 0 0 1 6 0' }
]
const PHOTOS = [
  { src: '/hero-owner.jpg', alt: 'Smiling restaurant owner checking sales on his phone', tag: 'Restaurants', position: '40% 50%' },
  { src: '/hero-salon.jpg', alt: 'Smiling salon owner standing in her salon', tag: 'Salons and parlors', position: '45% 50%' },
  { src: '/hero-medspa.jpg', alt: 'Smiling clinic owner in a bright studio', tag: 'Med spas', position: '50% 25%' }
]

export default Hero
