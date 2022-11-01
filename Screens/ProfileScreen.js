import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { selectAuth, unsetUser } from "../Stores/authSlice";

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectAuth);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Text className="self-center text-lg font-medium mt-2">Favourites</Text>

			<TouchableOpacity
				className="absolute top-3 right-3"
				onPress={() => {
					dispatch(unsetUser());
				}}
			>
				<Ionicons name="exit-outline" size={30} color="black" />
			</TouchableOpacity>
			<View className="items-center mt-10">
				<MaterialCommunityIcons
					name="account-circle-outline"
					size={100}
					color="black"
				/>
				<Text className="text-xl mt-1">{user.email}</Text>
			</View>
		</SafeAreaView>
	);
};

export default ProfileScreen;
