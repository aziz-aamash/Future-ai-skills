const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/errorHandler");

const coursesRouter = require("./routes/courses");
const adminCoursesRouter = require("./routes/adminCourses");
const authRouter = require("./routes/auth");
const blogPublicRoutes = require("./routes/blogPublicRoutes");
const adminBlogRoutes = require("./routes/adminBlogs");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
  ],
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

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;