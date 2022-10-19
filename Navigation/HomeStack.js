import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../Screens/HomeScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import FavouritesScreen from "../Screens/FavouritesScreen";

const Tab = createBottomTabNavigator();

export default function HomeStack() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Favourites") {
						iconName = focused ? "heart" : "heart-outline";
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={30} />;
				},
				tabBarActiveTintColor: "gray",
				tabBarInactiveTintColor: "gray",
				tabBarStyle: { paddingTop: 8 },
				headerShown: false,
				tabBarShowLabel: false,
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Favourites" component={FavouritesScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
}
