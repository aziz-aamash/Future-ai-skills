import React from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { ENTITIES, ENTITY_ORDER } from "../config/entities";
import type { ManagedTable } from "../types";

interface Props {
  section: "overview" | ManagedTable;
  onNavigate: (section: "overview" | ManagedTable) => void;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ section, onNavigate, open, onClose }: Props) {
  const { user, logout } = useAuth();
  const { db } = useData();

  function go(key: "overview" | ManagedTable) {
    onNavigate(key);
    onClose();
  }

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-brand">
        <div className="mark">FA</div>
        <span>Future AI Skills</span>
      </div>

      <nav className="sidebar-nav">
        <button className={section === "overview" ? "active" : ""} onClick={() => go("overview")}>
          <span>📊</span>
          <span>Overview</span>
        </button>

        {ENTITY_ORDER.map((key) => {
          const ent = ENTITIES[key];
          const count = (db[key] as any[]).length;
          return (
            <button key={key} className={section === key ? "active" : ""} onClick={() => go(key)}>
              <span>{ent.icon}</span>
              <span>{ent.label}</span>
              <span className="tag">{count}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-foot">
        <div className="who">Signed in as {user?.username}</div>
        <button className="logout-btn" onClick={logout}>Log out</button>
      </div>
    </aside>
  );
}
