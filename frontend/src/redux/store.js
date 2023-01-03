import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import inventoryReducer from "./inventorySlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    inventory: inventoryReducer,
  },
});
