import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ENTITIES } from "./config/entities";
import type { ManagedTable } from "./types";
import LoginPage from "./pages/LoginPage";
import Overview from "./pages/Overview";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import EntitySection from "./components/EntitySection";
import { getCourses } from "../api/courseApi";


import "./index.css";

/* ============================================================
   ADMIN APP ENTRY POINT
   ============================================================ */

type Section = "overview" | ManagedTable;

function AdminShell() {
  const { user, loading } = useAuth();

  const [section, setSection] = useState<Section>("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  // TEMPORARY TEST ONLY
  useEffect(() => {
    async function loadCourses() {
      try {
        const courses = await getCourses();
        console.log("Courses from backend:", courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    }


    loadCourses();
  }, []);

  if (!user) {
    return <LoginPage />;
  }

 
  const title =
    section === "overview"
      ? "Overview"
      : ENTITIES[section].label;

  const subtitle =
    section === "overview"
      ? "Everything on your site, in one place."
      : ENTITIES[section].description;

  return (
    <div className="shell">
      <Sidebar
        section={section}
        onNavigate={setSection}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="main">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setMenuOpen((o) => !o)}
        />

        <div className="content">
          {section === "overview" ? (
            <Overview onNavigate={setSection} />
          ) : (
            <EntitySection section={section} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminApp() {
  return (
    <div className="admin-scope">
      <AuthProvider>
        <ToastProvider>
          <AdminShell />
        </ToastProvider>
      </AuthProvider>
    </div>
  );
}
