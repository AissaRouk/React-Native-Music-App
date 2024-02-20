import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./Screens/MainScreen";
import { ContextProvider } from "./Context/Context";
import SongModalComponent from "./Components/SongModalComponent";

export default function App() {
  return (
    <ContextProvider>
      <StatusBar />
      <MainScreen />
    </ContextProvider>
  );
}
