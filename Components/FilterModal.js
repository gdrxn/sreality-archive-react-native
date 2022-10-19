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
	setSortType,
	updated,
	page,
}) => {
	const [originalValue, setOriginalValue] = useState(sortType);

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
							setOriginalValue(sortType);
							setModalVisible(false);
						}}
					>
						<Text className="text-xl ml-4">Back</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							setOriginalValue(originalValue);
							setSortType(originalValue);
							setModalVisible(false);
							page.current = 1;
							updated.current++;
						}}
					>
						<Text className="text-xl mr-4">Save</Text>
					</TouchableOpacity>
				</View>
				<View className="w-11/12 self-center mt-7 border-gray-100 border">
					<Picker
						selectedValue={originalValue}
						onValueChange={(itemValue) => setOriginalValue(itemValue)}
					>
						<Picker.Item label="Newest" value="date-asc" />
						<Picker.Item label="Oldest" value="date-desc" />
						<Picker.Item label="Price Ascending" value="price-asc" />
						<Picker.Item label="Price Descending" value="price-desc" />
					</Picker>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

export default FilterModal;
