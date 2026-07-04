# Future AI Skills — React version

A React + Vite port of the original static site. Same design, same content,
same behavior — routed with React Router instead of separate HTML files.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Outputs a static `dist/` folder you can deploy anywhere (Netlify, Vercel,
GitHub Pages, your own server, etc.).

## Project structure

```
src/
├── main.jsx              # React entry point, wraps App in BrowserRouter
├── App.jsx                # All routes
├── styles.css              # Ported 1:1 from the original site
├── data/
│   └── courseData.js       # Single source of truth for all 6 courses
├── hooks/
│   ├── useStudentCount.js  # Live student counter (countapi.xyz)
│   └── useScrollReveal.js  # Scroll-in animation, same as the old script.js
├── components/
│   ├── Layout.jsx          # Wraps every page: NotifyBar + Header + Footer
│   ├── NotifyBar.jsx
│   ├── Header.jsx           # Nav + mobile hamburger menu
│   ├── Footer.jsx
│   └── CurriculumAccordion.jsx
└── pages/
    ├── Home.jsx
    ├── Courses.jsx          # /courses — list of all 6 tracks
    ├── CourseDetail.jsx     # /courses/:slug — replaces course.html?course=...
    ├── About.jsx
    ├── Contact.jsx          # Controlled form; submit bumps the live counter
    ├── Blogs.jsx            # Category filter via useState
    └── Faq.jsx               # Accordion via useState
```

## What changed vs. the static HTML site

- **Routing**: `course.html?course=youtube-automation` → `/courses/youtube-automation`
  (cleaner URLs, same data source in `data/courseData.js`).
- **No more manual DOM queries**: accordions, the mobile nav, the blog filter,
  and the contact form are all React state now instead of `script.js`
  querying the DOM after the fact.
- **Shared layout**: header/footer/notify-bar are components rendered once,
  instead of being copy-pasted into every HTML file.

## Notes

- The live student counter uses `countapi.xyz`, a free public counter
  service — no backend required. The namespace in
  `src/hooks/useStudentCount.js` (`futureaiskills-shujabad-fa2026`) should
  be changed to something unique to your domain before going live, since
  countapi namespaces are globally shared by name.
- Placeholder images still point to `placehold.co` — swap in real photos
  whenever you have them.
