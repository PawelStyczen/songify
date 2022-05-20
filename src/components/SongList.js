import React, { useState } from "react";
import Song from "./Song";

function SongList({ onSearchSongs, searchResults, onAdd }) {
  const [songName, setSongName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    onSearchSongs(songName);
  };

  return (
    <div className="YourPlaylist">
      <form className="search" onSubmit={onSubmit}>
        <input
          className="search__input"
          placeholder="Search"
          value={songName}
          type="search"
          onChange={(e) => {
            setSongName(e.target.value);
          }}
        ></input>
        <input type="submit" value="Search Task" className="btn" />
      </form>

      {searchResults.map((song) => (
        <Song
          key={song.id}
          id={song.id}
          songName={song.songName}
          artist={song.artist}
          thumb={song.thumb}
          onClick={onAdd}
        />
      ))}
    </div>
  );
}

export default SongList;
