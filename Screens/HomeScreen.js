import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";

const HomeScreen = () => {
	const navigation = useNavigation();

	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [productsLength, setProductsLength] = useState(null);

	function getProducts() {
		if (products.length === productsLength) return;

		axios({
			method: "get",
			url: `http://127.0.0.1:3000/api/user/products?page=${page}`,
			withCredentials: true,
		})
			.then((res) => {
				setProducts([...products, ...res.data.currentProducts]);
				setProductsLength(res.data.productsLength);
				setPage(page + 1);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<SafeAreaView className="bg-white flex-1">
			<FlatList
				onEndReachedThreshold={0.5}
				onEndReached={getProducts}
				data={products}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="py-8 border-b border-b-gray-100"
						onPress={() => {
							navigation.navigate("Details", { productId: item._id });
						}}
					>
						<Text className="text-center text-base">{item.name}</Text>
						<Text className="text-center text-base">{item.location}</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item._id}
			/>
		</SafeAreaView>
	);
};

export default HomeScreen;
