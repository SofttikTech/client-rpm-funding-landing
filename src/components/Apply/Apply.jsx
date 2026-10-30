import { FORM_URL } from '../../config'
import './Apply.css'

function Apply() {
  return (
    <section className="rpm-apply" id="rpm-apply">
      <div className="rpm-container">
        <div className="rpm-apply-grid">
          <div className="rpm-apply-info">
            <span className="rpm-apply-eyebrow">How it works</span>
            <h2 className="rpm-apply-title">Your funding decision in 3 simple steps</h2>
            <ol className="rpm-apply-steps">
              {STEPS.map(({ title, text }, index) => (
                <li key={title} className="rpm-apply-step">
                  <span className="rpm-apply-step-num">{index + 1}</span>
                  <div className="rpm-apply-step-body">
                    <h3 className="rpm-apply-step-title">{title}</h3>
                    <p className="rpm-apply-step-text">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a className="rpm-apply-arrow" href="#rpm-apply-form">Start with the form <i className="rpm-apply-arrow-icon">→</i></a>
          </div>

          <div className="rpm-apply-form" id="rpm-apply-form">
            <span className="rpm-apply-form-tag">Free · Takes 2 minutes</span>
            <iframe className="rpm-apply-frame" src={FORM_URL} title="RPM Funding application form" />
            <p className="rpm-apply-fallback">Form not loading? <a className="rpm-apply-fallback-link" href={FORM_URL} target="_blank" rel="noreferrer">Open it in a new tab</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  { title: 'Fill the short form', text: 'About 2 minutes. No paperwork.' },
  { title: 'We review within hours', text: 'Your advisor checks your application and bank statements.' },
  { title: 'Get funded', text: 'Funds reach your account in as little as 24 hours.' }
]

export default Apply
