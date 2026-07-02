const { z } = require('zod');

const courseSchema = z.object({
  title: z.string().min(2).max(150),
  category: z.string().max(100).optional(),
  duration: z.string().max(50).optional(),
  description: z.string().optional(),
  thumbnailImage: z.string().max(255).optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

module.exports = courseSchema;