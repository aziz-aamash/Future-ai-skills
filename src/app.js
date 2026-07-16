const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/errorHandler");

const coursesRouter = require("./routes/courses");
const adminCoursesRouter = require("./routes/Admincourses");
const authRouter = require("./routes/auth");
const blogPublicRoutes = require("./routes/BlogPublicRoutes");
const adminBlogRoutes = require("./routes/AdminBlogs");
const successStoriesPublicRoutes = require("./routes/Successstoriespublicroutes");
const adminSuccessStoriesRouter = require("./routes/Adminsuccessstories");
const teamMembersPublicRoutes = require("./routes/teammemberspublicroutes");
const adminTeamMembersRouter = require("./routes/Adminteammembers");

const app = express();

// Comma-separated list of allowed origins, e.g.:
// CORS_ORIGINS=https://jelectronics.store,https://admin.jelectronics.store,https://your-app.vercel.app
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser requests (curl, server-to-server, health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
}));

app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Authentication
app.use("/api/admin", authRouter);

// Public routes
app.use("/api/courses", coursesRouter);
app.use("/api/blog-posts", blogPublicRoutes);

// Protected routes
app.use("/api/admin/courses", adminCoursesRouter);
app.use("/api/admin/blog-posts", adminBlogRoutes);
app.use("/api/success-stories", successStoriesPublicRoutes);
app.use("/api/team-members", teamMembersPublicRoutes);
app.use("/api/admin/success-stories", adminSuccessStoriesRouter);
app.use("/api/admin/team-members", adminTeamMembersRouter);
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin/contact-submissions', require('./routes/AdminContact'));
app.use('/api/announcements', require('./routes/Announcement'));
app.use('/api/admin/announcements', require('./routes/AdminAnnouncement'));
// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;
