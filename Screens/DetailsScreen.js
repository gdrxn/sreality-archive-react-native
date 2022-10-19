import {
	Text,
	View,
	Image,
	ScrollView,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { selectFavourites, add, remove } from "../Stores/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";

const DetailsScreen = () => {
	const route = useRoute();
	const item = route.params;

	const dispatch = useDispatch();
	const favourites = useSelector(selectFavourites);
	const [isLiked, setIsLiked] = useState(
		!!favourites.find((favourite) => favourite._id === item._id)
	);

	function toggleLike() {
		if (isLiked) {
			dispatch(remove(item));
		} else {
			dispatch(add(item));
		}

		setIsLiked(!isLiked);
	}

	return (
		<View className="flex">
			<ScrollView>
				<View className="relative">
					<FlatList
						horizontal
						data={item.images}
						renderItem={(image) => (
							<Image className="w-screen h-72" source={{ uri: image.item }} />
						)}
					/>
					<TouchableOpacity
						className="absolute bottom-2 right-2.5"
						onPress={() => {
							toggleLike();
						}}
					>
						{isLiked ? (
							<Ionicons name="heart" size={35} color="red" />
						) : (
							<Ionicons name="heart-outline" size={35} />
						)}
					</TouchableOpacity>
				</View>

				<Text className="ml-3.5 mt-3 text-lg">{item?.name}</Text>
				<Text className="ml-3.5 text-lg">{item?.location}</Text>
				<Text className="ml-3.5 text-lg">
					{item && `${item.price.toLocaleString()} Kč`}
				</Text>

				<Text className="px-3.5 mt-2 text-base">{item?.description}</Text>

				<View className="ml-3.5 mt-3 mb-9">
					{item?.parameters.split(" | ").map((param) => {
						return (
							<Text className="text-base" key={param}>
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
