export type Song = {
  id: string;
  title: string;
  artist: string;
  duration: number; // Duration in seconds
  album?: string; // Optional album name
  releaseYear?: number; // Optional release year
  like?: boolean;
  // Add any other properties you want to include for a song
};
