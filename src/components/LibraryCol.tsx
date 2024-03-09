import LibraryRow from "./LibraryRow";
import library from "../assets/library.json";

export default function LibraryCol() {
  const artist = library.artists;
  const album = library.album;
  const playlist = library.playlists;
  return (
    <div className="flex flex-col h-full max-h-full overflow-y-scroll">
      {artist.map((artist) => {
        return <LibraryRow data={artist} type="artist" />;
      })}{" "}
      {album.map((album) => {
        return <LibraryRow data={album} type={"album"} />;
      })}{" "}
      {playlist.map((playlist) => {
        return <LibraryRow data={playlist} type={"playlist"} />;
      })}
    </div>
  );
}
