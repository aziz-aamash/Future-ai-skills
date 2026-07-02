const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./middleware/errorHandler');
const coursesRouter = require('./routes/courses');
const adminCoursesRouter = require('./routes/adminCourses');

const app = express();

app.use(cors()); // tighten to specific origins once frontend URL is known
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// public
app.use('/api/courses', coursesRouter);

// admin-protected
app.use('/api/admin/courses', adminCoursesRouter);

// 404 for unmatched routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// centralized error handler — must be LAST
app.use(errorHandler);

module.exports = app;