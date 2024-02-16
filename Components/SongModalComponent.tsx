import { useContext } from "react";
import {
  StatusBar,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../Context/Context";
import Icon from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import { brightGrey, greyColor } from "../Styles/GenericStyles";

export default function SongModalComponent({
  onCloseButtonPress,
}: {
  onCloseButtonPress: () => void;
}) {
  const { setCurrentPlayingTime, currentPlayingTime, currentSong } =
    useContext(AppContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        alignItems: "center",
        paddingHorizontal: 25,
        paddingTop: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => onCloseButtonPress()}>
          <Text style={{ fontSize: 18 }}>X</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Current song</Text>
        <Text style={{ fontSize: 18 }}>List</Text>
      </View>
      <View style={{ alignItems: "center", marginVertical: 30 }}>
        <Image
          source={require("../Data/Images/NoteImage.jpeg")}
          style={{
            height: 300,
            width: 300,
            borderRadius: 30,
            shadowColor: "black",
          }}
          resizeMode="contain"
        />
        <Text style={{ marginTop: 20, fontSize: 30, fontWeight: "600" }}>
          Song Name
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            color: greyColor,
            fontWeight: "500",
          }}
        >
          Artist
        </Text>
      </View>
      {/* Timeline bar */}
      <View style={{ minWidth: 350, marginTop: 10 }}>
        <View>
          <Slider
            maximumValue={currentSong.duration}
            style={{ height: 45 }}
            minimumTrackTintColor="black"
            maximumTrackTintColor="#000000"
            onSlidingComplete={(number) => setCurrentPlayingTime(number)}
          />
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginHorizontal: 10,
            }}
          >
            <Text>00:00</Text>
            <Text>{currentPlayingTime}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <TouchableOpacity>
            <Icon name="controller-jump-to-start" size={55} />
          </TouchableOpacity>

          <TouchableOpacity>
            <FontAwesome
              name="play-circle"
              size={85}
              color={"black"}
              style={{ marginHorizontal: 45 }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon name="controller-next" size={55} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
