import React from "react";
import Song from "./Song";

import { MdOutlineClose } from "react-icons/md";

function PlayListModal({ onClose, openedPlaylist, onDelete }) {
  return (
    <div className="Modal">
      <div className="Modal__container">
        <div>
          <MdOutlineClose
            className="btn-close"
            onClick={() => onClose(false)}
          />
        </div>
        <div className="Modal__container_title"> {openedPlaylist.listName}</div>
        <div className="Modal__container_body">
          {openedPlaylist.songs.map((song) => (
            <Song
              key={song.id}
              id={song.id}
              songName={song.songName}
              artist={song.artist}
              thumb={song.thumb}
            />
          ))}
        </div>
        <div className="Modal__container_footer">
          <button className="btn" onClick={onDelete}>
            Delete Playlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayListModal;
