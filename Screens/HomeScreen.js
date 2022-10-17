import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";

const HomeScreen = () => {
	const navigation = useNavigation();

	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios({
			method: "get",
			url: "http://127.0.0.1:3000/api/user/products",
			withCredentials: true,
		})
			.then((res) => {
				setProducts(res.data.currentProducts);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<SafeAreaView className="bg-white flex-1">
			<FlatList
				data={products}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="py-8 border-b border-b-gray-100"
						onPress={() => {
							navigation.navigate("DetailsScreen", { productId: item._id });
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
