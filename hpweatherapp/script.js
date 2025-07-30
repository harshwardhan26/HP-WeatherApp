const searchBox = document.querySelector(".searchArea");
const form = document.querySelector("form");
const temprature = document.querySelector(".temp");
const loc = document.querySelector(".timeLocation p");
const timeDate = document.querySelector(".timeLocation span");
const conds = document.querySelector(".conditions p");
const cloudIcon = document.querySelector(".conditions img");

form.addEventListener("submit", searchForLocation);

// Lowercase input as user types
searchBox.addEventListener("input", () => {
  searchBox.value = searchBox.value.toLowerCase();
});

let targetLocation = "Mumbai";

const getWeather = async () => {
  let url = `https://api.weatherapi.com/v1/current.json?key=9075b65e0a114c5197c111026252907&q=${targetLocation}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    let temp = data.current.temp_c;
    let locationName = data.location.name;
    let timezone = data.location.tz_id;
    let cloudURL = "https:" + data.current.condition.icon;
    let cond = data.current.condition.text;

    updateDetails(temp, locationName, timezone, cond, cloudURL);
  } catch (err) {
    console.error("Error fetching weather:", err);
  }
};

function updateDetails(temp, locationName, timezone, cond, cloudURL) {
  temprature.innerText = temp + "°C";
  loc.innerText = locationName;
  conds.innerText = cond;
  cloudIcon.src = cloudURL;
  cloudIcon.alt = cond;

  // Live time update using location timezone
  clearInterval(window.timeUpdater); // avoid multiple timers
  window.timeUpdater = setInterval(() => {
    const now = new Date();
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(now);
    timeDate.innerText = formattedTime;
  }, 1000);
}


function searchForLocation(e) {
  e.preventDefault();
  targetLocation = searchBox.value.toLowerCase();
  getWeather();
}

// Try to get user's current location on first load
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        targetLocation = `${lat},${lon}`;
        getWeather();
      },
      (error) => {
        console.warn("Location access denied. Using default (Kolhapur).");
        getWeather();
      }
    );
  } else {
    console.warn("Geolocation not supported. Using default (Kolhapur).");
    getWeather();
  }
};