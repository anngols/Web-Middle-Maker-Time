let url = "http://api.weatherapi.com/v1/current.json?key=0fc0fa0b48294f9fb74151643240106&q=London&aqi=no"
let xhr = new XMLHttpRequest()
xhr.open("GET", url)
xhr.send()
xhr.onload = function(){
    let data = JSON.parse(xhr.response) 
    console.log(data)
    // document.querySelector(".city").innerHTML = data.location.name
    document.querySelector(".weather img").setAttribute("src", data.current.condition.icon)
    document.querySelector(".temperature").innerHTML = data.current.temp_c + "<span>°C</span><i class='bx bx-thermometer'></i>"
    document.querySelector(".info-wind span").innerHTML = data.current.wind_kph
    document.querySelector(".weather .description").innerHTML = data.current.condition.text
    document.querySelector(".info-humidity span").innerHTML = data.current.humidity + "%"
}
