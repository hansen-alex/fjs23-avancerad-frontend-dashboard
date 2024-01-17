import axios from "axios";

const geoLocationoptions = {
  maximumAge: 300000, //300,000 = 5min
  enableHighAccuracy: true,
  timeout: 15000,
};

const getWeatherForecast = async ({ latitude, longitude }, locationName) => {
  await axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&forecast_days=3`
    )
    .catch((error) => console.log(error))
    .then((json) => {
      console.log(json.data);

      if (locationName) {
        console.log(`Väder ${locationName}`);
      } else {
        console.log("Väder lokalt");
      }

      //https://www.klart.se/se/stockholms-l%C3%A4n/v%C3%A4der-stockholm/ design inspo
      //https://open-meteo.com/en/docs/ <- request more data if needed
      //day name, date month
      const date = new Date(json.data.daily.time[0]);
      const months = [
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
      console.log(`date ${date.getDate()}`);
      console.log(`month ${months[date.getMonth()]}`);
      const days = [
        "Söndag",
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag",
      ];
      console.log(`day ${days[date.getDay()]}`);

      //max temp
      console.log(
        `Max ${Math.round(json.data.daily.temperature_2m_max[0])} ${
          json.data.daily_units.temperature_2m_max
        }`
      );
      //min temp
      console.log(
        `Min ${Math.round(json.data.daily.temperature_2m_min[0])} ${
          json.data.daily_units.temperature_2m_min
        }`
      );

      //icon, avg of weather per day
      //https://fonts.google.com/icons?icon.query=weather
      // weather_code	Description
      // 0	Clear sky
      // 1, 2, 3	Mainly clear, partly cloudy, and overcast
      // 45, 48	Fog and depositing rime fog
      // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
      // 56, 57	Freezing Drizzle: Light and dense intensity
      // 61, 63, 65	Rain: Slight, moderate and heavy intensity
      // 66, 67	Freezing Rain: Light and heavy intensity
      // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
      // 77	Snow grains
      // 80, 81, 82	Rain showers: Slight, moderate, and violent
      // 85, 86	Snow showers slight and heavy
      // 95 *	Thunderstorm: Slight or moderate
      // 96, 99 *	Thunderstorm with slight and heavy hail
      // (*) Thunderstorm forecast with hail is only available in Central Europe
      console.log(json.data.daily.weather_code[0]);
      //downfall mm
      console.log(
        `Downfall sum ${json.data.daily.precipitation_sum[0]}${json.data.daily_units.precipitation_sum}`
      );

      //wind dir
      //display with arrow and rotate for exact direction, none of that 8 dir bs
      console.log(
        `Wind dir ${json.data.daily.wind_direction_10m_dominant[0]}${json.data.daily_units.wind_direction_10m_dominant}`
      );
      //wind speed, converted to m/s
      console.log(
        `Max wind speed ${Math.round(
          json.data.daily.wind_speed_10m_max[0] / 3.6
        )}m/s`
      );
    });
};

const searchForecastByLocation = async (locationName) => {
  await axios
    .get(
      //TODO: maybe get better location names with other api that gives coords
      `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1&language=sv&format=json`
    )
    .catch((error) => console.log(error))
    .then((json) => {
      if (!json.data.results) {
        console.log("error, did not find");
        console.log("TODO: display error");
        return;
      }
      console.log(json.data.results[0]);
      getWeatherForecast(json.data.results[0], json.data.results[0].name);
    });
};

const geoLocationSuccess = (geoLocation) => {
  getWeatherForecast(geoLocation.coords);
};

const geoLocationerror = (error) => {
  console.log(error);
  console.log(error.code); //TODO: Display error, code 1 === user denied geolocation
  return error;
};

navigator.geolocation.getCurrentPosition(
  geoLocationSuccess,
  geoLocationerror,
  geoLocationoptions
);

searchForecastByLocation("Hudiksval"); //TODO: search input
