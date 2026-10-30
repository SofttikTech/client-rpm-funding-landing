import { useEffect, useRef, useState } from 'react'
import { UtensilsCrossed, Scissors, Sparkles, HardHat, ShoppingBag, Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_HREF } from '../../config'
import './Hero.css'

function Hero({ onApply }) {
  const [index, setIndex] = useState(0)
  const frameRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    // Reason: respect users who ask for reduced motion, keep the first photo static
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % PHOTOS.length), ROTATE_MS)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let frame = 0
    // Reason: light parallax, the photo drifts up slower and the glow faster than the page scroll
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 700)
        if (frameRef.current) frameRef.current.style.transform = `translateY(${y * -0.08}px)`
        if (glowRef.current) glowRef.current.style.transform = `translateY(${y * 0.18}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])

  return (
    <section className="rpm-hero">
      <span className="rpm-hero-glow-wrap" ref={glowRef}><span className="rpm-hero-glow rpm-hero-glow-a" /></span>
      <span className="rpm-hero-glow rpm-hero-glow-b" />
      <div className="rpm-container rpm-hero-inner">
        <header className="rpm-hero-top">
          <span className="rpm-hero-logo">RPM<b>Funding</b> Group</span>
          <a className="rpm-hero-phone" href={PHONE_HREF}>
            <Phone size={16} strokeWidth={1.9} aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
        </header>

        <div className="rpm-hero-grid">
          <div className="rpm-hero-copy">
            <span className="rpm-hero-badge"><span className="rpm-hero-badge-text" key={index}>{PHOTOS[index]['audience']}</span></span>
            <h1 className="rpm-hero-title">Get funded fast. <em>Repay as you sell.</em></h1>
            <div className="rpm-hero-actions">
              <button type="button" className="rpm-btn rpm-btn-pulse" onClick={onApply}>See if I qualify <i className="rpm-hero-arrow">→</i></button>
              <span className="rpm-hero-note">Takes about 30 seconds</span>
            </div>
            <div className="rpm-hero-trust">
              <div className="rpm-hero-trust-top">
                <div className="rpm-hero-trust-icons">
                  {TRUST_ICONS.map(({ label, Icon }) => (
                    <span key={label} className="rpm-hero-trust-icon" title={label}>
                      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
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
            <div className="rpm-hero-frame" ref={frameRef}>
              {PHOTOS.map(({ src, alt, position }, i) => (
                <img key={src} className={`rpm-hero-photo${i === index ? ' active' : ''}`} src={src} alt={alt} style={{ objectPosition: position }} />
              ))}
              <div className="rpm-hero-dots">
                {PHOTOS.map(({ tag }, i) => (
                  <button key={tag} type="button" aria-label={`Show ${tag}`} className={`rpm-hero-dot${i === index ? ' active' : ''}`} onClick={() => setIndex(i)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg className="rpm-hero-divider" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path className="rpm-hero-divider-back" d="M0,58 C260,112 520,18 800,52 C1060,84 1260,104 1440,38 L1440,120 L0,120 Z" />
        <path className="rpm-hero-divider-front" d="M0,92 C300,42 640,112 920,82 C1140,58 1300,62 1440,88 L1440,120 L0,120 Z" />
      </svg>
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
  { label: 'Restaurants', Icon: UtensilsCrossed },
  { label: 'Salons', Icon: Scissors },
  { label: 'Med spas', Icon: Sparkles },
  { label: 'Contractors', Icon: HardHat },
  { label: 'Retail shops', Icon: ShoppingBag }
]
const PHOTOS = [
  { src: '/hero-owner.jpg', alt: 'Smiling restaurant owner checking sales on his phone', tag: 'Restaurants', audience: 'Built for restaurant owners', position: '40% 50%' },
  { src: '/hero-salon.jpg', alt: 'Smiling salon owner standing in her salon', tag: 'Salons and parlors', audience: 'Built for salon and parlor owners', position: '45% 50%' },
  { src: '/hero-medspa.jpg', alt: 'Smiling clinic owner in a bright studio', tag: 'Med spas', audience: 'Built for med spa owners', position: '50% 25%' }
]

export default Hero
