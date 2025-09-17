import React, { useState } from "react";
import TopBar from "../TopBar/TopBar.jsx";
import InputArea from "../InputArea/InputArea.jsx";
import s from "./App.module.css";

export default function App() {
  const [value, setValue] = useState("");
  return (
    <div className={s.wrap}>
      <TopBar />
      <div className={s.body}>
        <InputArea
          value={value}
          onChange={setValue}
          placeholder="Type notes..."
        />
      </div>
    </div>
  );
}
