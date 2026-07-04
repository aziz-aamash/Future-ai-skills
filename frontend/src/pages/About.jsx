import useScrollReveal from '../hooks/useScrollReveal.js';

const TEAM = [
  { name: 'Sara Khalid', role: 'Lead — Graphic Designing', bio: '7 years in branding, currently designing for clients across the UK and UAE.', socials: [['LinkedIn', 'in'], ['Instagram', 'ig']] },
  { name: 'Ahmad Fraz', role: 'Lead — YouTube Automation', bio: 'Runs 4 profitable faceless YouTube channels, teaches the exact system he uses.', socials: [['LinkedIn', 'in'], ['YouTube', 'yt']] },
  { name: 'Mahnoor Ali', role: 'Lead — Digital Marketing', bio: 'Google & Meta certified, manages ad accounts for local and international brands.', socials: [['LinkedIn', 'in'], ['Twitter', 'x']] },
  { name: 'Zain Malik', role: 'Lead — Freelancing & E-commerce', bio: 'Top Rated on Upwork and a Fiverr Level 2 seller with 500+ completed orders.', socials: [['LinkedIn', 'in'], ['Upwork', 'up']] },
];

const STORIES = [
  { badge: 'First Fiverr order in 3 weeks', quote: "I walked in knowing nothing about design. I walked out with a Fiverr gig that pays my whole family's expenses.", name: 'Ayesha Noor', course: 'Graphic Designing, Batch 6' },
  { badge: '$400 first month on Upwork', quote: 'The freelancing module alone was worth the fee — they taught us how to actually win clients, not just use the tools.', name: 'Hassan Raza', course: 'Freelancing Mastery, Batch 3' },
  { badge: 'Shopify store profitable in month 2', quote: "They didn't just teach Shopify setup — they taught how to actually find products worth selling.", name: 'Rimsha Iqbal', course: 'E-commerce Mastery, Batch 2' },
];

export default function About() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow">About The Institute</div>
          <h1 style={{ maxWidth: '20ch' }}>A physical campus for a digital economy.</h1>
          <p className="hero-lead">
            Future AI Skills was founded in Shujabad to close the gap between what schools teach and what the
            internet pays for. We're not an online course library — we're a real classroom, with real instructors,
            where students practise the exact skills that YouTube channels, marketing agencies, design studios and
            global marketplaces are hiring for today. Small batches, hands-on projects, and a curriculum that's
            updated every batch to match what's actually working in the market.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="director">
            <img src="https://placehold.co/500x625/1C1917/F59E0B?text=Director" alt="Portrait of the Director" className="director-photo" />
            <div>
              <div className="eyebrow">Director's Message</div>
              <p className="director-quote">
                We didn't build Future AI Skills to hand out certificates. We built it so a student from Shujabad
                could compete for the same clients as anyone in Karachi, Dubai, or New York — and win, because
                their skill is real.
              </p>
              <div className="director-name">Muhammad Usman</div>
              <div className="director-role">Founder &amp; Director, Future AI Skills</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Our Team</div>
            <h2>Instructors who work in the industry they teach</h2>
          </div>
          <div className="grid grid-4">
            {TEAM.map(person => (
              <div className="card person-card" key={person.name}>
                <img className="person-photo" src="https://placehold.co/300x300/F2EFEC/1C1917?text=Instructor" alt={`Photo of ${person.name}`} />
                <h3>{person.name}</h3>
                <div className="person-role">{person.role}</div>
                <p>{person.bio}</p>
                <div className="person-social">
                  {person.socials.map(([label, abbr]) => (
                    <a href="#" aria-label={label} key={label}>{abbr}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="branch-callout">
            <div>
              <h3>Our second branch — Vision Giants</h3>
              <p>As students asked to go deeper into tech, we opened Vision Giants: a sister campus focused on web development, app development and software careers.</p>
            </div>
            <a href="https://visiongiants.example.com" target="_blank" rel="noopener noreferrer" className="btn btn-accent">Visit visiongiants.example.com ↗</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Success Stories</div>
            <h2>What our students have gone on to do</h2>
          </div>
          <div className="grid grid-3">
            {STORIES.map(s => (
              <div className="card testimonial-card" key={s.name}>
                <span className="badge-achievement">{s.badge}</span>
                <p className="testimonial-quote">{s.quote}</p>
                <div className="testimonial-who">
                  <div className="testimonial-photo"></div>
                  <div>
                    <div className="testimonial-name">{s.name}</div>
                    <div className="testimonial-course">{s.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
