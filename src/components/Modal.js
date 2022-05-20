import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

function Modal({ onClose, onSave }) {
  const [playListName, setPlayListName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(playListName);
  };

  return (
    <div className="Modal">
      <div className="Modal__container">
        <MdOutlineClose className="btn-close" onClick={() => onClose(false)} />
        <div className="Modal__container_title">Save playlist</div>
        <div className="Modal__container_body">
          <form className="search" onSubmit={onSubmit}>
            <input
              className="search__input"
              placeholder="Playlist Name"
              type="text"
              value={playListName}
              onChange={(e) => {
                setPlayListName(e.target.value);
              }}
              required="true"
            ></input>
            <div className="Modal__container_footer">
              <input type="submit" value="Save Playlist" className="btn" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
