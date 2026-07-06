import React from "react";
import type { ColumnConfig } from "../config/entities";
import type { AnyRecord } from "../types";

interface Props {
  columns: ColumnConfig[];
  rows: AnyRecord[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  renderRowActions?: (row: AnyRecord) => React.ReactNode;
}

function Pill({ value, kind }: { value: any; kind: NonNullable<ColumnConfig["render"]> }) {
  if (kind === "image") {
    return value ? (
      <img 
        src={String(value)} 
        alt="Profile" 
        style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", display: "block" }} 
      />
    ) : (
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e4dfd8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>
    );
  }
  if (kind === "thumb") {
    return value ? (
      <img
        src={String(value)}
        alt="Thumbnail"
        style={{ width: 64, height: 40, borderRadius: 6, objectFit: "cover", display: "block" }}
      />
    ) : (
      <div style={{ width: 64, height: 40, borderRadius: 6, background: "#e4dfd8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎓</div>
    );
  }
  if (kind === "boolean" || kind === "status") {
    return value ? <span className="pill pill-active">Active</span> : <span className="pill pill-inactive">Inactive</span>;
  }
  if (kind === "draftpill") {
    return value === "published" ? <span className="pill pill-active">Published</span> : <span className="pill pill-draft">Draft</span>;
  }
  if (kind === "readpill") {
    return value ? <span className="pill pill-read">Read</span> : <span className="pill pill-unread">Unread</span>;
  }
  return <>{String(value ?? "—")}</>;
}

function Cell({ row, col }: { row: AnyRecord; col: ColumnConfig }) {
  const val = row[col.key];
  if (col.render) return <Pill value={val} kind={col.render} />;
  if (col.primary) {
    return (
      <>
        <div className="cell-title">{String(val ?? "")}</div>
        {col.sub && row[col.sub] ? <div className="cell-sub">{String(row[col.sub])}</div> : null}
      </>
    );
  }
  return <>{String(val ?? "—")}</>;
}

export default function DataTable({ columns, rows, onEdit, onDelete, renderRowActions }: Props) {
  if (rows.length === 0) {
    return <div className="empty-state">Nothing here yet.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.label}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((c) => (
              <td key={c.key} style={c.key === "message" ? { maxWidth: 340 } : undefined}>
                <Cell row={row} col={c} />
              </td>
            ))}
            <td className="row-actions">
              {renderRowActions ? (
                renderRowActions(row)
              ) : (
                <>
                  {onEdit && (
                    <button className="btn btn-outline btn-sm" onClick={() => onEdit(row.id)}>
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(row.id)}>
                      Delete
                    </button>
                  )}
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
