import { combineReducers, configureStore } from "@reduxjs/toolkit";
import session from "redux-persist/lib/storage/session";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { userReducer } from "./features/userSlice";
import { bannerReducer } from "./features/bannerSlice";
import { categoryReducer } from "./features/categorySlice";
import { productReducer } from "./features/productSlice";
import { cartReducer } from "./features/cartSlice";

const persistConfig = {
  key: "root",
  storage: session,
  whitelist: ["users"],
};

const rootReducer = combineReducers({
  users: userReducer,
  banners: bannerReducer,
  categories: categoryReducer,
  products: productReducer,
  carts: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
