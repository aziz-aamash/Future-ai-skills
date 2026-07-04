import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal.js';
import BLOG_DATA from '../data/blogData.js';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'content', label: 'Content' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'design', label: 'Design' },
  { key: 'freelancing', label: 'Freelancing' },
  { key: 'ecommerce', label: 'E-commerce' },
];

export default function Blogs() {
  const [activeCat, setActiveCat] = useState('all');
  const revealRef = useScrollReveal([activeCat]);
  const entries = Object.entries(BLOG_DATA);
  const visible = activeCat === 'all' ? entries : entries.filter(([, p]) => p.cat === activeCat);

  return (
    <div ref={revealRef}>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow">Blogs</div>
          <h1 style={{ maxWidth: '18ch' }}>Guides on the skills that pay, from our instructors.</h1>
          <p className="hero-lead">Practical write-ups on YouTube, marketing, design, freelancing and e-commerce — the same lessons we teach on campus.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="category-chips">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                className={`chip${activeCat === c.key ? ' active' : ''}`}
                onClick={() => setActiveCat(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-3">
            {visible.map(([slug, post]) => (
              <div className="card blog-card" key={slug}>
                <img className="blog-thumb" src={`https://placehold.co/500x310/1C1917/F59E0B?text=${post.img}`} alt={`${post.title} thumbnail`} />
                <div className="blog-body">
                  <div className="blog-meta">{post.meta}</div>
                  <h3>{post.title}</h3>
                  <p>{post.teaser}</p>
                  <Link to={`/blogs/${slug}`} className="link-arrow">Read more →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
