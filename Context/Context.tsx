import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Song } from "../Types/Song";
import mockupSongs from "../Data/mockupSongs";

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
  likeToggle: (song: Song) => void;
  changeSong: (direction: "backwards" | "forward") => void;
}

// Define the context
export const AppContext = createContext<ContextProps>({
  currentSong: undefined,
  setPlayingSong: () => null,
  setCurrentPlayingTime: () => null,
  currentPlayingTime: undefined,
  play: () => null,
  pause: () => null,
  isPlaying: false,
  setIsPlaying: () => null,
  likeToggle: () => null,
  changeSong: () => null,
});

// Define the ContextProvider component
export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | undefined>();
  const [currentPlayingTime, setCurrentPlayingTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [songList, setSongList] = useState<Song[]>([]);

  //Song functions

  // Load the last played song from AsyncStorage on component mount
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

  // Load all the songs found and the new ones
  const loadSongList = async () => {
    try {
      const jsonSongs = await AsyncStorage.getItem("songs");
      if (jsonSongs !== null) {
        const storedSongs: Song[] = JSON.parse(jsonSongs);
        // Merge the arrays and remove duplicates
        const mergedSongs = [
          ...mockupSongs,
          ...storedSongs.filter((song) => {
            return !mockupSongs.some((mockSong) => mockSong.id === song.id);
          }),
        ];
        setSongList(mergedSongs);
      } else {
        // If no songs are stored in AsyncStorage, use only the mockupSongs
        setSongList(mockupSongs);
        await saveSongList();
      }
    } catch (error) {
      console.error("Error loading songs from AsyncStorage: ", error);
    }
  };

  //Save in AsyncStorage the songList
  const saveSongList = async () => {
    try {
      await AsyncStorage.setItem("songs", JSON.stringify(songList));
    } catch (error) {
      if (error)
        console.log("Error in saving the songs list: " + JSON.stringify(error));
    }
  };

  // Function to set the current playing song
  const setPlayingSong = async (song: Song) => {
    // Don't save if the song is already saved
    if (currentSong == song) return;
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentPlayingTime(0);
    try {
      await AsyncStorage.setItem("lastPlayedSong", JSON.stringify(song));
    } catch (error) {
      console.error("Error saving last played song: ", error);
    }
  };

  //function to allow the next and back song changing functionalities
  const changeSong = (direction: "backwards" | "forward") => {
    if (!currentSong) {
      console.error("There's no chosen song!!");
      return;
    }

    const indexOfSong = songList.indexOf(currentSong);
    if (indexOfSong === -1) {
      console.error("Error, indexOfSong < 0");
      return;
    }

    const numSongs = songList.length;
    let newIndex =
      (indexOfSong + (direction === "forward" ? 1 : -1)) % numSongs;

    // Handle negative index
    if (newIndex < 0) {
      newIndex = numSongs - 1;
    }

    setCurrentSong(songList[newIndex]);
    setCurrentPlayingTime(0);
    setIsPlaying(true);
  };

  // Time functions
  const loadLastCurrentTime = async () => {
    try {
      const lastPlayedTime = await AsyncStorage.getItem("currentPlayingTime");
      if (lastPlayedTime) {
        const parsedTime: number = parseInt(lastPlayedTime);
        if (!isNaN(parsedTime)) {
          setCurrentPlayingTime(parsedTime);
        }
      }
    } catch (error) {
      console.error("Error loading last current time: ", error);
    }
  };

  const saveCurrentPlayingTime = async () => {
    try {
      AsyncStorage.setItem(
        "currentPlayingTime",
        JSON.stringify(currentPlayingTime)
      );
    } catch (error) {
      if (error)
        console.log(
          "Error in saving the currentPlayingTime: " + JSON.stringify(error)
        );
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

  // UseEffect functions
  useEffect(() => {
    loadLastPlayedSong();
    loadSongList();
    loadLastCurrentTime();
  }, []); // Empty dependency array to run once on component mount

  // Every second, add one sec to the currentPlayingTime
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentPlayingTime < currentSong.duration) {
      timer = setInterval(() => {
        setCurrentPlayingTime((prevTime) => prevTime + 1);
        if (currentPlayingTime % 10 == 0) saveCurrentPlayingTime();
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, currentPlayingTime, currentSong]);

  // Update current song when songList changes
  useEffect(() => {
    // Check if current song is in the new song list
    const currentSongInList = songList.find(
      (song) => song.id === currentSong?.id
    );
    // If not, set current song to undefined
    if (!currentSongInList) {
      setCurrentSong(songList[0] || undefined);
    } else {
      setCurrentSong(currentSongInList);
    }
  }, [songList]);

  const likeToggle = (song: Song) => {
    // Find the index of the song in the songList array
    const songIndex = songList.findIndex((s) => s.id === song.id);

    // If the song is found in the songList array
    if (songIndex !== -1) {
      // Create a copy of the songList array to avoid mutating the state directly
      const updatedSongList = [...songList];

      // Toggle the 'like' property of the song
      updatedSongList[songIndex] = {
        ...updatedSongList[songIndex],
        like: !updatedSongList[songIndex].like,
      };

      // Update the state with the modified songList array
      setSongList(updatedSongList);
    }
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
    likeToggle,
    changeSong,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
