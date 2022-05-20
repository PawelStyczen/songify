import React from "react";
import Song from "./Song";

function YourPlaylist({ songs, onRemove, setOpenModal }) {
  return (
    <div className="YourPlaylist">
      <p className="YourPlaylist__label">Your Playlist</p>

      {songs.map((song) => (
        <Song
          key={song.id}
          id={song.id}
          songName={song.songName}
          artist={song.artist}
          thumb={song.thumb}
          onClick={onRemove}
          isSelected={true}
        />
      ))}

      {songs.length > 0 && (
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className="btn callout"
        >
          Save
        </button>
      )}
    </div>
  );
}

export default YourPlaylist;
