// Today variables

let dayName = document.getElementById("today-name");
let dayDate = document.getElementById("today-date");
let CityName = document.getElementById("city-name");
let todayMaxTemp = document.getElementById("max-temp");
let todayTempimg = document.getElementById("todayConditionImg");
let todayTempText = document.getElementById("todayConditionText");
let todayHumidty = document.getElementById("humdity")
let todayWind = document.getElementById("wind")
let todayWinddDirection = document.getElementById("windDirection")
let todayName = document.getElementById("today-name")
let todayNum = document.getElementById("today-num")
let monthName = document.getElementById("month-Name")

// next data

let nextDay = document.getElementById("nextDayName")
let nextDayCondImg = document.getElementById("nextDayConditionImg")
let nextDayMaxTemp = document.getElementById("nextDayMax")
let nextDayMinTemp = document.getElementById("nextDayMin")
let nextDayCondText = document.getElementById("nextDayconditiontext")

// after next data

let afterNextDay = document.getElementById("afterNextDayName")
let afterNextCondImg = document.getElementById("afterNextConditionImg")
let afterNextDayMaxTemp = document.getElementById("afterNextDayMax")
let afterNextDayMinTemp = document.getElementById("afterNextDayMin")
let afterNextDayConditionText = document.getElementById("afterNextDaycondition")

// search data

let searchInput = document.getElementById("Search")

// fetch Api data
async function getWeather(city){
let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=832af68529f14568aad210908231908&q= ${city}&days=3`)
let weatherData = await weatherResponse.json();
return weatherData
}

function displayToday(data){
    let todayDate = new Date(data.forecast.forecastday[0].date)
    todayName.innerHTML = todayDate.toLocaleDateString("en-us" , {weekday:"long"})
    todayNum.innerHTML = todayDate.getDate()
    monthName.innerHTML = todayDate.toLocaleDateString("en-us" , {month:"long"})
    CityName.innerHTML = data.location.name
    todayMaxTemp.innerHTML = data.current.temp_c + "c"
    todayTempimg.setAttribute("src",data.current.condition.icon)
    todayTempText.innerHTML = data.current.condition.text
    todayWinddDirection.innerHTML = data.current.wind_dir
    todayHumidty.innerHTML = data.current.humidity+"%"
    todayWind.innerHTML = data.current.wind_kph+"km/h"
}
function displayNextDay(data){
    let nextDaydate = new Date(data.forecast.forecastday[1].date)
    nextDay.innerHTML = nextDaydate.toLocaleDateString("en-us" , {weekday:"long"})
    nextDayCondImg.setAttribute("src" ,  data.forecast.forecastday[1].day.condition.icon)
    nextDayMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + "c"
    nextDayMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c + "c"
    nextDayCondText.innerHTML = data.forecast.forecastday[1].day.condition.text
}

function displayAfterNext(data){
    let afternextDaydate = new Date(data.forecast.forecastday[2].date)
    afterNextDay.innerHTML = afternextDaydate.toLocaleDateString("en-us" , {weekday:"long"})
    afterNextCondImg.setAttribute("src" , data.forecast.forecastday[2].day.condition.icon)
    afterNextDayMaxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + "c"
    afterNextDayMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c + "c"
    afterNextDayConditionText.innerHTML = data.forecast.forecastday[2].day.condition.text
}



async function startApp(city = "cairo"){
   let weatherData = await getWeather(city)
    displayToday(weatherData)
    displayNextDay(weatherData)
    displayAfterNext(weatherData)
}
startApp()


searchInput.addEventListener("keyup" , function(){
    startApp(searchInput.value)
})
