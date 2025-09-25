import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage, // use localStorage
  whitelist: ["auth", "chat"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable for redux-persist compatibility
    }),
});

// Create persistor
export const persistor = persistStore(store);
