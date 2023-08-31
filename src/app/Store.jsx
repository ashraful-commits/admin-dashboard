import DashboardSlice from "../features/DashboardSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    [DashboardSlice.reducerPath]: DashboardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(DashboardSlice.middleware),
  devTools: true,
});

export default store;
