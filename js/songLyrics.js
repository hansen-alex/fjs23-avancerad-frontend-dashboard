import axios from "axios";

const songLyric = document.querySelector(".song-lyric");

const findSongLyricArtistInput = document.querySelector(
  "#find-song-lyric-artist-input"
);
const findSongLyricSongInput = document.querySelector(
  "#find-song-lyric-song-input"
);
const findSongLyricSubmit = document.querySelector(".find-song-lyric-submit");

const getSongLyrics = async (event) => {
  event.preventDefault();
  songLyric.innerHTML = "";

  await axios
    .get(
      `https://api.lyrics.ovh/v1/${findSongLyricArtistInput.value}/${findSongLyricSongInput.value}`
    )
    .catch((error) => {
      console.log(error.response.status, error.response.statusText);
      songLyric.innerHTML = `Kunde inte hitta "${findSongLyricSongInput.value}" av "${findSongLyricArtistInput.value}".<br>Se till att du har stavat rätt!<br>Annars har vi tyvärr inte denna låt.`;
    })
    .then((json) => {
      if (!json) return;

      let lyric = json.data.lyrics;

      //Removes lyric description
      lyric = lyric.split("\n");
      lyric.splice(0, 1);
      lyric = lyric.join("\n");

      //Formats lyric
      lyric = lyric.replaceAll(/\n+/g, "<br>");
      songLyric.innerHTML = lyric;
    });
};

findSongLyricSubmit.addEventListener("click", getSongLyrics);
