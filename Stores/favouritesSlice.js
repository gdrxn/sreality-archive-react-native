import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	list: [],
};

export const favouritesSlice = createSlice({
	name: "favourites",
	initialState,
	reducers: {
		add: (state, action) => {
			state.list.unshift(action.payload);
		},
		remove: (state, action) => {
			state.list = state.list.filter((item) => item._id !== action.payload._id);
		},
	},
});

// Action creators are generated for each case reducer function
export const { add, remove } = favouritesSlice.actions;

export const selectFavourites = (state) => state.favourites.list;

export default favouritesSlice.reducer;
