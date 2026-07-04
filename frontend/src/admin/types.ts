/* ============================================================
   TYPES — mirror the SQL schema you provided, field for field.
   Field names stay snake_case on purpose so a REST API built
   directly off the schema (GET /api/courses -> SELECT * FROM
   courses) needs no translation layer against this frontend.
   ============================================================ */

export interface AdminUser {
  id: number;
  username: string;
  email?: string;
  role: string;
  last_login_at?: string | null;
}

export interface Announcement {
  id: number;
  message: string;
  cta_text?: string;
  cta_link?: string;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CourseModule {
  module_title: string;
  module_description?: string;
  module_duration?: string;
  module_order?: number;
}

/* Suggested addition to the schema — see admin-react/README.md */
export interface CourseFAQ {
  question: string;
  answer: string;
  display_order?: number;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  category?: string;
  duration?: string;
  description?: string;
  thumbnail_image?: string;
  rating?: number | null;
  review_count?: number;
  is_featured: boolean;
  is_active: boolean;
  display_order?: number;
  modules: CourseModule[];
  faqs: CourseFAQ[];
  created_at?: string;
  updated_at?: string;
}

export interface SuccessStory {
  id: number;
  student_name: string;
  student_photo?: string | null;
  course_slug?: string;
  testimonial: string;
  achievement_highlight?: string;
  video_url?: string | null;
  is_active: boolean;
  display_order?: number;
}

export interface TeamMember {
  id: number;
  name: string;
  designation?: string;
  photo?: string | null;
  bio?: string;
  specialty?: string;
  social_links?: Record<string, string>;
  is_active: boolean;
  display_order?: number;
}

/* Suggested addition to the schema — second branch (Vision Giants) */
export interface Branch {
  id: number;
  name: string;
  description?: string;
  website_url?: string;
  logo?: string | null;
  display_order?: number;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category_id?: number | null;
  author_id?: number | null;
  status: "draft" | "published";
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MediaUpload {
  id: number;
  file_url: string;
  file_type?: string;
  alt_text?: string;
  uploaded_by?: number | null;
  created_at?: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  is_read: boolean;
  submitted_at?: string;
}

/** All CRUD-manageable tables (admin_users is intentionally excluded — it's
 *  managed through the login flow, not a generic table editor). */
export interface DB {
  admin_users: AdminUser[];
  announcements: Announcement[];
  courses: Course[];
  success_stories: SuccessStory[];
  team_members: TeamMember[];
  branches: Branch[];
  blog_categories: BlogCategory[];
  blog_posts: BlogPost[];
  media_uploads: MediaUpload[];
  contact_submissions: ContactSubmission[];
}

export type ManagedTable = Exclude<keyof DB, "admin_users">;

/** A loosely-typed row shape used by the generic table/form components,
 *  which operate across every entity type from one config object. */
export type AnyRecord = Record<string, any> & { id: number };
