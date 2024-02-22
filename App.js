import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./Screens/MainScreen";
import { ContextProvider } from "./Context/Context";
import SongModalComponent from "./Components/SongModalComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./Screens/SearchScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="main"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="main" component={MainScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
