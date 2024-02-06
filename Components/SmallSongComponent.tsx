import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Song } from "../Types/Song";

const blackTheme = "#171C26";
const greyColor = "#A4AAB7";

interface SmallSongComponentProps {
  currentSong: Song;
}

export default function SmallSongComponent({
  currentSong,
}: SmallSongComponentProps) {
  return (
    <View style={styles.smallView}>
      <Image
        source={require("../Data/Images/NoteImage.jpeg")}
        style={styles.smallViewImage}
        resizeMode="contain"
      />
      <View>
        <Text style={{ color: "#FFFF" }}>{currentSong.title}</Text>
        <Text style={{ color: greyColor }}>{currentSong.artist}</Text>
      </View>
      {/* Play/Pause button */}
      <View
        style={{
          position: "absolute",
          right: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          name="heart-outlined"
          size={25}
          style={{ marginRight: 15 }}
          color={"#FFFF"}
          onPress={() => {}}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#FFFF",
            borderRadius: 5,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="controller-play"
            size={25}
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
