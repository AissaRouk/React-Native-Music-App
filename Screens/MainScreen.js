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
import Icon from "react-native-vector-icons/Entypo";

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
          <View style={styles.songContainer} key={item.id}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../Data/Images/NoteImage.jpeg")}
                resizeMode="contain"
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 9,
                }}
              />
              <View
                style={{
                  marginHorizontal: 10,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: "600", marginBottom: 3 }}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text>
                    {item.artist} - {formatDuration(item.duration)}
                  </Text>
                </View>
              </View>
            </View>
            <Icon
              name="dots-three-horizontal"
              size={18}
              color={"grey"}
              style={{ marginHorizontal: 10 }}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight || 0,
  },
  //song container styles
  songContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 80,
    width: width * 0.9,
  },
});
