import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TabsBar from "../TabsBar/TabsBar.jsx";
import InputArea from "../InputArea/InputArea.jsx";
import s from "./App.module.css";

import {
  selectTabsCount,
  selectActiveTab,
} from "../../../redux/settings/selectors";
import { setActiveTab } from "../../../redux/settings/slice";
import { setNoteForTab } from "../../../redux/notes/slice";

export default function App() {
  const dispatch = useDispatch();
  const count = useSelector(selectTabsCount);
  const active = useSelector(selectActiveTab);
  const notesByTab = useSelector((state) => state.notes.byTab || {});
  const value = notesByTab[active] || "";

  const handleSelect = (n) => dispatch(setActiveTab(n));
  const handleChange = (next) =>
    dispatch(setNoteForTab({ tab: active, text: next }));

  return (
    <div className={s.wrap}>
      <TabsBar count={count} active={active} onSelect={handleSelect} />
      <div className={s.body}>
        <InputArea
          value={value}
          onChange={handleChange}
          placeholder={`Type notes...`}
        />
      </div>
    </div>
  );
}
