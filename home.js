
// const apiKey = "ad8652e5e547d35b75900eeb0f868daa";
// const city = "Kampala"; // Capitalized city name

// const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// fetch(api)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     if (!data || !data.main) {
//       throw new Error("Invalid response format");
//     }
    
//     const temp = data.main.temp;
//     console.log(`Temperature in ${city}: ${temp}°C`);
    
//     // Additional useful data
//     console.log({
//       temperature: temp,
//       humidity: data.main.humidity,
//       conditions: data.weather[0].description
//     });
//   })
// const temp = data.main.temp;
//     const humidity = data.main.humidity;
//     const conditions = data.weather[0].description;
//     const iconCode = data.weather[0].icon; // e.g. "10d"
//     const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

//     // Update HTML elements
//     document.getElementById("temperature").textContent = `${temp}°C`;
//     document.getElementById("conditions").textContent = conditions;
//     document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
//     document.getElementById("weather-icon").src = iconUrl;
//   .catch(error => {
//     console.error('Error fetching weather data:', error);
//   });

const apiKey = "ad8652e5e547d35b75900eeb0f868daa";
const city = "Kampala";

const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(api)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data || !data.main) {
            throw new Error("Invalid response format");
        }
        
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const conditions = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        console.log(`Temperature in ${city}: ${temp}°C`);
        console.log({
            temperature: temp,
            humidity: humidity,
            conditions: conditions
        });

        // Update HTML elements
        document.getElementById("temperature").textContent = `${temp}°C`;
        document.getElementById("conditions").textContent = conditions;
        document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
        document.getElementById("weatherIcon").src = iconUrl;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });