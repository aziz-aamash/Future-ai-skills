import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ_GROUPS = [
  {
    label: 'Batches & Enrollment',
    items: [
      { q: 'How do I enroll in a course?', a: <>Fill out the form on our <Link to="/contact">Contact page</Link>, call us, or visit the campus in Shujabad directly. We'll confirm your seat once a spot in the next batch is reserved.</> },
      { q: 'When does the next batch start?', a: 'New batches for YouTube Automation and Digital Marketing start July 15. Other courses run on a rolling basis — check the course page or ask us for the next available date.' },
      { q: 'Is there an age or education requirement?', a: 'No formal degree is required for any course. Most students are 16 and above with basic computer literacy and a willingness to practise hands-on every class.' },
    ],
  },
  {
    label: 'Fees & Schedule',
    items: [
      { q: 'How much do courses cost?', a: 'Fees vary by course and duration. Contact us with the course you\'re interested in and we\'ll share the exact fee structure and any active discounts.' },
      { q: 'Can I pay in installments?', a: 'Yes, installment plans are available for most courses. Ask our team when you enroll and we\'ll set up a schedule that works for you.' },
      { q: 'What are the class timings?', a: 'We run both morning and evening batches, Monday to Thursday, so students who work or study elsewhere can still attend.' },
    ],
  },
  {
    label: 'Courses & Outcomes',
    items: [
      { q: 'Are classes online or in-person?', a: '100% in-person, at our physical campus in Shujabad. We believe hands-on, instructor-reviewed practice is what actually builds a sellable skill.' },
      { q: 'Will I get a certificate?', a: 'Yes, every student receives a completion certificate — but our real focus is the portfolio and practical skill you leave with, since that\'s what clients actually pay for.' },
      { q: 'Do you help with finding clients or jobs after the course?', a: 'Yes. Our Freelancing Mastery module and instructor mentorship cover profile setup, proposals and client outreach so you can start earning right after finishing.' },
      { q: 'What if I miss a class?', a: 'Let your instructor know in advance where possible. We provide session notes and, depending on the batch, catch-up support so you don\'t fall behind.' },
    ],
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <h4>{q}</h4>
        <span className="faq-plus">+</span>
      </button>
      <div className="faq-a">{a}</div>
    </div>
  );
}

export default function Faq() {
  return (
    <div>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow">Frequently Asked Questions</div>
          <h1 style={{ maxWidth: '18ch' }}>Still deciding? Here's what most students ask first.</h1>
          <p className="hero-lead">
            Can't find your answer here? <Link to="/contact" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Contact us directly</Link> and we'll help you out.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            {FAQ_GROUPS.map(group => (
              <div key={group.label}>
                <div className="faq-cat-label">{group.label}</div>
                {group.items.map(item => <FaqItem key={item.q} {...item} />)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Didn't find your answer?</h2>
          <p>Our team is happy to walk you through fees, schedules and which course fits you best.</p>
          <Link to="/contact" className="btn btn-accent">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
