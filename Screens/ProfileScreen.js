import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { selectAuth, unsetUser } from "../Stores/authSlice";

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectAuth);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<TouchableOpacity
				className="mt-4 mr-3 self-end"
				onPress={() => {
					dispatch(unsetUser());
				}}
			>
				<Text className="text-xl">Logout</Text>
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
