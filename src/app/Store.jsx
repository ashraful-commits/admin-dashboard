// Import the DashboardSlice, which includes reducer and middleware.
import DashboardSlice from "../features/DashboardSlice";

// Import necessary functions from Redux Toolkit for store configuration.
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// Configure and create the Redux store.
const store = configureStore({
  reducer: {
    // Define the reducer for the DashboardSlice under its specific reducerPath.
    [DashboardSlice.reducerPath]: DashboardSlice.reducer,
  },
  // Configure middleware for the store, combining default middleware with the DashboardSlice middleware.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(DashboardSlice.middleware),
  // Enable Redux DevTools for development purposes.
  devTools: true,
});

// Export the configured store for use in the application.
export default store;
