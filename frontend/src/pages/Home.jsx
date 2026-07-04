import { Link } from 'react-router-dom';
import useStudentCount from '../hooks/useStudentCount.js';
import useScrollReveal from '../hooks/useScrollReveal.js';
import COURSE_DATA from '../data/courseData.js';

const FEATURED_SLUGS = ['youtube-automation', 'digital-marketing', 'graphic-designing'];

export default function Home() {
  const { count } = useStudentCount();
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Shujabad's Digital Skills Academy</div>
            <h1>Why <em>skills</em> matter more than degrees now.</h1>
            <p className="hero-lead">
              A degree gets you a queue. A skill gets you a client — in dollars, from anywhere. Future AI Skills
              is a physical academy where beginners in Shujabad learn the exact skills the internet is hiring
              for, taught in-person, module by module, until they can earn on their own.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-accent">Explore Courses</Link>
              <Link to="/about" className="btn btn-outline">Meet the Academy</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><b>{count.toLocaleString()}+</b><span>Students trained · live count</span></div>
              <div className="hero-stat"><b>6</b><span>Skill tracks taught</span></div>
              <div className="hero-stat"><b>100%</b><span>In-person, hands-on</span></div>
              <div className="hero-stat"><b>2</b><span>Campuses in Punjab</span></div>
            </div>
          </div>
          <div className="hero-panel">
            <h4>This week at the academy</h4>
            <div className="hero-panel-list">
              <div className="hero-panel-item"><span className="dot"></span> YouTube Automation — Batch 4 · seats open</div>
              <div className="hero-panel-item"><span className="dot"></span> Graphic Designing — evening class · Mon–Thu</div>
              <div className="hero-panel-item"><span className="dot"></span> Freelancing Mastery — Upwork &amp; Fiverr profile clinic</div>
              <div className="hero-panel-item"><span className="dot"></span> Video Editing — new batch starts July 20</div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker-track">
          {['YouTube Automation', 'Digital Marketing', 'Graphic Designing', 'Video Editing', 'Freelancing Mastery', 'E-commerce Mastery']
            .concat(['YouTube Automation', 'Digital Marketing', 'Graphic Designing', 'Video Editing', 'Freelancing Mastery', 'E-commerce Mastery'])
            .map((label, i) => <span key={i}>{label}</span>)}
        </div>
      </div>

      {/* FEATURED COURSES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Skill Tracks</div>
            <h2>Six skills. One campus. Real income.</h2>
            <p>Every course is taught physically at our Shujabad campus, in small batches, with a project-based curriculum.</p>
          </div>
          <div className="grid grid-3">
            {FEATURED_SLUGS.map(slug => {
              const c = COURSE_DATA[slug];
              return (
                <div className="card course-card" key={slug}>
                  <div className="course-top">
                    <span className={`course-tag ${c.tagClass}`}>{c.tagLabel}</span>
                    <span className="course-duration">{c.duration}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.summary}</p>
                  <div className="course-rating">⭐ <b>{c.rating}</b> ({c.reviews} reviews)</div>
                  <div className="course-foot">
                    <Link to={`/courses/${slug}`} className="link-arrow">View full details →</Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/courses" className="btn btn-outline">See all 6 courses</Link>
          </div>
        </div>
      </section>

      {/* WHY / STATS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Why It Matters</div>
            <h2>The jobs market changed. We built the academy for it.</h2>
          </div>
          <div className="stats-strip">
            <div className="stat-box"><b>60%+</b><span>Youth underemployment in traditional job markets</span></div>
            <div className="stat-box"><b>$1T+</b><span>Global freelance economy, growing every year</span></div>
            <div className="stat-box"><b>0</b><span>Degree required to start earning online</span></div>
            <div className="stat-box"><b>12</b><span>Weeks, on average, to a first paid client</span></div>
          </div>
        </div>
      </section>

      {/* BRANCH CALLOUT */}
      <section className="section-tight">
        <div className="container">
          <div className="branch-callout">
            <div>
              <h3>Expanding into software with Vision Giants</h3>
              <p>Our sister campus focuses on web &amp; app development — for students who want to go further into tech.</p>
            </div>
            <a href="https://visiongiants.example.com" target="_blank" rel="noopener noreferrer" className="btn btn-accent">Visit Vision Giants ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}
