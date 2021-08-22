import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscription: null,
  watchlist: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    addToWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
  },
});

export const { setSubscription, addToWatchlist, removeFromWatchlist } =
  appSlice.actions;

export const selectSubscription = (state) => state.app.subscription;
export const selectWatchlist = (state) => state.app.watchlist;

export default appSlice.reducer;
