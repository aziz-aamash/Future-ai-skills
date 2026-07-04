import { useState } from 'react';

export default function CurriculumAccordion({ modules }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="curriculum">
      {modules.map((mod, i) => {
        const num = String(i + 1).padStart(2, '0');
        const isOpen = openIndex === i;
        return (
          <div className={`curriculum-item${isOpen ? ' open' : ''}`} key={mod.title}>
            <button
              className="curriculum-head"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>
                <span className="num">{num}</span>
                <h4>{mod.title}</h4>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="dur">{mod.dur}</span>
                <span className="chev">+</span>
              </span>
            </button>
            <div className="curriculum-body">{mod.body}</div>
          </div>
        );
      })}
    </div>
  );
}
