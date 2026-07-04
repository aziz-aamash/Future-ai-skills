import React, { createContext, useContext, useState, useCallback } from "react";
import type { DB, ManagedTable, AnyRecord } from "../types";
import { seedDB } from "../data/seed";

/* ============================================================
   DATA CONTEXT
   Holds the whole mock DB in React state and exposes generic
   addRecord / updateRecord / deleteRecord functions used by
   every entity screen.

   TO CONNECT A REAL BACKEND: load initial state from your API
   in a useEffect instead of `seedDB`, and replace the three
   functions below with POST / PUT / DELETE calls (see the
   comments inline). Keep the return shapes the same and no
   screen code needs to change.
   ============================================================ */

interface DataContextValue {
  db: DB;
  addRecord: (table: ManagedTable, record: Record<string, any>) => AnyRecord;
  updateRecord: (table: ManagedTable, id: number, updates: Record<string, any>) => AnyRecord | null;
  deleteRecord: (table: ManagedTable, id: number) => void;
  getRecord: (table: ManagedTable, id: number) => AnyRecord | null;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

function nextId(rows: { id: number }[]): number {
  return rows.reduce((max, r) => Math.max(max, r.id || 0), 0) + 1;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<DB>(seedDB);

  const addRecord = useCallback((table: ManagedTable, record: Record<string, any>) => {
    // Real API: const created = await fetch(`/api/${table}`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(record) }).then(r => r.json());
    let created!: AnyRecord;
    setDb((prev) => {
      const rows = prev[table] as unknown as AnyRecord[];
      created = { ...record, id: nextId(rows) } as AnyRecord;
      return { ...prev, [table]: [...rows, created] };
    });
    return created;
  }, []);

  const updateRecord = useCallback((table: ManagedTable, id: number, updates: Record<string, any>) => {
    // Real API: const updated = await fetch(`/api/${table}/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(updates) }).then(r => r.json());
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

  const deleteRecord = useCallback((table: ManagedTable, id: number) => {
    // Real API: await fetch(`/api/${table}/${id}`, { method: 'DELETE' });
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
    <DataContext.Provider value={{ db, addRecord, updateRecord, deleteRecord, getRecord }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
