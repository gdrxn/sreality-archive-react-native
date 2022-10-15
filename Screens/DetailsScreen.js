import { Text, View, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

const DetailsScreen = () => {
	const route = useRoute();
	const [details, setDetails] = useState(null);

	const { productId } = route.params;

	useEffect(() => {
		console.log("ran");
		fetch("http://127.0.0.1:3000/api/user/product/" + productId, {
			credentials: "include",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setDetails(data.result);
			})
			.catch((err) => {
				console.log(1, err);
			});
	}, []);

	return (
		<View className="flex">
			<ScrollView>
				<Image className="w-full h-72" source={{ uri: details?.images[0] }} />
				<Text className="ml-3.5 mt-4 text-base">{details?.name}</Text>
				<Text className="ml-3.5 mt-0.5  text-base">{details?.location}</Text>
				<Text className="ml-3.5 mt-0.5 text-base">
					{details && `${details.price} Kč`}
				</Text>

				<Text className="px-3.5 mt-2 text-sm self-center">
					{details?.description}
				</Text>
				{/* <Text className="px-2 mt-2 text-base self-center">
					{parameters.value}
				</Text> */}
				<View className="ml-3.5 mt-3 mb-8">
					{details?.parameters.split(" | ").map((param) => {
						return (
							<Text className="text-sm" key={param}>
								{param}
							</Text>
						);
					})}
				</View>
			</ScrollView>
		</View>
	);
};

export default DetailsScreen;
