import { FileText, Clock, Banknote, ArrowRight } from 'lucide-react'
import { FORM_URL } from '../../config'
import Reveal from '../Reveal/Reveal'
import useFitScale from '../../hooks/useFitScale'
import './Apply.css'

function Apply() {
  const scale = useFitScale(FORM_BOX_HEIGHT, 110)
  const isScaled = scale < 1
  const colStyle = isScaled ? { maxWidth: `${COL_WIDTH * scale}px` } : undefined
  const innerStyle = isScaled ? { height: `${(FORM_BOX_HEIGHT - 2) * scale}px` } : undefined
  const frameStyle = isScaled ? { top: `${-CROP_Y * scale}px`, left: `${-CROP_X * scale}px`, width: `${FRAME_WIDTH}px`, height: `${FRAME_HEIGHT}px`, transform: `scale(${scale})`, transformOrigin: '0 0' } : undefined

  return (
    <section className="rpm-apply" id="rpm-apply">
      <div className="rpm-container">
        <div className="rpm-apply-grid">
          <Reveal className="rpm-apply-info">
            <h2 className="rpm-apply-title">Your funding decision in <em>3 simple steps</em></h2>
            <ol className="rpm-apply-steps">
              {STEPS.map(({ Icon, title, text }, index) => (
                <li key={title} className="rpm-apply-step">
                  <span className="rpm-apply-step-num">{index + 1}</span>
                  <span className="rpm-apply-step-icon"><Icon size={30} strokeWidth={1.6} aria-hidden="true" /></span>
                  <div className="rpm-apply-step-body">
                    <h3 className="rpm-apply-step-title">{title}</h3>
                    <p className="rpm-apply-step-text">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a className="rpm-apply-arrow" href="#rpm-apply-form">Start with the form <ArrowRight className="rpm-apply-arrow-icon" size={18} strokeWidth={2} aria-hidden="true" /></a>
          </Reveal>

          <Reveal className="rpm-apply-form-col" delay={150}>
            <div style={colStyle}>
            <div className="rpm-apply-form" id="rpm-apply-form">
              <div className="rpm-apply-form-inner" style={innerStyle}>
                <iframe className="rpm-apply-frame" style={frameStyle} src={FORM_URL} title="RPM Funding application form" />
              </div>
            </div>
            <p className="rpm-apply-fallback">Form not loading? <a className="rpm-apply-fallback-link" href={FORM_URL} target="_blank" rel="noreferrer">Open it in a new tab</a></p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Reason: sizes of the form frame at scale 1, kept in sync with Apply.css
const FORM_BOX_HEIGHT = 696
const FRAME_HEIGHT = 770
const COL_WIDTH = 658
const FRAME_WIDTH = 768
const CROP_X = 56
const CROP_Y = 34
const STEPS = [
  { Icon: FileText, title: 'Fill the short form', text: 'About 30 seconds. No paperwork.' },
  { Icon: Clock, title: 'We review within hours', text: 'Your advisor checks your application and bank statements.' },
  { Icon: Banknote, title: 'Get funded', text: 'Funds reach your account in as little as 24 hours.' }
]

export default Apply
