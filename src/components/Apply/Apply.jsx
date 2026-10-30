import { FORM_URL } from '../../config'
import './Apply.css'

function Apply() {
  return (
    <section className="rpm-apply" id="rpm-apply">
      <div className="rpm-container">
        <div className="rpm-apply-grid">
          <div className="rpm-apply-info">
            <span className="rpm-apply-eyebrow">Apply in 2 minutes</span>
            <h2 className="rpm-apply-title">Tell us about your business. Get a decision fast.</h2>
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
            <ul className="rpm-apply-assure">
              {ASSURANCES.map((item) => <li key={item} className="rpm-apply-assure-item">{item}</li>)}
            </ul>
          </div>

          <div className="rpm-apply-form">
            <iframe className="rpm-apply-frame" src={FORM_URL} title="RPM Funding application form" />
            <p className="rpm-apply-fallback">Form not loading? <a className="rpm-apply-fallback-link" href={FORM_URL} target="_blank" rel="noreferrer">Open it in a new tab</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  { title: 'Apply online', text: 'Complete the short form. No paperwork hassles.' },
  { title: 'Quick review', text: 'Our team reviews your application and bank statements within hours.' },
  { title: 'Get approved', text: 'Review your transparent funding terms.' },
  { title: 'Receive funds', text: 'Funds go to your business account, in as little as 24 hours.' }
]
const ASSURANCES = ['No hard credit pull required', 'No collateral needed', 'All credit types welcome']

export default Apply
