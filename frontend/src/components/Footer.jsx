import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Future AI Skills</div>
            <p style={{ color: '#B8B3AC', fontSize: '.9rem', maxWidth: '32ch' }}>
              A physical training academy in Shujabad, Punjab — building careers in digital skills and the global freelance economy.
            </p>
          </div>
          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li>Shujabad, Punjab, Pakistan</li>
              <li>+92 300 0000000</li>
              <li>hello@futureaiskills.pk</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Our Network</h5>
            <ul>
              <li><a href="https://visiongiants.example.com" target="_blank" rel="noopener noreferrer">Vision Giants ↗</a></li>
              <li>Sister campus — web &amp; app dev</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Future AI Skills. All rights reserved.</span>
          <span>Shujabad, Punjab, Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
