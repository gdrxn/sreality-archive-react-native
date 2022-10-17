import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import DetailsScreen from "../Screens/DetailsScreen";
import LoginScreen from "../Screens/LoginScreen";
import HomeStack from "./HomeStack";
import { selectAuth } from "../Stores/authSlice";

const Stack = createNativeStackNavigator();

export default function Navigation() {
	const isAuth = useSelector(selectAuth);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Menu"
				screenOptions={{ headerShown: false }}
			>
				{isAuth ? (
					<>
						<Stack.Screen name="Menu" component={HomeStack} />
						<Stack.Screen name="Details" component={DetailsScreen} />
					</>
				) : (
					<Stack.Screen name="Login" component={LoginScreen} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
