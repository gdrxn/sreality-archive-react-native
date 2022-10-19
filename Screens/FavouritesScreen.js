import {
	SafeAreaView,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { selectFavourites } from "../Stores/favouritesSlice";

const FavouritesScreen = () => {
	const navigation = useNavigation();
	const favourites = useSelector(selectFavourites);

	return (
		<SafeAreaView className="bg-white flex-1">
			<Text className="self-center text-lg font-medium mt-2">Favourites</Text>

			<FlatList
				className="mt-2"
				data={favourites}
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
		</SafeAreaView>
	);
};

export default FavouritesScreen;

const styles = StyleSheet.create({});
