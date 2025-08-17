import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookMarkReducer from "./bmSlice";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";



const rootReducer = combineReducers({
  bookMark: bookMarkReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  // You can whitelist or blacklist specific slices here if needed
  // whitelist: ['cart'] // Only persist cart
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Very important for redux-persist
    }),
})

export const persistor = persistStore(store)



