import { getApiKeys } from "./apiKeys";
import axios from "axios";

const UNSPASHACCESSKEY = (await getApiKeys()).UNSPLASH_ACCESS_KEY;

const background = document.querySelector(".background");
const backgroundThemeInput = document.querySelector("#background-theme-input");
const backgroundThemeSubmitButton = document.querySelector(
  ".background-theme-submit-button"
);

const setRandomBackground = async () => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${UNSPASHACCESSKEY}`
    );
    background.style.backgroundImage = `url("${response.data.urls.regular}")`;
  } catch (error) {
    console.log(error);
  }
};

const setBackground = async (event) => {
  event.preventDefault();

  try {
    if (backgroundThemeInput.value.length > 0) {
      //Search with query
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=${UNSPASHACCESSKEY}&query=${backgroundThemeInput.value}`
      );

      background.style.backgroundImage = `url("${
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ].urls.regular
      }")`;
    } else {
      setRandomBackground();
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
backgroundThemeSubmitButton.addEventListener("click", setBackground);

// setRandomBackground(); //Max 50 requests per hour so disabled for now
