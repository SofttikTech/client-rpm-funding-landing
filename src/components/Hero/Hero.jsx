import { useEffect, useRef, useState } from 'react'
import { ShieldCheck, Phone } from 'lucide-react'
import CtaButton from '../CtaButton/CtaButton'
import { PHONE_DISPLAY, PHONE_HREF } from '../../config'
import './Hero.css'

function Hero({ onApply }) {
  const [slide, setSlide] = useState({ index: 0, prev: 0 })
  const { index, prev } = slide
  const curveRef = useRef(null)
  const frameRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    // Reason: respect users who ask for reduced motion, keep the first photo static
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setInterval(() => setSlide((cur) => ({ index: (cur.index + 1) % PHOTOS.length, prev: cur.index })), ROTATE_MS)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const curve = curveRef.current
    const frameEl = frameRef.current
    const glowEl = glowRef.current
    if (!curve) return undefined
    const curveHeight = () => curve.getBoundingClientRect().height || 110
    const setCurve = (progress) => { curve.style.transform = `translate3d(0, ${(1 - progress) * curveHeight()}px, 0)` }
    // Reason: reduced-motion visitors get a fixed gentle curve instead of the scroll animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurve(0.5)
      return undefined
    }
    // Reason: only transforms change (GPU composited, no repaint) and values glide toward the scroll target, so wheel steps never look jerky
    let progress = 0
    let offset = 0
    let targetProgress = 0
    let targetOffset = 0
    let raf = 0
    const read = () => {
      targetOffset = Math.min(window.scrollY, 700)
      const p = Math.min(window.scrollY / (window.innerHeight * 0.45), 1)
      targetProgress = p * p * (3 - 2 * p)
    }
    const tick = () => {
      progress += (targetProgress - progress) * 0.12
      offset += (targetOffset - offset) * 0.12
      if (Math.abs(targetProgress - progress) < 0.001) progress = targetProgress
      if (Math.abs(targetOffset - offset) < 0.1) offset = targetOffset
      setCurve(progress)
      if (frameEl) frameEl.style.transform = `translate3d(0, ${offset * -0.08}px, 0)`
      if (glowEl) glowEl.style.transform = `translate3d(0, ${offset * 0.18}px, 0)`
      raf = progress === targetProgress && offset === targetOffset ? 0 : requestAnimationFrame(tick)
    }
    const onScroll = () => {
      read()
      if (!raf) raf = requestAnimationFrame(tick)
    }
    read()
    progress = targetProgress
    offset = targetOffset
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
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
            <h1 className="rpm-hero-title">Get funded fast. <em>Repay as you sell.</em></h1>
            <div className="rpm-hero-actions">
              <CtaButton onClick={onApply}>See if I qualify</CtaButton>
              <span className="rpm-hero-note">Takes about 30 seconds</span>
            </div>
            <div className="rpm-hero-trust">
              <div className="rpm-hero-trust-top">
                <span className="rpm-hero-trust-mark"><ShieldCheck size={28} strokeWidth={1.7} aria-hidden="true" /></span>
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
            <div className="rpm-hero-carousel" ref={frameRef}>
              {PHOTOS.map(({ src, alt, position }, i) => {
                const pos = (i - index + PHOTOS.length) % PHOTOS.length
                const prevPos = (i - prev + PHOTOS.length) % PHOTOS.length
                // Reason: the card that jumps from the left slot to the right slot fades through instead of sliding behind the front card
                const isWrapping = pos === 1 && prevPos === 2
                return (
                <div key={src} className="rpm-hero-card" data-pos={pos} data-wrap={isWrapping ? 'true' : undefined}>
                  <img className="rpm-hero-photo" src={src} alt={alt} style={{ objectPosition: position }} />
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <svg className="rpm-hero-chart" viewBox="0 0 960 320" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="rpm-chart-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9b872" stopOpacity="0.6" />
            <stop offset="1" stopColor="#d9b872" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rpm-chart-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#d9b872" stopOpacity="0" />
            <stop offset="0.4" stopColor="#d9b872" />
            <stop offset="1" stopColor="#6ee7b7" />
          </linearGradient>
          <linearGradient id="rpm-chart-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6ee7b7" stopOpacity="0.28" />
            <stop offset="1" stopColor="#6ee7b7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[80, 160, 240].map((y) => <line key={y} className="rpm-hero-chart-grid" x1="0" x2="960" y1={y} y2={y} />)}
        {CHART_BARS.map((h, i) => (
          <g key={i} className="rpm-hero-chart-bar" style={{ animationDelay: `${0.15 + i * 0.09}s` }}>
            <rect x={44 + i * 76} y={310 - h} width="30" height={h} rx="5" fill="url(#rpm-chart-bar)" />
            <rect className="rpm-hero-chart-cap" x={44 + i * 76} y={310 - h} width="30" height="2.5" rx="1.25" />
          </g>
        ))}
        <path className="rpm-hero-chart-ghost" d={CHART_GHOST} fill="none" strokeWidth="1.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path className="rpm-hero-chart-area" d={`${CHART_LINE} L945 320 L20 320 Z`} fill="url(#rpm-chart-area)" />
        <path className="rpm-hero-chart-line" d={CHART_LINE} pathLength="1" fill="none" stroke="url(#rpm-chart-line)" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      <a className="rpm-hero-scroll" href="#rpm-apply" aria-label="Scroll to the application"><span className="rpm-hero-scroll-text">Scroll</span><span className="rpm-hero-scroll-line" /></a>

      <svg className="rpm-hero-curve" ref={curveRef} viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 Q720,200 1440,0 L1440,110 L0,110 Z" />
      </svg>
    </section>
  )
}

const CHART_BARS = [44, 68, 60, 98, 90, 136, 126, 170, 158, 214, 198, 262]
const CHART_GHOST = 'M20 300 C170 292 230 270 330 258 S470 246 560 214 S720 178 810 140 S910 96 945 78'
const CHART_LINE = 'M20 285 C150 272 190 242 290 226 S430 214 520 168 S690 128 780 78 S900 28 945 12'
const ROTATE_MS = 4500
const STATS = [
  { value: '$500MM+', label: 'funded to date' },
  { value: '5,000+', label: 'businesses served' },
  { value: '24hrs', label: 'average funding time' }
]
// Reason: one icon per industry RPM serves, in place of customer faces we do not have permission to show
const PHOTOS = [
  { src: '/hero-owner.jpg', alt: 'Smiling restaurant owner checking sales on his phone', tag: 'Restaurants', position: '40% 50%' },
  { src: '/hero-salon.jpg', alt: 'Smiling salon owner standing in her salon', tag: 'Salons and parlors', position: '45% 50%' },
  { src: '/hero-medspa.jpg', alt: 'Smiling clinic owner in a bright studio', tag: 'Med spas', position: '50% 25%' }
]

export default Hero
