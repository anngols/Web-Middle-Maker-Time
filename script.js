let url = "https://api.weatherapi.com/v1/forecast.json?key=0fc0fa0b48294f9fb74151643240106&q=Kyiv&days=10&aqi=no&alerts=no"
let xhr = new XMLHttpRequest()
xhr.open("GET", url + "&q=London&aqi=no")
xhr.send()

let t = "celsius"
let w = "kph"

let weather;
xhr.onload = function () {
    weather = JSON.parse(xhr.response)
    console.log(weather)
    render(weather)
}


function getWeatherInfo() {
    let city = document.querySelector("#locationInput").value
    let xhrs = new XMLHttpRequest()
    xhrs.open("GET", url + `&q=${city}&aqi=no`)
    xhrs.send()
    xhrs.onload = function () {
        if (xhrs.status >= 400) {
            alertify.error("no weather found for your request")
            return
        }
        weather = JSON.parse(xhrs.response)
        console.log(weather)
        render(weather)
    }
}

document.querySelector("#tempUnit").addEventListener("change", function (event) {
    t = event.target.value
    render(weather)
})
document.querySelector("#windUnit").addEventListener("change", function (event) {
    w = event.target.value 
    render(weather)
})

function render(data) {
    document.querySelector(".weather img").setAttribute("src", data.current.condition.icon)
    document.querySelector(".temperature").innerHTML = (t == "celsius" ? data.current.temp_c : t == "fahrenheit" ? data.current.temp_f : data.current.temp_c + 273.15) + `<span>${(t == "celsius" ? "℃" : t == "fahrenheit" ? "℉" : "°K")}</span><i class='bx bx-thermometer'></i>`
    document.querySelector(".info-wind span").innerHTML = w == "kph" ? (data.current.wind_kph + "k/h") : (data.current.wind_mph + "m/h")
    document.querySelector(".weather .description").innerHTML = data.current.condition.text
    document.querySelector(".info-humidity span").innerHTML = data.current.humidity + "%"

    document.querySelector(".days").innerHTML = ""
    data.forecast.forecastday.forEach((day) => {
        document.querySelector(".days").innerHTML += `
 
 <div class="item">
            <div class="data">${new Date(day.date).toLocaleDateString()}</div>
            <div class="icon"><img src="${day.day.condition.icon}"</div>
            <div class="text">${day.day.condition.text}</div>
            <div class="temp">${day.day.avgtemp_c}℃</div>
            <div class="rain">Chance of rain: ${day.day.daily_chance_of_rain}%</div>
        </div>
        `
    })
}

document.querySelector("#locationInput").addEventListener("input", function(event){
    let text = event.target.value
    let axhr = new XMLHttpRequest()
    axhr.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=0fc0fa0b48294f9fb74151643240106&q=${text}&days=10&aqi=no&alerts=no`)
    axhr.onload = function(){
        let arr = JSON.parse(axhr.response)
        document.querySelector("#list").innerHTML=""
        arr.forEach((e)=>{
            document.querySelector("#list").innerHTML+=`<option value="${e.name}">${e.name}</option>`
        })
    }
    axhr.send()
    


})


