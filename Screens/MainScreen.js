import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
import mockupSongs from "../Data/mockupSongs";
import formatDuration from "../Utils/formatDuration";

const { height, width } = Dimensions.get("window");

export default function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Header</Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          borderColor: "black",
          borderWidth: 1,
          width: width,
        }}
      >
        {mockupSongs.map((item) => (
          <View style={styles.songContainer}>
            <Image source={require("../Data/Images/NoteImage.jpeg")} />
            <Text>{item.title}</Text>
            <Text>{item.artist}</Text>
            <Text>{formatDuration(item.duration)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight || 0,
  },
  //song container styles
  songContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
