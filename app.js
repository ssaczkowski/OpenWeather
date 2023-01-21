const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extend: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html"); 
});

const endpoint = "https://api.openweathermap.org"
const apiKey = "d243167b70d981271445a7e735cea7e9"
//const apiKey = "{YOUR_APIKEY}"

app.post("/", function(req, res){
    const unit = "metric"
    const cityName = req.body.cityName
    const url = endpoint + "/data/2.5/weather?q="+ cityName +"&APPID=" + apiKey + "&unit" + unit

    https.get(url, (response) => {
        console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const iconUrl = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png"
            const showIcon = "<img src='" + iconUrl + "' width='100' height='100'>"
            
            res.write("<p>The Weather is currently " + description + "</p>")
            res.write(showIcon)
            console.log(showIcon)
            res.write("<h1>The temperature in "+ cityName +" is "+ temp + " degrees celcius.</h1>")
            res.send();
        })
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})