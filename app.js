const fetchWeather = async (city) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},mx&appid=d88a37ad3b812e60a51a6473e398a329`);
    if (res.status !== 200 ) {
      alert("Please introduce a valid city") 
    } else {
        const data = await res.json()
        console.log(data);
        return data
    }
    
    
}

const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const mainDict = {
        Thunderstorm: 'Tormenta',
        Drizzle: 'Llovizna',
        Rain: 'Lluvia',
        Snow: 'Nieve',
        Mist: 'Bruma',
        Smoke: 'Humo',
        Haze: 'Neblina',
        Dust: 'Polvo',
        Fog: 'Niebla',
        Sand: 'Arena',
        Ash: 'Ceniza',
        Squall: 'Chubasco',
        Tornado: 'Tornado',
        Clear: 'Despejado',
        Clouds: 'Nubes'
};

const mainContainer = document.querySelector(".main-container") 
const navbar = document.querySelector(".navbar");

const today = new Date();
const month = mes[today.getMonth()]
const date = `${today.getDate()} de ${month} del ${today.getFullYear()}`;
console.log(date);
let searchBtn = document.querySelector(".search-btn")
let cityInput = document.querySelector(".city-input");
const searchInput = document.querySelector(".search-input")
const navContainer = document.querySelector(".nav-container")

searchBtn.addEventListener("click", async (e)=> {
   e.preventDefault();
   showWeather();
   cityInput.value = ""
   navContainer.appendChild(searchInput)
})





//functions

async function showWeather () {
    const searchOnInput = await fetchWeather(cityInput.value)
    let main = mainDict[searchOnInput.weather[0].main]
    mainContainer.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4 ">
        <img src="http://openweathermap.org/img/w/${searchOnInput.weather[0].icon}.png" class="img-fluid rounded-start" alt="...">
        <h5 class="card-title">
          ${searchOnInput.name} </br>
          ${date} 
        </h5> 
        
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <p class="card-text" translate="yes">
            Temperatura actual: ${Math.floor(searchOnInput.main.temp - 273.15)}°C </br>
            Sensación termica: ${Math.floor(searchOnInput.main.feels_like - 273.15)}°C </br>
            Humedad: ${searchOnInput.main.humidity}% </br>
            Clima: ${main}</br>
          </p>
        </div>
      </div>
    </div>
  </div>`
}