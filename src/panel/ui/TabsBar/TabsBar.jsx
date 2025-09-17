import React from "react";
import s from "./TabsBar.module.css";

export default function TabsBar({
  count,
  active,
  editing,
  onToggleEdit,
  onSelect,
  onDelete,
  onAdd, // <- receive the prop
}) {
  const tabs = Array.from({ length: count }, (_, i) => i + 1);
  const tabsCls = editing ? `${s.tabs} ${s.editing}` : s.tabs;

  return (
    <div className={s.bar}>
      <div className={tabsCls}>
        {tabs.map((n) => (
          <button
            key={n}
            className={n === active ? `${s.tab} ${s.tabActive}` : s.tab}
            onClick={() => (editing ? onDelete(n) : onSelect(n))}
            title={editing ? `Delete tab ${n}` : `Tab ${n}`}
            aria-pressed={n === active}
          >
            <span className={s.num}>{n}</span>
            <span className={s.cross}>×</span>
          </button>
        ))}

        {editing && count < 9 && (
          <button
            className={s.plus}
            onClick={onAdd}
            title="Add tab"
            aria-label="Add tab"
          >
            +
          </button>
        )}
      </div>

      <div className={s.spacer} />
      <button
        className={s.editBtn}
        onClick={onToggleEdit}
        aria-pressed={editing}
      >
        {editing ? "Done" : "Edit"}
      </button>
    </div>
  );
}
