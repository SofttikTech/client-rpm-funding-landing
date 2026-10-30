import { useState } from 'react'
import { FORM_URL, PHONE_DISPLAY, PHONE_HREF } from '../../config'
import './FinalCta.css'

function FinalCta() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="rpm-final">
      <div className="rpm-container">
        <div className="rpm-final-banner">
          <h2 className="rpm-final-banner-title">Ready to grow? Your funding decision is minutes away.</h2>
          <p className="rpm-final-banner-sub">Apply in 2 minutes. No obligation, no hard credit pull.</p>
          <a className="rpm-btn" href={FORM_URL}>Get funded today →</a>
          <p className="rpm-final-banner-call">Prefer to talk? Call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
        </div>

        <div className="rpm-final-faq">
          <h2 className="rpm-final-faq-title">Quick answers</h2>
          {FAQS.map(({ question, answer }, index) => (
            <div key={question} className={`rpm-final-faq-item${openIndex === index ? ' open' : ''}`}>
              <button type="button" className="rpm-final-faq-question" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                {question}
                <i className="rpm-final-faq-icon">{openIndex === index ? '−' : '+'}</i>
              </button>
              {openIndex === index && <p className="rpm-final-faq-answer">{answer}</p>}
            </div>
          ))}
        </div>

        <footer className="rpm-final-footer">
          <p className="rpm-final-footer-text">RPM Funding Group is a commercial financing company that may act as a broker, referral source, or intermediary connecting businesses with third-party financing providers. It is not a bank or depository financial institution. Applying does not guarantee approval, a particular funding amount, pricing, or same-day or next-day funding. Products are for business purposes only. Merchant cash advances involve the purchase of future business receivables and are not loans.</p>
          <p className="rpm-final-footer-copy">© 2019 RPM Funding Group. All rights reserved.</p>
        </footer>
      </div>
    </section>
  )
}

const FAQS = [
  { question: 'What is a merchant cash advance?', answer: 'It is working capital based on your business revenue. Repayment is a fixed percentage of your daily sales, so payments move with your business.' },
  { question: 'How quickly can I receive funding?', answer: 'Many businesses are funded in as little as 24 hours after approval. Timing depends on your application and is not guaranteed.' },
  { question: 'What do I need to qualify?', answer: 'A business with consistent revenue and recent bank statements. We look at how your business performs, not just your credit.' },
  { question: 'Can I use the funds for anything?', answer: 'Yes. Most owners use funds for inventory, payroll, marketing, expansion or unexpected expenses.' }
]

export default FinalCta
