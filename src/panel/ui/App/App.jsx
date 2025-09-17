import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBar from "../TopBar/TopBar.jsx";
import InputArea from "../InputArea/InputArea.jsx";
import s from "./App.module.css";

const K_COUNT = "qn:tabs:count";
const K_ACTIVE = "qn:tabs:active";
const K_NOTES = "qn:tabs:notes";

export default function App() {
  const [count, setCount] = useState(3);
  const [active, setActive] = useState(1);
  const [notes, setNotes] = useState({});
  const [value, setValue] = useState("");

  // Load all once
  useEffect(() => {
    chrome.storage.local.get([K_COUNT, K_ACTIVE, K_NOTES], (res) => {
      const c = Number(res[K_COUNT]) || 3;
      const a = Number(res[K_ACTIVE]) || 1;
      const n =
        res[K_NOTES] && typeof res[K_NOTES] === "object" ? res[K_NOTES] : {};
      setCount(Math.min(Math.max(c, 1), 9));
      setActive(a >= 1 && a <= 9 ? a : 1);
      setNotes(n);
      setValue(n[a] || "");
    });
  }, []);

  // When active tab changes, show its text + persist active
  useEffect(() => {
    setValue(notes[active] || "");
    chrome.storage.local.set({ [K_ACTIVE]: active });
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced save of notes object
  const saveTimer = useRef(null);
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      chrome.storage.local.set({ [K_NOTES]: notes });
      saveTimer.current = null;
    }, 250);
    return () => saveTimer.current && clearTimeout(saveTimer.current);
  }, [notes]);

  // Update notes for current tab when input changes
  const handleChange = (next) => {
    setValue(next);
    setNotes((prev) => ({ ...prev, [active]: next }));
  };

  // Add a tab (max 9), select it, persist count
  const handleAdd = () => {
    if (count >= 9) return;
    const nextCount = count + 1;
    setCount(nextCount);
    chrome.storage.local.set({ [K_COUNT]: nextCount });
    setActive(nextCount);
    // init empty text for new tab
    setNotes((prev) => ({ ...prev, [nextCount]: "" }));
  };

  return (
    <div className={s.wrap}>
      <TopBar
        count={count}
        active={active}
        onSelect={setActive}
        onAdd={handleAdd}
      />
      <div className={s.body}>
        <InputArea
          value={value}
          onChange={handleChange}
          placeholder="Type notes..."
        />
      </div>
    </div>
  );
}
