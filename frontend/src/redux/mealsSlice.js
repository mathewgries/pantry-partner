import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = mealsSlice.actions;

export default mealsSlice.reducer;
