import React from "react";
import s from "./TopBar.module.css";

export default function TopBar({ count, active, onSelect, onAdd }) {
  const tabs = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div className={s.bar}>
      <div className={s.tabs}>
        {tabs.map((n) => (
          <button
            key={n}
            className={n === active ? s.tabActive : s.tab}
            onClick={() => onSelect(n)}
            title={`Tab ${n}`}
          >
            {n}
          </button>
        ))}
        <button
          className={s.plus}
          onClick={onAdd}
          disabled={count >= 9}
          title={count >= 9 ? "Max 9 tabs" : "Add tab"}
        >
          +
        </button>
      </div>
      <div className={s.spacer} />
    </div>
  );
}
