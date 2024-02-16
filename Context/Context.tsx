import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Song } from "../Types/Song";

// Context prop types
interface ContextProps {
  currentSong: Song | undefined;
  setPlayingSong: (song: Song) => void;
  currentPlayingTime: number;
  setCurrentPlayingTime: (number: number) => void;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  setIsPlaying: (bool: boolean) => void;
}

// Define the context
export const AppContext = createContext<ContextProps>({
  currentSong: undefined,
  setPlayingSong: () => {},
  setCurrentPlayingTime: () => {},
  currentPlayingTime: undefined,
  play: () => {},
  pause: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
});

// Define the ContextProvider component
export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | undefined>();
  const [currentPlayingTime, setCurrentPlayingTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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

  useEffect(() => {
    if (isPlaying)
      setTimeout(() => setCurrentPlayingTime(currentPlayingTime + 1), 1000);
  }, [isPlaying]);

  // Function to set the current playing song
  const setPlayingSong = async (song: Song) => {
    // Don't save if the song is already saved
    if (currentSong == song) return;
    setCurrentSong(song);
    try {
      await AsyncStorage.setItem("lastPlayedSong", JSON.stringify(song));
    } catch (error) {
      console.error("Error saving last played song: ", error);
    }
  };

  const play = () => {
    setIsPlaying(true);
    // Logic to start playback timer or whatever you need
  };

  const pause = () => {
    setIsPlaying(false);
    // Logic to pause playback timer or whatever you need
  };

  // Context value containing the current playing song and function to set it
  const contextValue: ContextProps = {
    currentSong,
    setPlayingSong,
    currentPlayingTime,
    setCurrentPlayingTime,
    play,
    pause,
    isPlaying,
    setIsPlaying,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
