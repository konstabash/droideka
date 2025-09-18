import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import settings from "./settings/slice";
import notes from "./notes/slice";
import { chromeLocalStorage, chromeSyncStorage } from "./chromeStorage";

const settingsPersistConfig = {
  key: "qn:settings",
  version: 1,
  storage: chromeSyncStorage,
  whitelist: ["tabsCount", "activeTab", "fontSize", "theme"],
};

const notesPersistConfig = {
  key: "qn:notes",
  version: 1,
  storage: chromeLocalStorage,
  whitelist: ["byTab"],
};

const rootReducer = combineReducers({
  settings: persistReducer(settingsPersistConfig, settings),
  notes: persistReducer(notesPersistConfig, notes),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
