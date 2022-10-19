import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import FavouritesScreen from "../Screens/FavouritesScreen";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

export default function HomeStack() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					if (route.name === "Home") {
						const iconName = focused ? "home" : "home-outline";
						return <Ionicons name={iconName} size={30} />;
					} else if (route.name === "Favourites") {
						const iconName = focused ? "heart" : "heart-outline";
						return <Ionicons name={iconName} size={30} />;
					} else if (route.name === "Profile") {
						const iconName = focused
							? "account-circle"
							: "account-circle-outline";
						return <MaterialCommunityIcons name={iconName} size={30} />;
					}

					// You can return any component that you like here!
				},
				tabBarActiveTintColor: "gray",
				tabBarInactiveTintColor: "gray",
				tabBarStyle: { paddingTop: Platform.OS === "ios" ? 8 : 0 },
				headerShown: false,
				tabBarShowLabel: false,
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Favourites" component={FavouritesScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
}
