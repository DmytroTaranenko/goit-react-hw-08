import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { contactsReducer } from "./contacts/slice";

import storage from "redux-persist/lib/storage";



import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { filterReducer } from "./filters/slice";


const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"]
};


export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: persistReducer(authConfig, authReducer),
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);