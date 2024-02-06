import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import mockupSongs from "../Data/mockupSongs";
import formatDuration from "../Utils/formatDuration";
import Icon from "react-native-vector-icons/Entypo";
import SearchBar from "../Components/SearchBar";

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {mockupSongs.map((item) => (
          <TouchableOpacity style={styles.songContainer} key={item.id}>
            <View style={styles.songDetails}>
              <Image
                source={require("../Data/Images/NoteImage.jpeg")}
                resizeMode="contain"
                style={styles.songImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.songSpecs}>
                  <Text style={styles.artist}>{item.artist}</Text>
                  <Text> · </Text>
                  <Text style={styles.duration}>
                    {formatDuration(item.duration)}
                  </Text>
                </View>
              </View>
            </View>
            <Icon
              name="dots-three-horizontal"
              size={18}
              color="grey"
              style={styles.icon}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  songDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  songImage: {
    height: 50,
    width: 50,
    borderRadius: 9,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontWeight: "600",
    marginBottom: 3,
  },
  songSpecs: {
    flexDirection: "row",
  },
  artist: {},
  duration: {},
  icon: {
    marginLeft: 10,
  },
});

export default MainScreen;
