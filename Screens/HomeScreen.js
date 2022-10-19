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
	Pressable,
	StatusBar,
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

		axios({
			method: "get",
			url: `http://127.0.0.1:3000/api/user/products?limit=9&page=${page.current}&term=${searchTerm}`,
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
			/>
			<View className="flex-row justify-evenly">
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
						<Pressable
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
						</Pressable>
					)}
				</View>
				<Pressable
					className="w-1/12"
					onPress={() => {
						setModalVisible(true);
					}}
				>
					<Octicons name="sort-desc" size={28} color="black" />
				</Pressable>
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
							className="py-8 border-b border-b-gray-100"
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
