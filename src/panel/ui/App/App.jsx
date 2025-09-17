import React, { useEffect, useRef, useState } from "react";
import TabsBar from "../TabsBar/TabsBar.jsx";
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
  const [editing, setEditing] = useState(false);

  // Load once
  useEffect(() => {
    chrome.storage.local.get([K_COUNT, K_ACTIVE, K_NOTES], (res) => {
      const c = Number(res[K_COUNT]) || 3;
      const a = Number(res[K_ACTIVE]) || 1;
      const n =
        res[K_NOTES] && typeof res[K_NOTES] === "object" ? res[K_NOTES] : {};
      const cClamped = Math.min(Math.max(c, 1), 9);
      const aClamped = a >= 1 && a <= cClamped ? a : 1;
      setCount(cClamped);
      setActive(aClamped);
      setNotes(n);
      setValue(n[aClamped] || "");
    });
  }, []);

  // Switch tab → reflect note + persist active
  useEffect(() => {
    setValue(notes[active] || "");
    chrome.storage.local.set({ [K_ACTIVE]: active });
  }, [active]);

  // Debounced save for notes
  const saveTimer = useRef(null);
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      chrome.storage.local.set({ [K_NOTES]: notes });
      saveTimer.current = null;
    }, 250);
    return () => saveTimer.current && clearTimeout(saveTimer.current);
  }, [notes]);

  // Input change for current tab
  const handleChange = (next) => {
    setValue(next);
    setNotes((prev) => ({ ...prev, [active]: next }));
  };

  const handleAdd = () => {
    if (count >= 9) return;
    const nextCount = count + 1;
    const nextNotes = { ...notes, [nextCount]: "" };

    setCount(nextCount);
    setNotes(nextNotes);
    setActive(nextCount);
    setValue("");

    chrome.storage.local.set({
      [K_COUNT]: nextCount,
      [K_ACTIVE]: nextCount,
      [K_NOTES]: nextNotes,
    });
  };

  // Delete specific tab n (edit mode behavior)
  const handleDelete = (n) => {
    if (count <= 1) return; // keep at least one

    // Reindex notes: pack down skipping n
    const newNotes = {};
    for (let i = 1, j = 1; i <= count; i++) {
      if (i === n) continue;
      newNotes[j] = notes[i] || "";
      j++;
    }

    const newCount = count - 1;
    let newActive = active;
    if (active === n) newActive = Math.min(n, newCount);
    else if (active > n) newActive = active - 1;

    setNotes(newNotes);
    setCount(newCount);
    setActive(newActive);
    setValue(newNotes[newActive] || "");

    chrome.storage.local.set({
      [K_NOTES]: newNotes,
      [K_COUNT]: newCount,
      [K_ACTIVE]: newActive,
    });
  };

  return (
    <div className={s.wrap}>
      <TabsBar
        count={count}
        active={active}
        editing={editing}
        onToggleEdit={() => setEditing((v) => !v)}
        onSelect={setActive}
        onDelete={handleDelete}
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
