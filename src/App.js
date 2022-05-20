import { useState, useEffect } from "react";

import Header from "./components/Header";
import YourPlaylist from "./components/YourPlaylist";
import SongList from "./components/SongList";

import Modal from "./components/Modal";
import PlayListModal from "./components/PlayListModal";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [yourPlaylist, setYourPlaylist] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const [openPlayListModal, setOpenPlayListModal] = useState(false);
  const [openedPlayList, setOpenedPlayList] = useState("");

  useEffect(() => {
    updateLocalStorage();
  }, []);

  function updateLocalStorage() {
    const parsedPlaylists = [];
    for (const key in localStorage) {
      const playlist = localStorage.getItem(key);
      if (playlist) {
        parsedPlaylists.push({
          listName: key,
          songs: [...JSON.parse(playlist)],
        });
        setSavedPlaylists(parsedPlaylists);
      }
    }
  }

  //* GET PLAYLISTS FROM STORAGE

  //* SEARCH SONGS
  const searchSongs = (searchSongName) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        "X-RapidAPI-Key": "53fbb642afmshab1e232919af8efp119ef5jsn381a0ff31dd2",
      },
    };

    fetch(
      `https://spotify23.p.rapidapi.com/search/?q=${searchSongName}&type=tracks&offset=0&limit=10&numberOfTopResults=5`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const list = data.tracks.items;

        setSearchResults(
          list.map((item) => ({
            id: item.data.id,
            songName: item.data.name,
            artist: item.data.artists.items[0].profile.name,
            thumb: item.data.albumOfTrack.coverArt.sources[0].url,
          }))
        );
      })

      .catch((err) => console.error(err));
  };

  const addSongToPlaylist = (id) => {
    if (
      !yourPlaylist.filter((song) => song.id === id).length > 0 &&
      yourPlaylist.length < 5
    ) {
      console.log("its there");
      setYourPlaylist([
        ...yourPlaylist,
        searchResults.find((result) => result.id === id),
      ]);
    }
  };

  const removeSongFromPlaylist = (id) => {
    setYourPlaylist(yourPlaylist.filter((result) => result.id !== id));
  };

  const savePlaylist = (playListName) => {
    setOpenModal(!openModal);

    localStorage.setItem(playListName, JSON.stringify(yourPlaylist));
    updateLocalStorage();
  };

  const deleteSavedPlaylist = () => {
    setSavedPlaylists(
      savedPlaylists.filter(
        (playlist) => playlist.listName !== playlist.listName
      )
    );
    localStorage.removeItem(openedPlayList.listName);
    updateLocalStorage();
    setOpenPlayListModal(false);
  };

  const openSavedPlaylist = (playlist) => {
    setOpenPlayListModal(true);
    setOpenedPlayList(
      savedPlaylists.find((element) => element.listName === playlist)
    );
  };

  return (
    <div className="app">
      {openModal && <Modal onClose={setOpenModal} onSave={savePlaylist} />}
      {openPlayListModal && (
        <PlayListModal
          onClose={setOpenPlayListModal}
          openedPlaylist={openedPlayList}
          onDelete={deleteSavedPlaylist}
        />
      )}

      <Header
        title="Songify"
        savedPlaylists={savedPlaylists}
        onPlayListClick={openSavedPlaylist}
      />
      <div className="container">
        <YourPlaylist
          songs={yourPlaylist}
          onRemove={removeSongFromPlaylist}
          setOpenModal={setOpenModal}
        />
        <SongList
          onSearchSongs={searchSongs}
          searchResults={searchResults}
          onAdd={addSongToPlaylist}
        />
      </div>
    </div>
  );
}

export default App;
