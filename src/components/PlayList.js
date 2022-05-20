import React from "react";

function PlayList({ playlist, onPlayListClick }) {
  return (
    <div
      className="PlayList"
      onClick={() => onPlayListClick(playlist.listName)}
    >
      <p className="PlayList__name">
        {playlist.listName}
        <span className="PlayList__length">{playlist.songs.length}</span>
      </p>
    </div>
  );
}

export default PlayList;
