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

  return (
    <div className="flex flex-col h-full max-h-full overflow-y-scroll">
      {artists?.map((artist) => (
        <LibraryRow data={artist} type="artist" />
      ))}
      {albums?.map((album) => (
        <LibraryRow data={album} type="album" />
      ))}
      {playlists?.map((playlist) => (
        <LibraryRow data={playlist} type="playlist" />
      ))}
    </div>
  );
}
