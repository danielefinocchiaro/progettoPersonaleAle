import library from "../assets/library.json";
import LibraryRow from "./LibraryRow";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import { FilterType } from "../types";

export default function LibraryCol() {
  const { data: artists } = useQuery({
    queryKey: ["artist"],
    queryFn: () => trpc.artistByFilter.query({ type: FilterType.ByName }),
  });

  const { data: albums } = useQuery({
    queryKey: ["album"],
    queryFn: () => trpc.albumByFilter.query({ type: FilterType.ByName }),
  });

  const { data: playlists } = useQuery({
    queryKey: ["playlist"],
    queryFn: () => trpc.playlistByName.query(),
  });

  // Map data to LibraryData format
  const mappedArtists = artists?.map((artist) => ({
    ...artist,
    artist: artist.name, // Add artist property to satisfy LibraryData interface
    audio: library.artists[0]?.audio || "",
    link: "",
  }));

  const mappedAlbums = albums?.map((album) => ({
    ...album,
    artist: album.ArtistsOnAlbums?.[0]?.artist.name || "Unknown Artist", // Add artist property
    audio: library.artists[1]?.audio || "",
    link: "",
  }));

  const mappedPlaylists = playlists?.map((playlist) => ({
    ...playlist,
    artist: playlist.author?.username || "Unknown Author", // Add artist property
    audio: library.artists[2]?.audio || "",
    link: "",
  }));

  return (
    <div className="flex flex-col h-full max-h-full overflow-y-scroll">
      {mappedArtists?.map((artist) => (
        <LibraryRow key={`artist-${artist.id}`} data={artist} type="artist" />
      ))}
      {mappedAlbums?.map((album) => (
        <LibraryRow key={`album-${album.id}`} data={album} type="album" />
      ))}
      {mappedPlaylists?.map((playlist) => (
        <LibraryRow
          key={`playlist-${playlist.id}`}
          data={playlist}
          type="playlist"
        />
      ))}
    </div>
  );
}
