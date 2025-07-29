const searchBox = document.querySelector(".searchArea");
const form = document.querySelector("form");
const temprature = document.querySelector(".temp");
const loc = document.querySelector(".timeLocation p");
const timeDate = document.querySelector(".timeLocation span");
const conds = document.querySelector(".conditions p");
const cloudIcon = document.querySelector(".conditions img"); // Fixed selector (missing `.`)

form.addEventListener("submit", searchForLocation);

let targetLocation = "Mumbai";

const getWeather = async () => {
  let url = `https://api.weatherapi.com/v1/current.json?key=9075b65e0a114c5197c111026252907&q=${targetLocation}&aqi=no`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  let temp = data.current.temp_c;
  let locationName = data.location.name;
  let time = data.location.localtime;
  let cloudURL = "https:" + data.current.condition.icon; // Fixed icon variable
  let cond = data.current.condition.text;

  updateDetails(temp, locationName, time, cond, cloudURL); // Fixed argument order
};

function updateDetails(temp, locationName, time, cond, cloudURL) {
  temprature.innerText = temp + "°C";
  loc.innerText = locationName;
  timeDate.innerText = time;
  conds.innerText = cond;
  cloudIcon.src = cloudURL;
  cloudIcon.alt = cond;
}

function searchForLocation(e) {
  e.preventDefault();
  targetLocation = searchBox.value.toLowerCase();
  getWeather();
}

// Initial load
getWeather();