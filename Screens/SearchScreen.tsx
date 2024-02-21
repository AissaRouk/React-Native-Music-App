import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import SearchBar from "../Components/SearchBar";
import { useContext, useState } from "react";
import { AppContext } from "../Context/Context";
import Icon from "react-native-vector-icons/Entypo";
import SongComponent from "../Components/SongComponent";
import { Song } from "../Types/Song";

export default function SearchScreen({ navigation }) {
  const { songList, setPlayingSong } = useContext(AppContext);

  const [searchResults, setSearchResults] = useState<readonly any[] | null>([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={25} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <SearchBar
          data={songList}
          mainContainerViewStyle={{ flex: 1 }}
          onSearchResultsChange={(results) => setSearchResults(results)}
          autofocus={true}
          fields={["title", "artist"]}
          idField={"id"}
          suggestionShown={false}
        />
      </View>
      {searchResults && (
        <ScrollView>
          {searchResults.map((item: Song) => (
            <SongComponent
              key={item.id}
              item={item}
              setCurrentSong={(song: Song) => setPlayingSong(song)}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 20,
  },
  cancelButton: {},
});
