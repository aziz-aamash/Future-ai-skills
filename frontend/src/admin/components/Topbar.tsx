import React from "react";

interface Props {
  title: string;
  subtitle: string;
  onMenuToggle: () => void;
}

export default function Topbar({ title, subtitle, onMenuToggle }: Props) {
  return (
    <div className="topbar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <button className="menu-toggle" onClick={onMenuToggle}>☰</button>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
