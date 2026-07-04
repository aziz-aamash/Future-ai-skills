import React, { useState } from "react";
import type { EntityConfig, FieldConfig } from "../config/entities";
import type { AnyRecord, CourseModule, CourseFAQ } from "../types";

interface Props {
  entity: EntityConfig;
  record: AnyRecord | null; // null = creating new
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
}

function modulesToText(modules: CourseModule[] | undefined): string {
  return (modules || []).map((m) => `${m.module_title} | ${m.module_description || ""} | ${m.module_duration || ""}`).join("\n");
}
function textToModules(text: string): CourseModule[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line, i) => {
      const [module_title, module_description, module_duration] = line.split("|").map((s) => (s || "").trim());
      return { module_title, module_description, module_duration, module_order: i + 1 };
    });
}
function faqsToText(faqs: CourseFAQ[] | undefined): string {
  return (faqs || []).map((f) => `${f.question} | ${f.answer}`).join("\n");
}
function textToFaqs(text: string): CourseFAQ[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, answer] = line.split("|").map((s) => (s || "").trim());
      return { question, answer };
    });
}

function initialValues(fields: FieldConfig[], record: AnyRecord | null): Record<string, any> {
  const values: Record<string, any> = {};
  fields.forEach((f) => {
    if (f.special === "modules") {
      values[f.name] = modulesToText(record?.modules);
      return;
    }
    if (f.special === "faqs") {
      values[f.name] = faqsToText(record?.faqs);
      return;
    }
    const raw = record ? record[f.name] : undefined;
    if (f.type === "checkbox") {
      values[f.name] = raw ?? f.default ?? false;
    } else {
      values[f.name] = raw ?? f.default ?? "";
    }
  });
  return values;
}

export default function EntityForm({ entity, record, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<Record<string, any>>(() => initialValues(entity.fields, record));

  function setField(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: Record<string, any> = {};
    entity.fields.forEach((f) => {
      if (f.special === "modules") {
        data.modules = textToModules(values[f.name] || "");
        return;
      }
      if (f.special === "faqs") {
        data.faqs = textToFaqs(values[f.name] || "");
        return;
      }
      if (f.type === "number") {
        const v = values[f.name];
        data[f.name] = v === "" || v === null || v === undefined ? null : Number(v);
      } else {
        data[f.name] = values[f.name];
      }
    });
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      {entity.fields.map((f) => (
        <FieldInput key={f.name} field={f} value={values[f.name]} onChange={(v) => setField(f.name, v)} />
      ))}
      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{record ? "Save changes" : "Create"}</button>
      </div>
    </form>
  );
}

function FieldInput({ field, value, onChange }: { field: FieldConfig; value: any; onChange: (v: any) => void }) {
  if (field.type === "checkbox" || field.name === "is_active" || field.name === "active") {
    return (
      <div className="field">
        <label>{field.label}</label>
        <select 
          value={value ? "true" : "false"} 
          onChange={(e) => onChange(e.target.value === "true")}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="field">
        <label>
          {field.label}
          {field.required ? " *" : ""}
        </label>
        <textarea
          rows={field.rows || 3}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.hint}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="field">
        <label>{field.label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {(field.options || []).map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="field">
      <label>
        {field.label}
        {field.required ? " *" : ""}
      </label>
      <input
        type={field.type}
        step={field.step}
        required={field.required}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.hint}
      />
    </div>
  );
}