import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchAllData } from "./appSlice";
import { save } from "../api/amplifyApi";

const inventoryAdapter = createEntityAdapter();

export const saveInventory = createAsyncThunk(
  "inventory/saveInventory",
  async (data) => {
    return await save(data);
  }
);

const initialState = inventoryAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllData.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        const data = action.payload.filter((item) => item.type.indexOf("INV#") > -1);
        inventoryAdapter.upsertMany(state, data);
        state.status = "succeeded";
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.status = "failed";
      });
    builder
      .addCase(saveInventory.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(saveInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const data = action.payload;

        inventoryAdapter.upsertOne(state, data);
      })
      .addCase(saveInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = inventorySlice.actions;

export default inventorySlice.reducer;

export const selectItemsByCategoryId = (state, id) => {
	return Object.values(state.inventory.entities).filter(
    (item) => item.categoryId === id
  );
}

export const { selectAll: selectAllInventory, selectById: selectInventoryById } =
  inventoryAdapter.getSelectors((state) => state.inventory);
