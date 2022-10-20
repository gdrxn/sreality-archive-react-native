import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import {
	ActivityIndicator,
	TextInput,
	Text,
	FlatList,
	TouchableOpacity,
	SafeAreaView,
	View,
	StatusBar,
	Platform,
} from "react-native";
import axios from "axios";

import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import FilterModal from "../Components/FilterModal";

const HomeScreen = () => {
	const navigation = useNavigation();

	const [products, setProducts] = useState([]);
	const [sortType, setSortType] = useState("date-desc");
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isPending, setIsPending] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const page = useRef(1);
	const productsLength = useRef(null);
	const updated = useRef(0);

	function getProducts() {
		if (products.length === productsLength.current || isPending) return;

		const host =
			Platform.OS === "android"
				? "http://10.0.2.2:3000"
				: "http://127.0.0.1:3000";

		setIsPending(true);

		axios({
			method: "get",
			url: `${host}/api/user/products?limit=20&page=${page.current}&term=${searchTerm}&sort=${sortType}`,
			withCredentials: true,
		})
			.then((res) => {
				productsLength.current = res.data.productsLength;
				setProducts((current) => [...current, ...res.data.currentProducts]);
				setIsLoading(false);
				setIsPending(false);
				page.current++;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function search() {
		setIsLoading(true);

		setSortType("date-desc");
		setProducts([]);
		productsLength.current = null;
		page.current = 1;

		updated.current++;
	}

	function closeSearch() {
		setIsLoading(true);

		setSearchTerm("");
		setSortType("date-desc");
		setProducts([]);
		productsLength.current = null;
		page.current = 1;

		updated.current++;
	}

	function saveSortType(type) {
		setModalVisible(false);
		setIsLoading(true);

		setSortType(type);
		setProducts([]);
		productsLength.current = null;
		page.current = 1;

		updated.current++;
	}

	useEffect(() => {
		getProducts();
	}, [updated.current]);

	return (
		<SafeAreaView className="bg-white flex-1">
			<StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
			<FilterModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				sortType={sortType}
				saveSortType={saveSortType}
			/>
			<View className="flex-row justify-evenly mt-3">
				<View className="flex-row items-center justify-between bg-gray-100 rounded-xl border border-gray-200 w-9/12">
					<View className="flex-row">
						<View className="pt-0.5 pl-1.5">
							<Ionicons name="search-outline" size={28} color="black" />
						</View>
						<TextInput
							className="pb-1 pl-1 text-base"
							onChangeText={setSearchTerm}
							value={searchTerm}
							placeholder="Search"
							onSubmitEditing={() => {
								search();
							}}
						/>
					</View>
					{searchTerm && (
						<TouchableOpacity
							className="pr-1.5"
							onPress={() => {
								closeSearch();
							}}
						>
							<Ionicons name="close-outline" size={24} color="black" />
						</TouchableOpacity>
					)}
				</View>
				<TouchableOpacity
					className="w-1/12"
					onPress={() => {
						setModalVisible(true);
					}}
				>
					<Octicons name="sort-desc" size={28} color="black" />
				</TouchableOpacity>
			</View>
			{isLoading ? (
				<ActivityIndicator size="large" className="m-auto" color={"#C8C8C8"} />
			) : (
				<FlatList
					className="mt-2"
					onEndReachedThreshold={0.5}
					onEndReached={getProducts}
					data={products}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="py-8 border-b border-b-gray-100 px-1.5"
							onPress={() => {
								navigation.navigate("Details", item);
							}}
						>
							<Text className="text-center text-base">{item.name}</Text>
							<Text className="text-center text-base">{item.location}</Text>
							<Text className="text-center text-base">
								{item.price && `${item.price} Kč`}
							</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item._id}
				/>
			)}
		</SafeAreaView>
	);
};

export default HomeScreen;
