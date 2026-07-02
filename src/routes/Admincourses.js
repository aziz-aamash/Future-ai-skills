const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const validate = require('../middleware/validate');
const courseSchema = require('../schemas/courseSchema');
const requireAdmin = require('../middleware/requireAdmin');

// every route below requires a valid admin JWT
router.use(requireAdmin);

router.post('/', validate(courseSchema), courseController.createCourse);
router.put('/:id', validate(courseSchema), courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;