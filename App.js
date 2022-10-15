import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailsScreen from "./Screens/DetailsScreen";
import LoginScreen from "./Screens/LoginScreen";
import HomeStack from "./Navigation/HomeStack";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="HomeStack"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="HomeStack" component={HomeStack} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="DetailsScreen" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
