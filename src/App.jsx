import { useCallback, useState } from 'react'
import Hero from './components/Hero/Hero'
import Apply from './components/Apply/Apply'
import FinalCta from './components/FinalCta/FinalCta'
import LeadModal from './components/LeadModal/LeadModal'

function App() {
  // Reason: #apply in the URL opens the popup directly, handy for email links
  const [isModalOpen, setIsModalOpen] = useState(() => window.location.hash === '#apply')
  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <main className="rpm-page">
      <Hero onApply={openModal} />
      <Apply />
      <FinalCta onApply={openModal} />
      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}

export default App
