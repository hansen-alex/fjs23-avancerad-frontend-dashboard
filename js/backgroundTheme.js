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

const placeholderSuggestions = [
  "SAAB",
  "Cars",
  "Boats",
  "Airplanes",
  "Space",
  "Earth",
  "Mars",
  "Venus",
  "Jupiter",
  "Pluto",
  "Forest",
  "Desert",
  "Ocean",
  "Lake",
  "River",
  "Food",
  "Animals",
  "Dogs",
  "Cats",
  "Birds",
  "Horses",
];

const removePlaceholderLetters = async (placeholder, letterDelay) => {
  backgroundThemeInput.placeholder = placeholder.slice(0, -1);

  if (backgroundThemeInput.placeholder.length > 0) {
    await new Promise((res) => setTimeout(res, letterDelay));
    await removePlaceholderLetters(
      backgroundThemeInput.placeholder,
      letterDelay
    );
  }
};

const addPlaceholderLetter = async (placeholder, letterDelay) => {
  for (let i = 0; i < placeholder.length; i++) {
    await new Promise((res) => setTimeout(res, letterDelay));
    backgroundThemeInput.placeholder += placeholder[i];
  }
};

//BUG: Workers are needed as setInterval and setTimeout do not work in inactive tabs, which breaks this
const placeholderIntervalDelay = 5000; //Set time between placeholders
const letterDelay = 300;
let dynamicPlaceholderIntervalDelay = 0;
const updatePlaceholder = async () => {
  const newPlaceholder =
    placeholderSuggestions[
      Math.floor(Math.random() * placeholderSuggestions.length)
    ];

  const updateOperationTime =
    backgroundThemeInput.placeholder.length * letterDelay +
    newPlaceholder.length * letterDelay;
  dynamicPlaceholderIntervalDelay =
    placeholderIntervalDelay + updateOperationTime;

  await removePlaceholderLetters(backgroundThemeInput.placeholder, letterDelay);
  backgroundThemeInput.placeholder = "";
  await addPlaceholderLetter(newPlaceholder, letterDelay);
};

updatePlaceholder();
setInterval(updatePlaceholder, dynamicPlaceholderIntervalDelay);
