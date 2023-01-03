import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { list } from "../api/amplifyApi";

export const fetchAllData = createAsyncThunk("app/fetchAllData", async () => {
  const result = await list();
  return result;
});

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllData.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default appSlice.reducer;
