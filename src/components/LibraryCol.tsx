import LibraryRow from "./LibraryRow";
import library from "../assets/library.json";
import { LibraryData } from "../types";

export default function LibraryCol() {
  return (
    <div className="flex flex-col h-64 overflow-y-auto scroll">
      {library.artists.map((artist) => {
        return <LibraryRow data={artist} type="artist" />;
      })}{" "}
      {library.album.map((album) => {
        return <LibraryRow data={album} type={"album"} />;
      })}{" "}
      {library.playlists.map((playlist) => {
        return <LibraryRow data={playlist} type={"playlist"} />;
      })}
    </div>
  );
}
