import axios from "axios";

const MONTHS = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];
const DAYS = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
];
const DAYS_FORECASTED = 14; //Max 16

const weatherList = document.querySelector(".weather-list");
const weatherLocationName = document.querySelector(".weather-location-name");

const changeWeatherLocationSubmit = document.querySelector(
  ".change-weather-location-submit"
);
const changeWeatherLocationInput = document.querySelector(
  "#change-weather-location-input"
);

const geoLocationoptions = {
  maximumAge: 300000, //300,000 = 5min
  enableHighAccuracy: true,
  timeout: 15000,
};

const getWeatherIconFromCode = (weatherCode) => {
  //WMO weather codes
  // 0	Clear sky

  // 1, 2 Mainly clear, partly cloudy

  // 3 Overcast

  // 45, 48	Fog and depositing rime fog

  // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
  // 56, 57	Freezing Drizzle: Light and dense intensity
  // 61, 63, 65	Rain: Slight, moderate and heavy intensity
  // 66, 67	Freezing Rain: Light and heavy intensity
  // 80, 81, 82	Rain showers: Slight, moderate, and violent

  // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
  // 77	Snow grains
  // 85, 86	Snow showers slight and heavy

  // 95 *	Thunderstorm: Slight or moderate

  // 96, 99 *	Thunderstorm with slight and heavy hail
  // (*) Thunderstorm forecast with hail is only available in Central Europe

  switch (weatherCode) {
    case 0:
      return "sunny";
    case 1:
    case 2:
      return "partly_cloudy_day";
    case 3:
      return "cloud";
    case 45:
    case 48:
      return "foggy";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "rainy";
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return "weather_snowy";
    case 95:
      return "thunderstorm";
    case 96:
    case 99:
      return "weather_hail";
    default:
      return "question_mark";
  }
};

const displaySingleWeatherForecastDay = (
  timeData,
  maxTempData,
  minTempData,
  weatherCodeData,
  downfallSumData,
  windDirectionData,
  windSpeedData,
  forecastDataUnits
) => {
  const date = new Date(timeData);

  const weatherListItem = document.createElement("article");
  weatherListItem.classList.add("weather-list-item");

  const weatherListItemDate = document.createElement("div");
  weatherListItemDate.classList.add("weather-list-item-date");

  const dayName = document.createElement("h3");
  dayName.classList.add("day-name");
  dayName.textContent = `${DAYS[date.getDay()]}`;
  weatherListItemDate.appendChild(dayName);

  const dayDate = document.createElement("p");
  dayDate.classList.add("day-date");
  dayDate.textContent = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
  weatherListItemDate.appendChild(dayDate);
  weatherListItem.appendChild(weatherListItemDate);

  const weatherListItemTemperature = document.createElement("div");
  weatherListItemTemperature.classList.add("weather-list-item-temperature");

  const maxTemperature = document.createElement("p");
  maxTemperature.classList.add("max-temperature");
  maxTemperature.title = "Högsta temperatur";
  maxTemperature.textContent = `${maxTempData} ${forecastDataUnits.temperature_2m_max}`;
  weatherListItemTemperature.appendChild(maxTemperature);

  const minTemperature = document.createElement("p");
  minTemperature.classList.add("min-temperature");
  minTemperature.title = "Lägsta temperatur";
  minTemperature.textContent = `${minTempData} ${forecastDataUnits.temperature_2m_min}`;
  weatherListItemTemperature.appendChild(minTemperature);
  weatherListItem.appendChild(weatherListItemTemperature);

  const weatherListItemDownfall = document.createElement("div");
  weatherListItemDownfall.classList.add("weather-list-item-downfall");

  const weatherIcon = document.createElement("i");
  weatherIcon.classList.add("weather-icon", "material-symbols-outlined");
  weatherIcon.textContent = getWeatherIconFromCode(weatherCodeData);
  weatherListItemDownfall.appendChild(weatherIcon);

  const downfallSum = document.createElement("p");
  downfallSum.classList.add("downfall-sum");
  downfallSum.title = "Nederbördsmängd";
  downfallSum.textContent = `${downfallSumData} ${forecastDataUnits.precipitation_sum}`;
  weatherListItemDownfall.appendChild(downfallSum);
  weatherListItem.appendChild(weatherListItemDownfall);

  const weatherListItemWind = document.createElement("div");
  weatherListItemWind.classList.add("weather-list-item-wind");

  const windDirection = document.createElement("i");
  windDirection.classList.add("wind-direction", "material-symbols-outlined");
  windDirection.title = `Vindriktning ${windDirectionData}${forecastDataUnits.wind_direction_10m_dominant}`;
  windDirection.style.rotate = `${windDirectionData}deg`;
  windDirection.textContent = "north";
  weatherListItemWind.appendChild(windDirection);

  const windSpeed = document.createElement("p");
  windSpeed.classList.add("wind-speed");
  windSpeed.title = "Högsta vindhastighet";
  windSpeed.textContent = `${Math.round(windSpeedData / 3.6)}m/s`;
  weatherListItemWind.appendChild(windSpeed);
  weatherListItem.appendChild(weatherListItemWind);

  weatherList.appendChild(weatherListItem);
};

const getWeatherForecasts = async ({ latitude, longitude }, locationName) => {
  await axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&forecast_days=${DAYS_FORECASTED}`
    )
    .catch((error) => console.log(error))
    .then((json) => {
      weatherList.innerHTML = "";

      weatherLocationName.textContent = locationName
        ? `${locationName}`
        : "Lokalt"; //TODO: find what place this is, we have long and lat here

      for (let i = 0; i < DAYS_FORECASTED; i++) {
        displaySingleWeatherForecastDay(
          json.data.daily.time[i],
          json.data.daily.temperature_2m_max[i],
          json.data.daily.temperature_2m_min[i],
          json.data.daily.weather_code[i],
          json.data.daily.precipitation_sum[i],
          json.data.daily.wind_direction_10m_dominant[i],
          json.data.daily.wind_speed_10m_max[i],
          json.data.daily_units
        );
      }
    });
};

const searchForecastByLocation = async (locationName) => {
  await axios
    .get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1&language=sv&format=json`
    )
    .catch((error) => console.log(error))
    .then((json) => {
      if (!json.data.results) {
        weatherLocationName.textContent = "Plats hittades inte";
        console.error("Could not find location");
        return;
      }

      getWeatherForecasts(json.data.results[0], json.data.results[0].name);
    });
};

const geoLocationSuccess = (geoLocation) => {
  getWeatherForecasts(geoLocation.coords);
};

const geoLocationerror = (error) => {
  console.error(error, error.code); //TODO: Display error, code 1 === user denied geolocation
};

//Gets local weather
navigator.geolocation.getCurrentPosition(
  geoLocationSuccess,
  geoLocationerror,
  geoLocationoptions
);

changeWeatherLocationSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  searchForecastByLocation(changeWeatherLocationInput.value);
});
