document.querySelector(".search").addEventListener("submit", async (event) => {
  event.preventDefault();
  let cityName = document.getElementById("city").value;

  if (cityName != "") {
    status("loading");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      cityName
    )}&appid=01ce19534bd846e30860fb32c4ce8bba&units=metric`;

    let results = await fetch(url);
    let json = await results.json();
    if (json.cod == 200) {
      cityName = " ";
      status(
        ` <h1 class="name">${json.name}, ${json.sys.country}</h1>
        <div class="info">
        <div>
          <h2 class="temp">${Math.floor(json.main.feels_like)} °C</h2>
          <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png">
          <h4 class="range"> ${Math.floor(json.main.temp_max)}° ${Math.floor(
          json.main.temp_min
        )}°</h4>
        </div>
        <div>
          <h3>${json.weather[0].description}</h3>
        </div>
        </div>
        `
      );
    } else {
      status("Not found");
    }
    
  }
});

function status(event) {
  document.querySelector(".status").innerHTML = event;
}
