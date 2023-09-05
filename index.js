const apiKey="471c5b9128f63f82917031a3b46c8645";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector(".search-input");
const searchBtn=document.querySelector(".search-button");
const weatherIcon=document.querySelector(".weather-icon");
const themeChangeButton = document.getElementById("btn");

function changeTheme(e){
    const card = document.querySelector(".card");
    card.classList.toggle("changeTheme");
    const btn = e.target;
    if(btn.innerText === "Light-mode"){
        btn.innerText = "dark-mode";
        card.style.color="black";

    } else {
        btn.innerText = "light-mode";
        card.style.color="white";
    }
}

async function checkWeather(city){
    try{
    response=await fetch(apiUrl + city+ `&appid=${apiKey}`);
        data = await response.json();

    } catch(err){
        console.log(err);
    }
   if(response.status==404){
    const warning = document.getElementById("warningCont");
    warning.style.color = "red";
    warning.innerHTML = "Invalid location !!";
    }
    else{
        const warning = document.getElementById("warningCont");
    warning.innerHTML = "";
    document.querySelector(".city").innerHTML=(data.name);
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=(data.wind.speed) + " km/hr"; 
    document.querySelector(".temp").innerHTML=(data.main.temp) + "°C";
   
    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="/images/clouds.png";
    }
    else if(data.weather[0].main=="Clear"){
        weatherIcon.src="/images/clear.png";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="/images/rain.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="/images/drizzle.png";
    }
    else if(data.weather[0].main=="Haze"){
        weatherIcon.src="/images/haze.png";
    }
}
}

// Event for fetching weather
searchBtn.addEventListener("click",()=>{
    if(searchBox.value !== undefined)
    checkWeather(searchBox.value);
})

// Event for changing theme:
themeChangeButton.addEventListener("click",changeTheme)
