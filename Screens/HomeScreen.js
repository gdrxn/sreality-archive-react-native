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

	const [modalVisible, setModalVisible] = useState(false);
	const [sortType, setSortType] = useState("date-asc");
	const [searchTerm, setSearchTerm] = useState("");
	const page = useRef(1);
	const productsLength = useRef(null);
	const updated = useRef(0);
	const [isLoading, setIsLoading] = useState(true);

	function getProducts() {
		if (products.length === productsLength.current) return;
		const host =
			Platform.OS === "android"
				? "http://10.0.2.2:3000"
				: "http://127.0.0.1:3000";

		axios({
			method: "get",
			url: `${host}/api/user/products?limit=9&page=${page.current}&term=${searchTerm}&sort=${sortType}`,
			withCredentials: true,
		})
			.then((res) => {
				productsLength.current = res.data.productsLength;

				if (page.current === 1) {
					setProducts(res.data.currentProducts);
				} else {
					setProducts([...products, ...res.data.currentProducts]);
				}

				setIsLoading(false);
				page.current++;
			})
			.catch((err) => {
				console.log(err);
			});
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
				setSortType={setSortType}
				updated={updated}
				page={page}
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
								page.current = 1;
								setIsLoading(true);
								getProducts();
							}}
						/>
					</View>
					{searchTerm && (
						<TouchableOpacity
							className="pr-1.5 "
							onPress={() => {
								setSearchTerm("");
								setSortType("date-asc");
								page.current = 1;
								productsLength.current = null;
								setIsLoading(true);
								updated.current++;
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
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item._id}
				/>
			)}
		</SafeAreaView>
	);
};

export default HomeScreen;
