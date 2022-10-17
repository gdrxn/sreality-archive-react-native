import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../Stores/searchHistorySlice";
import { useState } from "react";

import { selectSearchHistory } from "../Stores/searchHistorySlice";

const SearchScreen = () => {
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState("");

	function saveSearchValue() {
		dispatch(add(searchValue));
		setSearchValue("");
	}

	const searcHistory = useSelector(selectSearchHistory);

	return (
		<SafeAreaView className="bg-white flex-1">
			<View className="flex-row items-center bg-gray-100 rounded-xl border border-gray-200 w-11/12 self-center">
				<View className="pt-0.5 pl-1.5">
					<Ionicons
						name="search-outline"
						className=""
						size={28}
						color="black"
					/>
				</View>
				<TextInput
					className="pb-1 pl-1 text-base"
					onChangeText={setSearchValue}
					value={searchValue}
					placeholder="Search"
					onSubmitEditing={() => {
						saveSearchValue();
					}}
				/>
			</View>

			<FlatList
				className="mt-1"
				data={searcHistory}
				renderItem={({ item }) => (
					<TouchableOpacity className="pl-5 py-3 border-b border-gray-100">
						<Text className="text-lg">{item}</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item, index) => item + index}
			/>
		</SafeAreaView>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({});
