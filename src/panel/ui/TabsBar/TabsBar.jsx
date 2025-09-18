import React from "react";
import s from "./TabsBar.module.css";

export default function TabsBar({ count, active, onSelect }) {
  const tabs = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div className={s.bar}>
      <div className={s.tabs}>
        {tabs.map((n) => (
          <button
            key={n}
            className={n === active ? `${s.tab} ${s.tabActive}` : s.tab}
            onClick={() => onSelect(n)}
            title={`Tab ${n}`}
            aria-pressed={n === active}
          >
            {n}
          </button>
        ))}
      </div>
      <div className={s.spacer} />
    </div>
  );
}
