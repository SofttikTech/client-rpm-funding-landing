import './Funnel.css'

function Funnel() {
  return (
    <section className="rpm-funnel">
      <div className="rpm-container">
        <div className="rpm-funnel-head">
          <span className="rpm-funnel-eyebrow">How it works</span>
          <h2 className="rpm-funnel-title">Get funded in 4 simple steps</h2>
          <p className="rpm-funnel-sub">Built for busy owners. No branch visits, no stacks of paperwork.</p>
        </div>

        <ol className="rpm-funnel-steps">
          {STEPS.map(({ title, text }, index) => (
            <li key={title} className="rpm-funnel-step">
              <span className="rpm-funnel-step-num">{index + 1}</span>
              <h3 className="rpm-funnel-step-title">{title}</h3>
              <p className="rpm-funnel-step-text">{text}</p>
            </li>
          ))}
        </ol>

        <div className="rpm-funnel-benefits">
          <h2 className="rpm-funnel-benefits-title">Built for business owners like you</h2>
          <div className="rpm-funnel-benefit-grid">
            {BENEFITS.map(({ title, text }) => (
              <div key={title} className="rpm-funnel-benefit">
                <h3 className="rpm-funnel-benefit-title">{title}</h3>
                <p className="rpm-funnel-benefit-text">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rpm-funnel-cta">
          <a className="rpm-btn" href="#rpm-start">See how much you qualify for →</a>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  { title: 'Apply online', text: 'Complete our simple 2-minute application. No paperwork hassles.' },
  { title: 'Quick review', text: 'Our team reviews your application and bank statements within hours.' },
  { title: 'Get approved', text: 'Receive your approval and review your transparent funding terms.' },
  { title: 'Receive funds', text: 'Funds go straight to your business account, in as little as 24 hours.' }
]

const BENEFITS = [
  { title: 'Fast approval', text: 'Decisions in as little as 1 hour with minimal documentation.' },
  { title: 'No collateral needed', text: 'Funding is based on your revenue, not your assets.' },
  { title: '$5K to $5M available', text: 'Right-sized capital for payroll, inventory, marketing or growth.' },
  { title: 'Flexible repayment', text: 'Payment schedules that follow your business cycle.' },
  { title: 'All credit welcome', text: 'We focus on how your business performs today.' },
  { title: 'A dedicated advisor', text: 'A real person guides you through every step.' }
]

export default Funnel
