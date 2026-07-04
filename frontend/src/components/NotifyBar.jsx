import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../admin/context/DataContext.tsx';

export default function NotifyBar() {
  const { db } = useData();
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('fas_notify_dismissed') === '1'
  );

  // Pick the first active announcement created in the admin panel.
  const announcement = db.announcements.find((a) => a.is_active);

  if (dismissed || !announcement) return null;

  const handleClose = () => {
    setDismissed(true);
    sessionStorage.setItem('fas_notify_dismissed', '1');
  };

  const ctaLink = announcement.cta_link || '/contact';
  const isExternal = /^https?:\/\//.test(ctaLink);

  return (
    <div className="notify-bar">
      <div className="notify-inner">
        <span>🎓 <strong>{announcement.message}</strong></span>
        {announcement.cta_text && (
          isExternal ? (
            <a href={ctaLink} className="notify-cta">{announcement.cta_text} →</a>
          ) : (
            <Link to={ctaLink} className="notify-cta">{announcement.cta_text} →</Link>
          )
        )}
      </div>
      <button className="notify-close" aria-label="Dismiss notification" onClick={handleClose}>✕</button>
    </div>
  );
}
