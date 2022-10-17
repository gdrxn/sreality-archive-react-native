import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { setUser } from "../Stores/authSlice";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function login() {
		axios({
			method: "post",
			url: "http://127.0.0.1:3000/api/auth/login",
			data: {
				email: email,
				password: password,
			},
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			withCredentials: true,
		})
			.then((res) => {
				if (res.status == 200) {
					dispatch(setUser(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<SafeAreaView className="flex-1 items-center justify-center ">
			<View className="border border-gray-200 rounded-lg w-1/2 px-5 py-8">
				<Text className="text-center text-xl mb-4">Welcome!</Text>
				<TextInput
					className="border-2 border-gray-200  rounded-lg pl-2.5 text-lg py-0.5"
					placeholder="Email"
					onChangeText={setEmail}
					value={email}
				/>
				<TextInput
					className="border-2 border-gray-200 rounded-lg pl-2.5 text-lg py-0.5 mt-4"
					placeholder="Password"
					onChangeText={setPassword}
					value={password}
				/>
				<TouchableOpacity onPress={login}>
					<Text className="text-center text-lg mt-5 bg-blue-400 rounded-xl py-1">
						Log in
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;
