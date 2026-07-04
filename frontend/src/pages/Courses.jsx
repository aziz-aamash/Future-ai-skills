import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal.js";
import { getCourses } from "../api/courseApi";

function getTagClass(category) {
  const map = {
    "YouTube": "tag-content",
    "Marketing": "tag-marketing",
    "Design": "tag-design",
    "Freelancing": "tag-freelancing",
    "E-Commerce": "tag-ecommerce",
    "Content": "tag-content",
  };

  return map[category] || "tag-content";
}

export default function Courses() {
  const revealRef = useScrollReveal();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  if (loading)
    return (
      <div className="section">
        <div className="container">Loading courses...</div>
      </div>
    );

  if (error)
    return (
      <div className="section">
        <div className="container">{error}</div>
      </div>
    );

  return (
    <div ref={revealRef}>
      <section className="hero" style={{ paddingBottom: 20 }}>
        <div className="container">
          <div className="eyebrow">Skill Tracks</div>
          <h1 style={{ maxWidth: "16ch" }}>
            Courses built around what employers and clients actually pay for.
          </h1>
          <p className="hero-lead">
            Every track below is taught physically at our Shujabad campus. Tap a
            course to see its full details.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="grid grid-2">
            {courses.map((course) => (
              <div
                className="card course-card"
                key={course.id}
                id={course.slug}
              >
                <div className="course-top">
                  <span
                    className={`course-tag ${getTagClass(course.category)}`}
                  >
                    {course.category}
                  </span>

                  <span className="course-duration">
                    {course.duration}
                  </span>
                </div>

                <h3>
                  <Link
                    to={`/courses/${course.slug}`}
                    style={{ color: "inherit" }}
                  >
                    {course.title}
                  </Link>
                </h3>

                <p>{course.description}</p>

                <div className="course-rating">
                  ⭐ <b>{course.rating}</b> ({course.reviewCount} reviews)
                </div>

                <div className="course-foot" style={{ gap: 10 }}>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="btn btn-outline"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    View Full Details
                  </Link>

                  <Link
                    to="/contact"
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight section-alt">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem" }}>
            Still deciding which track is right for you?
          </h2>

          <p>
            Read answers to common questions about batches, fees and schedules.
          </p>

          <Link to="/faq" className="btn btn-primary">
            Read the FAQs
          </Link>
        </div>
      </section>
    </div>
  );
}