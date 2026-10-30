import { useCallback, useEffect, useState } from 'react'
import Hero from './components/Hero/Hero'
import Apply from './components/Apply/Apply'
import FinalCta from './components/FinalCta/FinalCta'
import LeadModal from './components/LeadModal/LeadModal'
import { AUTO_OPEN_DELAY_MS, AUTO_OPEN_COOLDOWN_MS, AUTO_OPEN_ON_MOBILE, AUTO_OPEN_STORAGE_KEY } from './config'

function App() {
  // Reason: #apply in the URL opens the popup directly, handy for email links
  const [isModalOpen, setIsModalOpen] = useState(() => window.location.hash === '#apply')
  const openModal = useCallback(() => {
    markShown()
    setIsModalOpen(true)
  }, [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  useEffect(() => {
    if (!canAutoOpen()) return undefined
    const timer = setTimeout(() => {
      // Reason: never interrupt someone who is already looking at the inline form
      if (isInlineFormInView()) return
      markShown()
      setIsModalOpen(true)
    }, AUTO_OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="rpm-page">
      <Hero onApply={openModal} />
      <Apply />
      <FinalCta onApply={openModal} />
      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}

/**
 * Whether the timed popup may open for this visitor.
 * Reason: it opens once per cooldown window (not on every reload), skips mobile, and ?popup=always bypasses the limits for testing.
 * @returns {boolean} True when the popup should be scheduled.
 */
function canAutoOpen() {
  const params = new URLSearchParams(window.location.search)
  if (params.get('popup') === 'always') return true
  if (params.get('popup') === 'off') return false
  if (window.location.hash === '#apply') return false
  if (!AUTO_OPEN_ON_MOBILE && window.innerWidth <= 960) return false
  try {
    const shownAt = Number(window.localStorage.getItem(AUTO_OPEN_STORAGE_KEY) || 0)
    return Date.now() - shownAt > AUTO_OPEN_COOLDOWN_MS
  } catch {
    return true
  }
}

/** Remembers that the popup has been shown or opened, so it stays quiet for the cooldown. */
function markShown() {
  try {
    window.localStorage.setItem(AUTO_OPEN_STORAGE_KEY, String(Date.now()))
  } catch {
    // Reason: storage can be blocked (private mode), the popup then simply may show again on reload
  }
}

/**
 * Whether the inline lead form is currently on screen.
 * @returns {boolean} True when at least a third of the form is visible.
 */
function isInlineFormInView() {
  const el = document.getElementById('rpm-apply-form')
  if (!el) return false
  const rect = el.getBoundingClientRect()
  const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
  return visible > rect.height / 3
}

export default App
