import { LibraryData } from "../types";
import library from "../assets/library.json";

export default function LibraryRow(props: { data: LibraryData; type: string }) {
  const { data, type } = props;

  if (type === "artist") {
    return (
      <div className="flex flex-row text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 gap-3 items-center">
        <div className="h-12 w-12 ml-2">
          <img src={data.img} className="h-full w-full rounded-full" />
        </div>
        <div className="flex flex-col font-medium">
          <div>{data.name}</div>
          <div className="text-neutral-400"> Artista </div>
        </div>
      </div>
    );
  } else if (type === "album") {
    return (
      <div className="flex flex-row gap-3 text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 items-center">
        <div className="w-12 h-12 ml-2">
          <img src={data.img} className="rounded-sm" />
        </div>
        <div className="flex flex-col font-medium">
          <div>{data.name}</div>
          <div className="text-neutral-400">{`Album • ${data.ArtistsOnAlbums?.map(
            (artist) => {
              return artist.artist.name;
            }
          ).join(", ")}`}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row text-white hover:bg-[#3E3E3E] hover:rounded-sm mx-3 py-2 gap-3 items-center">
        <div className="w-12 h-12 ml-2">
          <img src={data.img} className="rounded-sm" />
        </div>
        <div className="flex flex-col font-medium">
          <div>{data.name}</div>
          <div className="text-neutral-400">{`Playlist • ${data.author.username}`}</div>
        </div>
      </div>
    );
  }
}
