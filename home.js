//APIs
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

//SEARCH
// Add this to your existing code
const searchInput = document.getElementById('city-search');
const citiesList = document.getElementById('cities-list');
let cities = [];

// Handle Enter key press
searchInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
        const newCity = e.target.value.trim();
        if (!cities.includes(newCity)) {
            try {
                // Validate city exists by making API call
                const validationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}`;
                const response = await fetch(validationUrl);
                
                if (!response.ok) {
                    throw new Error(`City "${newCity}" not found`);
                }
                
                cities.push(newCity);
                updateCitiesList();
                e.target.value = '';
                await getWeatherForCity(newCity);
            } catch (error) {
                console.error('Error:', error);
                alert(`Could not add city: ${error.message}`);
            }
        } else {
            alert('City already exists in the list');
        }
    }
});

// Remove city handler
function removeCity(cityName) {
    cities = cities.filter(city => city !== cityName);
    updateCitiesList();
}

function updateCitiesList() {
    citiesList.innerHTML = '';
    cities.forEach(city => {
        const cityElement = document.createElement('div');
        cityElement.className = 'city-item';
        cityElement.innerHTML = `
            <span>${city}</span>
            <button onclick="removeCity('${city}')">×</button>
        `;
        citiesList.appendChild(cityElement);
    });
}

// Modify your existing getWeather function to handle multiple cities
async function getWeatherForCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.main) {
            throw new Error("Invalid response format");
        }
        
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const conditions = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        // Create or update city weather container
        const cityContainer = document.getElementById(`weather-${city.toLowerCase()}`);
        if (!cityContainer) {
            const container = document.createElement('div');
            container.id = `weather-${city.toLowerCase()}`;
            container.className = 'weather-container';
            document.body.appendChild(container);
        }
        
        const container = document.getElementById(`weather-${city.toLowerCase()}`);
        container.innerHTML = `
            <h2>${city}</h2>
            <img src="${iconUrl}" alt="Weather icon">
            <div class="weather-info">
                <div class="temperature">${temp}°C</div>
                <div class="conditions">${conditions}</div>
                <div class="humidity">Humidity: ${humidity}%</div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(`Failed to fetch weather data for ${city}: ${error.message}`);
    }
}