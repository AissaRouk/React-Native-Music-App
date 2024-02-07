import React, { useState } from "react";
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
import { Song } from "../Types/Song";
import SongComponent from "../Components/SongComponent";
import SmallSongComponent from "../Components/SmallSongComponent";

const blackTheme = "#171C26";
const greyColor = "#A4AAB7";

const MainScreen = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>();

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar data={[]} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {mockupSongs.map((item: Song) => (
          <SongComponent
            item={item}
            setCurrentSong={(item) => setCurrentSong(item)}
          />
        ))}
      </ScrollView>
      {/* Current song View */}
      {currentSong && <SmallSongComponent currentSong={currentSong} />}
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

  smallView: {
    height: 80,
    backgroundColor: blackTheme,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderColor: "black",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  smallViewImage: {
    height: "100%",
    width: 80,
    left: 0,
    borderRadius: 9,
    marginRight: 10, // Add margin to separate image from text
  },
  smallViewText: {
    color: "white",
  },
});

export default MainScreen;
