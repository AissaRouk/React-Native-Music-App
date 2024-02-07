import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Song } from "../Types/Song";
import formatDuration from "../Utils/formatDuration";

const blackTheme = "#171C26";
const greyColor = "#A4AAB7";

interface SongComponentProps {
  item: Song;
  setCurrentSong: (item: Song | null) => void;
}

export default function SongComponent({
  item,
  setCurrentSong,
}: SongComponentProps) {
  return (
    <TouchableOpacity
      style={styles.songContainer}
      key={item.id}
      onPress={() => {
        setCurrentSong(item);
      }}
    >
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
            <Text style={styles.duration}>{formatDuration(item.duration)}</Text>
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
  );
}

const styles = StyleSheet.create({
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
  artist: {
    color: greyColor,
  },
  duration: { color: greyColor },
  icon: {
    marginLeft: 10,
  },
});
