// ============================================================
// FUTURE AI SKILLS — Course data
// Single source of truth for the Courses list page and the
// CourseDetail page (src/pages/CourseDetail.jsx).
// ============================================================

const COURSE_DATA = {

  "youtube-automation": {
    title: "YouTube Automation",
    tagLabel: "Content",
    tagClass: "tag-content",
    duration: "8 weeks",
    rating: "4.8",
    reviews: 112,
    summary: "Build and run faceless YouTube channels end-to-end — niche research, scripting, voiceover, editing, thumbnails and monetisation.",
    intro: "This track takes you from a blank channel to a published, monetised YouTube automation business. You'll pick a real niche in week one and carry a single channel through the entire course — researching, scripting, voicing, editing and publishing actual videos, not exercises.",
    outcomes: [
      "Choose and validate a profitable, low-competition niche",
      "Write scripts built for retention, not just information",
      "Produce natural-sounding AI voiceovers for narration",
      "Edit full videos and design thumbnails that get clicked",
      "Apply for and grow revenue through AdSense and sponsorships",
      "Set up systems to run more than one channel at once"
    ],
    tools: ["CapCut", "Adobe Premiere Pro", "ElevenLabs (AI voice)", "Canva / Photoshop for thumbnails", "TubeBuddy / VidIQ", "YouTube Studio"],
    whoFor: "Beginners who want a content business that doesn't depend on being on camera, and anyone already running a channel who wants a proper system behind it.",
    instructor: { name: "Ahmad Fraz", role: "Lead — YouTube Automation", bio: "Runs 4 profitable faceless YouTube channels and teaches the exact system he uses to grow and monetise them." },
    curriculum: [
      { title: "Niche Research & Channel Strategy", dur: "Week 1", body: "Finding profitable niches, competitor analysis, and setting a content calendar." },
      { title: "Scriptwriting & AI Voiceover", dur: "Week 2–3", body: "Writing retention-focused scripts and producing natural-sounding AI voiceovers." },
      { title: "Video Editing & Thumbnails", dur: "Week 4–6", body: "Editing in CapCut/Premiere, pacing, and designing click-worthy thumbnails." },
      { title: "Monetisation & Scaling", dur: "Week 7–8", body: "AdSense, sponsorships, and outsourcing to run multiple channels at once." }
    ]
  },

  "digital-marketing": {
    title: "Digital Marketing",
    tagLabel: "Marketing",
    tagClass: "tag-marketing",
    duration: "6 weeks",
    rating: "4.7",
    reviews: 98,
    summary: "SEO, paid ads, email marketing and analytics — the full toolkit brands and freelancers need to get discovered.",
    intro: "A practical, campaign-first marketing track. Instead of studying theory, you'll set up real SEO audits, run a simulated ad budget, and build an email funnel you can hand straight to a client or your own business.",
    outcomes: [
      "Run a keyword and on-page SEO audit for any website",
      "Plan and launch Meta and Google Ads campaigns on a budget",
      "Build automated email sequences that convert cold leads",
      "Read GA4 data and turn it into a report a client understands",
      "Put together a full-funnel marketing plan from scratch"
    ],
    tools: ["Google Search Console", "Meta Ads Manager", "Google Ads", "Google Analytics 4", "Mailchimp / email automation tools"],
    whoFor: "Anyone who wants to market a business — their own, a client's, or an employer's — using channels that are actually measurable.",
    instructor: { name: "Mahnoor Ali", role: "Lead — Digital Marketing", bio: "Google & Meta certified, and manages live ad accounts for local and international brands." },
    curriculum: [
      { title: "SEO Fundamentals", dur: "Week 1–2", body: "Keyword research, on-page SEO, and Google Search Console." },
      { title: "Meta & Google Ads", dur: "Week 3–4", body: "Running and optimising paid campaigns with a real budget simulation." },
      { title: "Email & Funnel Building", dur: "Week 5", body: "Building automated sequences that convert cold leads into buyers." },
      { title: "Analytics & Client Reporting", dur: "Week 6", body: "Reading data in GA4 and presenting results clients understand." }
    ]
  },

  "graphic-designing": {
    title: "Graphic Designing",
    tagLabel: "Design",
    tagClass: "tag-design",
    duration: "6 weeks",
    rating: "4.9",
    reviews: 140,
    summary: "Photoshop, Illustrator, branding and social media creatives — leave with a portfolio ready to sell.",
    intro: "Design fundamentals taught the way agencies actually use them — colour, type and layout — then applied straight into brand identities and social creatives you can put in a portfolio from day one.",
    outcomes: [
      "Apply colour theory and typography with intention, not guesswork",
      "Work confidently in Photoshop and Illustrator",
      "Build a full brand identity from logo to style guide",
      "Design scroll-stopping social posts, carousels and ad creatives",
      "Package and price your work for your first freelance clients"
    ],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "Figma (basics)"],
    whoFor: "Beginners with no design background who want a sellable creative skill, and hobbyists who want to turn their eye for design into paid work.",
    instructor: { name: "Sara Khalid", role: "Lead — Graphic Designing", bio: "7 years in branding, currently designing for clients across the UK and UAE." },
    curriculum: [
      { title: "Design Fundamentals & Tools", dur: "Week 1", body: "Colour theory, typography, and mastering Photoshop & Illustrator basics." },
      { title: "Branding & Logo Design", dur: "Week 2–3", body: "Building full brand identities from logo to style guide." },
      { title: "Social Media Creatives", dur: "Week 4–5", body: "Designing scroll-stopping posts, carousels and ad creatives." },
      { title: "Portfolio & Client Pitching", dur: "Week 6", body: "Packaging your work and pricing your first freelance projects." }
    ]
  },

  "video-editing": {
    title: "Video Editing",
    tagLabel: "Content",
    tagClass: "tag-content",
    duration: "5 weeks",
    rating: "4.8",
    reviews: 86,
    summary: "Premiere Pro & DaVinci Resolve — cuts, colour grading, sound design and motion graphics for real client work.",
    intro: "A tight, hands-on editing track focused on the craft that separates amateur cuts from client-ready delivery: pacing, colour, sound and finishing.",
    outcomes: [
      "Edit efficiently with a keyboard-first, timeline-based workflow",
      "Cut for pace so footage never feels slow",
      "Colour correct and grade for a consistent, cinematic look",
      "Mix audio and add simple motion titles and lower thirds",
      "Deliver client-ready exports and handle revisions professionally"
    ],
    tools: ["Adobe Premiere Pro", "DaVinci Resolve", "Adobe After Effects (basics)"],
    whoFor: "Anyone who wants to edit for YouTubers, agencies or their own channel — including students already in the YouTube Automation track.",
    instructor: { name: "Ahmad Fraz", role: "Lead — Video Editing & YouTube Automation", bio: "Edits and produces for his own faceless YouTube channels and teaches the exact editing workflow he uses." },
    curriculum: [
      { title: "Editing Foundations", dur: "Week 1", body: "Timeline workflow, cutting for pace, and keyboard-first editing." },
      { title: "Colour Grading", dur: "Week 2", body: "Correcting and grading footage for a consistent, cinematic look." },
      { title: "Sound Design & Motion Graphics", dur: "Week 3–4", body: "Mixing audio and adding simple animated titles and lower thirds." },
      { title: "Delivering for Clients", dur: "Week 5", body: "Export settings, revisions, and finding editing gigs online." }
    ]
  },

  "freelancing-mastery": {
    title: "Freelancing Mastery — Upwork & Fiverr",
    tagLabel: "Freelancing",
    tagClass: "tag-freelancing",
    duration: "4 weeks",
    rating: "4.9",
    reviews: 131,
    summary: "Turn any skill into paid work: winning profiles, proposals that convert, and long-term client relationships.",
    intro: "This track is skill-agnostic — it's built for students combining it with a craft (design, editing, marketing) and teaches everything around that craft: getting found, getting hired, and getting paid.",
    outcomes: [
      "Build an Upwork profile and Fiverr gigs that actually rank",
      "Write proposals that get replies, with real before-and-afters",
      "Price your first jobs correctly and avoid underselling yourself",
      "Handle briefs, revisions and difficult clients professionally",
      "Withdraw earnings, understand basic tax obligations, and move from one-off gigs to repeat clients"
    ],
    tools: ["Upwork", "Fiverr", "Payoneer / Wise", "Google Docs & Sheets for proposals and tracking"],
    whoFor: "Any student who already has (or is learning) a sellable skill and wants to turn it into consistent freelance income.",
    instructor: { name: "Zain Malik", role: "Lead — Freelancing & E-commerce", bio: "Top Rated on Upwork and a Fiverr Level 2 seller with 500+ completed orders." },
    curriculum: [
      { title: "Profile & Gig Setup", dur: "Week 1", body: "Building an Upwork profile and Fiverr gigs that rank and convert." },
      { title: "Winning Proposals", dur: "Week 2", body: "Writing proposals that stand out and pricing your first jobs correctly." },
      { title: "Client Communication", dur: "Week 3", body: "Handling briefs, revisions and difficult clients professionally." },
      { title: "Getting Paid & Scaling", dur: "Week 4", body: "Withdrawals, taxes basics, and moving from gigs to repeat clients." }
    ]
  },

  "ecommerce-mastery": {
    title: "E-commerce Mastery — Amazon, eBay, Daraz, Etsy & Shopify",
    tagLabel: "E-commerce",
    tagClass: "tag-ecommerce",
    duration: "6 weeks",
    rating: "4.7",
    reviews: 77,
    summary: "Product research, listing optimisation and store management across the world's biggest marketplaces.",
    intro: "From finding a product worth selling to running your own Shopify storefront, this track covers both marketplace selling and independent store ownership.",
    outcomes: [
      "Research and validate winning products across Amazon, eBay, Daraz and Etsy",
      "Write titles and listings optimised to convert and rank",
      "Set up, brand and launch a Shopify storefront",
      "Manage orders, fulfilment and customer reviews",
      "Scale ad spend once a store is proven profitable"
    ],
    tools: ["Shopify", "Amazon Seller Central", "Etsy", "Daraz Seller Center", "Canva for listing images"],
    whoFor: "Students who want to sell physical products online, whether through existing marketplaces or their own store.",
    instructor: { name: "Zain Malik", role: "Lead — Freelancing & E-commerce", bio: "Runs profitable listings across multiple marketplaces and teaches the exact product-research checklist he uses." },
    curriculum: [
      { title: "Product & Niche Research", dur: "Week 1", body: "Finding winning products across Amazon, eBay, Daraz and Etsy." },
      { title: "Listings That Sell", dur: "Week 2–3", body: "Titles, images and SEO for Amazon & Etsy listings that convert." },
      { title: "Building a Shopify Store", dur: "Week 4–5", body: "Setting up, branding and launching your own Shopify storefront." },
      { title: "Fulfilment & Store Growth", dur: "Week 6", body: "Order management, reviews, and scaling ad spend once you're profitable." }
    ]
  }

};

export default COURSE_DATA;
