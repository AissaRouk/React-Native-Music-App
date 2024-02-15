import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Song } from "../Types/Song";
import { Alert } from "react-native";

// Context prop types
interface ContextProps {
  currentSong: Song | undefined;
  setPlayingSong: (song: Song) => void;
}

// Define the context
export const AppContext = createContext<ContextProps>({
  currentSong: undefined,
  setPlayingSong: () => {},
});

// Define the ContextProvider component
export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | undefined>();

  // Load the last played song from AsyncStorage on component mount
  useEffect(() => {
    const loadLastPlayedSong = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("lastPlayedSong");
        if (jsonValue !== null) {
          const lastPlayedSong: Song = JSON.parse(jsonValue);
          setCurrentSong(lastPlayedSong);
        }
      } catch (error) {
        console.error("Error loading last played song: ", error);
      }
    };

    loadLastPlayedSong();
  }, []); // Empty dependency array to run once on component mount

  // Function to set the current playing song
  const setPlayingSong = async (song: Song) => {
    // Don't save if the song is already saved
    if (currentSong == song) return;
    setCurrentSong(song);
    try {
      await AsyncStorage.setItem("lastPlayedSong", JSON.stringify(song)).then(
        () => {
          Alert.alert("Song " + song.title + " saved");
        }
      );
    } catch (error) {
      console.error("Error saving last played song: ", error);
    }
  };

  // Context value containing the current playing song and function to set it
  const contextValue: ContextProps = {
    currentSong,
    setPlayingSong,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
