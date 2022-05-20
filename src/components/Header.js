import React from "react";
import PlayList from "./PlayList";

function Header({ title, savedPlaylists, onPlayListClick }) {
  return (
    <header className="header">
      <p className="header__label">{title}</p>
      {savedPlaylists.map((playlist) => (
        <PlayList
          key={playlist.listName}
          playlist={playlist}
          onPlayListClick={onPlayListClick}
        />
      ))}
    </header>
  );
}

export default Header;
