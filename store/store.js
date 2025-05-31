"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice, apiMiddleware } from "./slices/api/apiSlice";
import {
  owleryApiSlice,
  owleryApiMiddleware,
} from "./slices/api/owleryApiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [], // Add any reducers you want to persist here
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [owleryApiSlice.reducerPath]: owleryApiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiMiddleware,
      owleryApiMiddleware
    ),
});

export const persistor = persistStore(store);
