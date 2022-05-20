import React from "react";
import { MdOutlineClose, MdOutlineAddCircle } from "react-icons/md";

function Song({ songName, artist, thumb, id, onClick, isSelected }) {
  return (
    <div
      className="song"
      onClick={() => {
        onClick(id);
      }}
    >
      <img className="song__thumb" src={thumb}></img>
      <div>
        <p className="song__songname">{songName}</p>
        <p className="song__artist">{artist}</p>
      </div>
      {isSelected ? (
        <MdOutlineClose className="song-close" />
      ) : (
        <MdOutlineAddCircle className="song-add" />
      )}
    </div>
  );
}

export default Song;
