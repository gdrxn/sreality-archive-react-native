import { Provider } from "react-redux";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import RootNavigation from "./Navigation/RootNavigation";

const persistor = persistStore(store);

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RootNavigation />
			</PersistGate>
		</Provider>
	);
}
