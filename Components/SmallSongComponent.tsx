import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Song } from "../Types/Song";
import { AppContext } from "../Context/Context";
import { useContext } from "react";

const blackTheme = "#171C26";
const greyColor = "#A4AAB7";

interface SmallSongComponentProps {
  currentSong: Song;
  onComponentPress: () => void;
}

export default function SmallSongComponent({
  currentSong,
  onComponentPress,
}: SmallSongComponentProps) {
  const { play, isPlaying, pause, likeToggle } = useContext(AppContext);

  return (
    <View style={styles.smallView}>
      <Image
        source={require("../Data/Images/NoteImage.jpeg")}
        style={styles.smallViewImage}
        resizeMode="contain"
      />
      <TouchableOpacity style={{ flex: 1 }} onPress={() => onComponentPress()}>
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
          <TouchableOpacity
            onPress={() => {
              likeToggle(currentSong), console.log("clicked!!");
            }}
            style={{
              marginRight: 10,
              padding: 5,
            }}
          >
            <Icon
              name={currentSong.like ? "heart" : "heart-outlined"}
              size={25}
              color={"#FFFF"}
            />
          </TouchableOpacity>

          {!isPlaying ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFF",
                borderRadius: 5,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => play()}
            >
              <Icon
                name="controller-play"
                size={25}
                style={{ marginHorizontal: 5 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFF",
                borderRadius: 5,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => pause()}
            >
              <Icon
                name="controller-paus"
                size={25}
                style={{ marginHorizontal: 5 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
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
