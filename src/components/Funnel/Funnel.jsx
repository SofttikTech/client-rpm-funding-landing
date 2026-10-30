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
          <h2 className="rpm-funnel-benefits-title">Built for businesses that get paid every day</h2>
          <p className="rpm-funnel-benefits-sub">Repayment is a small share of your daily sales, so it flexes with slow and busy weeks. No collateral, all credit types welcome.</p>
          <div className="rpm-funnel-benefit-grid">
            {INDUSTRIES.map(({ title, text }) => (
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

const INDUSTRIES = [
  { title: 'Restaurants and food service', text: 'Restock inventory, cover payroll, fix equipment or open a second location.' },
  { title: 'Salons, parlors and beauty', text: 'Upgrade chairs and products, hire stylists or expand your space.' },
  { title: 'Med spas and healthcare', text: 'Buy new equipment, grow your treatment menu and fund marketing.' },
  { title: 'Construction and contractors', text: 'Cover materials and crew costs while you wait on client payments.' }
]

export default Funnel
