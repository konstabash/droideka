import React from "react";
import s from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={s.bar}>
      <div className={s.title}>Quick Notes</div>
      <div className={s.actions}>{/* future menu/actions */}</div>
    </div>
  );
}
