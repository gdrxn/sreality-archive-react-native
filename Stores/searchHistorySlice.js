import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	history: [],
};

export const searchHistorySlice = createSlice({
	name: "searches",
	initialState,
	reducers: {
		add: (state, action) => {
			if (!state.history.includes(action.payload.trim())) {
				state.history.unshift(action.payload);
			}
		},
		remove: (state, action) => {
			state.history = state.history.filter((item) => item !== action.payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const { add, remove } = searchHistorySlice.actions;
export const selectSearchHistory = (state) => state.searches.history;

export default searchHistorySlice.reducer;
