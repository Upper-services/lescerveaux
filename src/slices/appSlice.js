import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscription: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { setSubscription } = appSlice.actions;

export const selectSubscription = (state) => state.app.subscription;

export default appSlice.reducer;
