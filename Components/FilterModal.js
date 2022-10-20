import {
	Text,
	View,
	Modal,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const FilterModal = ({
	modalVisible,
	setModalVisible,
	sortType,
	saveSortType,
}) => {
	const [originalValue, setOriginalValue] = useState(sortType);

	function save() {
		setOriginalValue(originalValue);
		saveSortType(originalValue);
	}

	function goBack() {
		setOriginalValue(sortType);
		setModalVisible(false);
	}

	return (
		<Modal
			visible={modalVisible}
			animationType="slide"
			onRequestClose={() => {
				setModalVisible(false);
			}}
		>
			<SafeAreaView>
				<View className="flex-row justify-between mt-4">
					<TouchableOpacity
						onPress={() => {
							goBack();
						}}
					>
						<Text className="text-xl ml-4">Back</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							save();
						}}
					>
						<Text className="text-xl mr-4">Save</Text>
					</TouchableOpacity>
				</View>
				<View className="mt-7 space-y-2">
					<Text className="ml-5 text-lg font-medium">Sort</Text>
					<View className="w-11/12 self-center  border-gray-100 border">
						<Picker
							selectedValue={originalValue}
							onValueChange={(itemValue) => setOriginalValue(itemValue)}
						>
							<Picker.Item label="Newest" value="date-asc" />
							<Picker.Item label="Oldest" value="date-desc" />
							<Picker.Item label="Lowest price" value="price-asc" />
							<Picker.Item label="Highest price" value="price-desc" />
						</Picker>
					</View>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

export default FilterModal;
