import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchHistorySlice from "./Stores/searchHistorySlice";
import authSlice from "./Stores/authSlice";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
	key: "root",
	version: 1,
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	searches: searchHistorySlice,
	auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export default store;
