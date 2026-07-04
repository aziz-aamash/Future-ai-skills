const prisma = require('../config/prismaClient');
const asyncHandler = require('../middleware/asyncHandler');

// small helper: "E-Commerce Bootcamp!" -> "e-commerce-bootcamp"
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

// ------------------------------------------------------------
// PUBLIC: GET /api/courses
// Query params: ?featured=true  ?category=E-Commerce
// ------------------------------------------------------------
exports.getAllCourses = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const courses = await prisma.course.findMany({
    where: {
      isActive: true,
      ...(category ? { category } : {}),
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  res.json(courses);
});
// ------------------------------------------------------------
// PUBLIC: GET /api/courses/:slug
// ------------------------------------------------------------
exports.getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await prisma.course.findUnique({
    where: {
      slug: req.params.slug,
    },
  });

  if (!course) {
    const err = new Error("Course not found");
    err.statusCode = 404;
    throw err;
  }

  res.json(course);
});

// ------------------------------------------------------------
// ADMIN: POST /api/admin/courses
// ------------------------------------------------------------
exports.createCourse = asyncHandler(async (req, res) => {
  const slug = slugify(req.body.title);

  const course = await prisma.course.create({
    data: {
      ...req.body,
      slug,
    },
  });

  res.status(201).json(course);
});
// ------------------------------------------------------------
// ADMIN: PUT /api/admin/courses/:id
// ------------------------------------------------------------
exports.updateCourse = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const course = await prisma.course.update({
    where: { id },
    data: req.body,
  });

  res.json(course);
});

// ------------------------------------------------------------
// ADMIN: DELETE /api/admin/courses/:id
// ------------------------------------------------------------
exports.deleteCourse = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  await prisma.course.delete({ where: { id } });

  res.json({ success: true, message: 'Course deleted' });
});