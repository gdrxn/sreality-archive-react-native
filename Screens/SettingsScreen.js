import { SafeAreaView, Text, TouchableOpacity } from "react-native";

import { useDispatch } from "react-redux";
import { unsetUser } from "../Stores/authSlice";

const SettingsScreen = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView>
			<TouchableOpacity
				onPress={() => {
					dispatch(unsetUser());
				}}
			>
				<Text>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default SettingsScreen;
