import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byTab: {},
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNoteForTab(state, action) {
      const { tab, text } = action.payload;
      state.byTab[tab] = text;
    },
    addEmptyTab(state, action) {
      const tab = Number(action.payload);
      if (!state.byTab[tab]) state.byTab[tab] = "";
    },
    removeTabAndReindex(state, action) {
      const removed = Number(action.payload);
      const next = {};
      let j = 1;
      const keys = Object.keys(state.byTab)
        .map((k) => Number(k))
        .sort((a, b) => a - b);
      for (const k of keys) {
        if (k === removed) continue;
        next[j] = state.byTab[k] || "";
        j++;
      }
      state.byTab = next;
    },
    clearAll(state) {
      state.byTab = {};
    },
  },
});

export const { setNoteForTab, addEmptyTab, removeTabAndReindex, clearAll } =
  notesSlice.actions;
export default notesSlice.reducer;
