const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify'); // matches courseController's slug lib assumption — confirm this matches yours
const { validateCreateBlog, validateUpdateBlog } = require('../schemas/blogSchema');

const prisma = new PrismaClient();

function generateSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

// GET /api/admin/blog-posts
async function getAllBlogPosts(req, res) {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(posts);
  } catch (err) {
    console.error('getAllBlogPosts error:', err);
    return res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
}

// GET /api/admin/blog-posts/:id
async function getBlogPostById(req, res) {
  try {
    const id = Number(req.params.id);
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ error: 'Blog post not found' });
    return res.json(post);
  } catch (err) {
    console.error('getBlogPostById error:', err);
    return res.status(500).json({ error: 'Failed to fetch blog post' });
  }
}

// POST /api/admin/blog-posts
async function createBlogPost(req, res) {
  const result = validateCreateBlog(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Validation failed', details: result.error.flatten() });
  }

  const data = result.data;
  const slug = data.slug && data.slug.trim() !== '' ? data.slug : generateSlug(data.title);
  const publishedAt =
    data.status === 'published' && !data.publishedAt ? new Date() : data.publishedAt ?? null;

  try {
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt ?? null,
        content: data.content,
        featuredImage: data.featuredImage || null,
        category: data.category ?? null,
        authorId: data.authorId ?? null,
        status: data.status,
        publishedAt,
      },
    });
    return res.status(201).json(post);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'A post with that slug already exists' });
    }
    console.error('createBlogPost error:', err);
    return res.status(500).json({ error: 'Failed to create blog post' });
  }
}

// PUT /api/admin/blog-posts/:id
async function updateBlogPost(req, res) {
  const id = Number(req.params.id);

  const result = validateUpdateBlog(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Validation failed', details: result.error.flatten() });
  }

  const data = result.data;

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Blog post not found' });

    const slug = data.slug !== undefined && data.slug.trim() !== '' ? data.slug : existing.slug;

    let publishedAt = existing.publishedAt;
    const newStatus = data.status ?? existing.status;
    const isNewlyPublished = existing.status !== 'published' && newStatus === 'published';
    if (isNewlyPublished && data.publishedAt === undefined) {
      publishedAt = new Date();
    } else if (data.publishedAt !== undefined) {
      publishedAt = data.publishedAt;
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        slug,
        ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.featuredImage !== undefined && { featuredImage: data.featuredImage || null }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.authorId !== undefined && { authorId: data.authorId }),
        status: newStatus,
        publishedAt,
      },
    });
    return res.json(post);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'A post with that slug already exists' });
    }
    console.error('updateBlogPost error:', err);
    return res.status(500).json({ error: 'Failed to update blog post' });
  }
}

// DELETE /api/admin/blog-posts/:id
async function deleteBlogPost(req, res) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Blog post not found' });

    await prisma.blogPost.delete({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    console.error('deleteBlogPost error:', err);
    return res.status(500).json({ error: 'Failed to delete blog post' });
  }
}

// --- Public (non-admin) endpoints below ---
// Only ever return published posts. Never leaks drafts, never requires auth.

// GET /api/blog-posts
async function getPublishedBlogPosts(req, res) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
    });
    return res.json(posts);
  } catch (err) {
    console.error('getPublishedBlogPosts error:', err);
    return res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
}

// GET /api/blog-posts/:slug
async function getPublishedBlogPostBySlug(req, res) {
  try {
    const { slug } = req.params;
    const post = await prisma.blogPost.findFirst({
      where: { slug, status: 'published' },
    });
    if (!post) return res.status(404).json({ error: 'Blog post not found' });
    return res.json(post);
  } catch (err) {
    console.error('getPublishedBlogPostBySlug error:', err);
    return res.status(500).json({ error: 'Failed to fetch blog post' });
  }
}

module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getPublishedBlogPosts,
  getPublishedBlogPostBySlug,
};