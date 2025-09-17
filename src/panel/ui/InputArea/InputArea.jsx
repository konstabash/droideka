import React from "react";
import s from "./InputArea.module.css";

export default function InputArea({ value, onChange, placeholder }) {
  return (
    <div className={s.box}>
      <textarea
        className={s.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
