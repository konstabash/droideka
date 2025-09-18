import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabsCount: 5,
  activeTab: 1,
  fontSize: 14,
  theme: "light", // "light" | "dark" (extend later)
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTabsCount(state, action) {
      const n = Math.max(1, Math.min(9, Number(action.payload) || 1));
      state.tabsCount = n;
      if (state.activeTab > n) state.activeTab = n;
    },
    setActiveTab(state, action) {
      const n = Math.max(1, Math.min(9, Number(action.payload) || 1));
      state.activeTab = n;
    },
    setFontSize(state, action) {
      const n = Math.max(10, Math.min(24, Number(action.payload) || 14));
      state.fontSize = n;
    },
    setTheme(state, action) {
      state.theme = action.payload === "dark" ? "dark" : "light";
    },
  },
});

export const { setTabsCount, setActiveTab, setFontSize, setTheme } =
  settingsSlice.actions;
export default settingsSlice.reducer;
