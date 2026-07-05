import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { DB, ManagedTable, AnyRecord } from "../types";
import { seedDB } from "../data/seed";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../../api/courseApi";
import {
  getPublishedBlogPosts,
  getAllBlogPostsAdmin,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../../api/blogApi";

/* ============================================================
   DATA CONTEXT
   Holds the mock DB in React state for most tables, but the
   `courses` and `blog_posts` tables are wired to the real backend.

   blog_posts loading is split in two:
   - On mount, every visitor (public or admin) gets the PUBLIC,
     unauthenticated, published-only list. Safe with no cookie.
   - The admin blog management page separately calls
     refreshBlogPostsAdmin() to overwrite blog_posts with the FULL
     list (drafts included) via the authenticated admin endpoint.
     This is never called from public-facing pages, so anonymous
     visitors never trigger a request that needs the admin cookie.
   ============================================================ */

interface DataContextValue {
  db: DB;
  addRecord: (table: ManagedTable, record: Record<string, any>) => Promise<AnyRecord>;
  updateRecord: (table: ManagedTable, id: number, updates: Record<string, any>) => Promise<AnyRecord | null>;
  deleteRecord: (table: ManagedTable, id: number) => Promise<void>;
  getRecord: (table: ManagedTable, id: number) => AnyRecord | null;
  refreshBlogPostsAdmin: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

function nextId(rows: { id: number }[]): number {
  return rows.reduce((max, r) => Math.max(max, r.id || 0), 0) + 1;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<DB>(seedDB);

  useEffect(() => {
    getCourses()
      .then((courses) => {
        setDb((prev) => ({ ...prev, courses: courses as any }));
      })
      .catch((err) => {
        console.error("Failed to load courses from backend:", err);
      });

    // Public, unauthenticated fetch — safe for every visitor, published-only.
    getPublishedBlogPosts()
      .then((posts) => {
        setDb((prev) => ({ ...prev, blog_posts: posts as any }));
      })
      .catch((err) => {
        console.error("Failed to load blog posts from backend:", err);
      });
  }, []);

  // Called only by the admin blog management page — overwrites blog_posts
  // with the FULL list (drafts included) via the authenticated admin endpoint.
  const refreshBlogPostsAdmin = useCallback(async () => {
    try {
      const posts = await getAllBlogPostsAdmin();
      setDb((prev) => ({ ...prev, blog_posts: posts as any }));
    } catch (err) {
      console.error("Failed to load blog posts (admin):", err);
    }
  }, []);

  const addRecord = useCallback(async (table: ManagedTable, record: Record<string, any>) => {
    if (table === "courses") {
      const created = await createCourse(record);
      setDb((prev) => ({ ...prev, courses: [...(prev.courses as any), created] }));
      return created;
    }

    if (table === "blog_posts") {
      const created = await createBlogPost(record);
      setDb((prev) => ({ ...prev, blog_posts: [...(prev.blog_posts as any), created] }));
      return created;
    }

    let created!: AnyRecord;
    setDb((prev) => {
      const rows = prev[table] as unknown as AnyRecord[];
      created = { ...record, id: nextId(rows) } as AnyRecord;
      return { ...prev, [table]: [...rows, created] };
    });
    return created;
  }, []);

  const updateRecord = useCallback(async (table: ManagedTable, id: number, updates: Record<string, any>) => {
    if (table === "courses") {
      const updated = await updateCourse(id, updates);
      setDb((prev) => ({
        ...prev,
        courses: (prev.courses as any).map((r: AnyRecord) => (r.id === id ? updated : r)),
      }));
      return updated;
    }

    if (table === "blog_posts") {
      const updated = await updateBlogPost(id, updates);
      setDb((prev) => ({
        ...prev,
        blog_posts: (prev.blog_posts as any).map((r: AnyRecord) => (r.id === id ? updated : r)),
      }));
      return updated;
    }

    let updated: AnyRecord | null = null;
    setDb((prev) => {
      const rows = prev[table] as unknown as AnyRecord[];
      const next = rows.map((r) => {
        if (r.id === id) {
          updated = { ...r, ...updates };
          return updated;
        }
        return r;
      });
      return { ...prev, [table]: next };
    });
    return updated;
  }, []);

  const deleteRecord = useCallback(async (table: ManagedTable, id: number) => {
    if (table === "courses") {
      await deleteCourse(id);
      setDb((prev) => ({
        ...prev,
        courses: (prev.courses as any).filter((r: AnyRecord) => r.id !== id),
      }));
      return;
    }

    if (table === "blog_posts") {
      await deleteBlogPost(id);
      setDb((prev) => ({
        ...prev,
        blog_posts: (prev.blog_posts as any).filter((r: AnyRecord) => r.id !== id),
      }));
      return;
    }

    setDb((prev) => {
      const rows = prev[table] as unknown as AnyRecord[];
      return { ...prev, [table]: rows.filter((r) => r.id !== id) };
    });
  }, []);

  const getRecord = useCallback(
    (table: ManagedTable, id: number) => {
      const rows = db[table] as unknown as AnyRecord[];
      return rows.find((r) => r.id === id) || null;
    },
    [db]
  );

  return (
    <DataContext.Provider
      value={{ db, addRecord, updateRecord, deleteRecord, getRecord, refreshBlogPostsAdmin }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}