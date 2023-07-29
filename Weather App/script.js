// QUOTE BOX -------------------

const quoteApi = "https://api.quotable.io/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getquote(url) {
    const response = await fetch(url);
    var data = await response.json();
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}
getquote(quoteApi);

// DATE AND TIME --------------------------

const time = document.getElementById("current-time");

setInterval(() => {
    const t = new Date();
    time.innerHTML = t.toLocaleTimeString();
}, 1000);

const day = document.getElementById("day");
const date = document.getElementById("date");
const month = document.getElementById("month");
const year = document.getElementById("year");

const today = new Date();

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "Septeber", "October", "November", "December"];

day.innerHTML = weekDays[today.getDay()];
date.innerHTML = (today.getDate() > 10 ? "" : "0") + today.getDate();
month.innerHTML = allMonths[today.getMonth()];
year.innerHTML = today.getFullYear();

// WEATHER API CALL -------------------------

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const apiKey = "a4346aaa025b265b26b8d2a83c04803a";


const searchBox = document.querySelector(".searchBox input");
const searchBtn = document.querySelector(".searchBox button");
const weatherIcon = document.querySelector(".weather-icon");
// FOR MY CURRENT LOCATION --------------------

async function checkWeatherforLocation(lat, lon) {
    const response = await fetch(apiUrl1 + `&lat=${lat}` + `&lon=${lon}` + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

   
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `°c`;
    document.querySelector(".city").innerHTML = data.name + `, ${data.sys.country}`;
    document.querySelector("#feels").innerHTML = Math.round(data.main.feels_like) + `°c`;
    document.querySelector(".humidity").innerHTML = data.main.humidity + `%`;
    document.querySelector(".wind").innerHTML = data.wind.speed + ` km/hr`;
    document.querySelector(".visibility").innerHTML = data.visibility + ` m`;
    document.querySelector(".iconName").innerHTML = data.weather[0].main;

    if (new Date().valueOf() / 1000 < data.sys.sunset) {
        // console.log('Day Time');

        if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }
        else if (data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "images/storm.png";
        }
        else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "images/haze.png";
        }
        else if (data.weather[0].main == "Fog") {
            weatherIcon.src = "images/fog.png";
        }
        else if (data.weather[0].main == "Smoke") {
            weatherIcon.src = "images/smoke.png";
        }
        else if (data.weather[0].main == "Dust") {
            weatherIcon.src = "images/dust.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }

      } else {
        // console.log('Night Time');
        if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/night-mist.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/night.png";
        }
        else if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloudy-night.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/night-drizzle.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }
        else if (data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "images/storm.png";
        }
        else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "images/night-haze.png";
        }
        else if (data.weather[0].main == "Fog") {
            weatherIcon.src = "images/fog-night.png";
        }
        else if (data.weather[0].main == "Smoke") {
            weatherIcon.src = "images/smoke.png";
        }
        else if (data.weather[0].main == "Dust") {
            weatherIcon.src = "images/dust.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/night-rain.png";
        }
        
        var link = document.querySelector("link[rel*= 'icon']"|| document.createElement('link'));
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.href = 'images/night-favicon.png' ;
        document.getElementsByTagName('head')[0].appendChild(link);
      }

}

const input = document.getElementById("Location");

async function gotLocation(position) {
    const result = await checkWeatherforLocation(position.coords.latitude, position.coords.longitude);
    console.log(result);
}
function failedToGetLocation() {
    console.log("There was some error");
}
input.addEventListener("click", async () => {
    const result = navigator.geolocation.getCurrentPosition(gotLocation, failedToGetLocation);
})


// FOR USER INPUT LOCATION -----------------------

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    // console.log(data);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
    } else {

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `°c`;
        document.querySelector(".city").innerHTML = data.name + `, ${data.sys.country}`;
        document.querySelector("#feels").innerHTML = Math.round(data.main.feels_like) + `°c`;
        document.querySelector(".humidity").innerHTML = data.main.humidity + `%`;
        document.querySelector(".wind").innerHTML = data.wind.speed + ` km/hr`;
        document.querySelector(".visibility").innerHTML = data.visibility + ` m`;
        document.querySelector(".iconName").innerHTML = data.weather[0].main;

        if (new Date().valueOf() / 1000 < data.sys.sunset) {
            // console.log('Day Time');
    
            if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
            }
            else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            }
            else if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            }
            else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            }
            else if (data.weather[0].main == "Snow") {
                weatherIcon.src = "images/snow.png";
            }
            else if (data.weather[0].main == "Thunderstorm") {
                weatherIcon.src = "images/storm.png";
            }
            else if (data.weather[0].main == "Haze") {
                weatherIcon.src = "images/haze.png";
            }
            else if (data.weather[0].main == "Fog") {
                weatherIcon.src = "images/fog.png";
            }
            else if (data.weather[0].main == "Smoke") {
                weatherIcon.src = "images/smoke.png";
            }
            else if (data.weather[0].main == "Dust") {
                weatherIcon.src = "images/dust.png";
            }
            else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            }
    
          } else {
            // console.log('Night Time');
            if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/night-mist.png";
            }
            else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/night.png";
            }
            else if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/cloudy-night.png";
            }
            else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/night-drizzle.png";
            }
            else if (data.weather[0].main == "Snow") {
                weatherIcon.src = "images/snow.png";
            }
            else if (data.weather[0].main == "Thunderstorm") {
                weatherIcon.src = "images/storm.png";
            }
            else if (data.weather[0].main == "Haze") {
                weatherIcon.src = "images/night-haze.png";
            }
            else if (data.weather[0].main == "Fog") {
                weatherIcon.src = "images/fog-night.png";
            }
            else if (data.weather[0].main == "Smoke") {
                weatherIcon.src = "images/smoke.png";
            }
            else if (data.weather[0].main == "Dust") {
                weatherIcon.src = "images/dust.png";
            }
            else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/night-rain.png";
            }

           var link = document.querySelector("link[rel*= 'icon']"|| document.createElement('link'));
           link.type = 'image/png';
           link.rel = 'shortcut icon';
           link.href = 'images/night-favicon.png' ;
           document.getElementsByTagName('head')[0].appendChild(link);
          }

        document.querySelector(".error").style.display = "none";

    }

}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
