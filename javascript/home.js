// OpenWeatherMap API Configuration
const apiKey = "ad8652e5e547d35b75900eeb0f868daa";
const defaultCity = "Kampala";

// Function to fetch weather data
async function getWeatherForCity(city) {
  // Show loading state
  document.getElementById("cityName").textContent = "Loading...";
  document.getElementById("temperature").textContent = "---°C";
  document.getElementById("conditions").textContent = "---";
  document.getElementById("humidity").innerHTML = '<i class="fas fa-tint"></i> Humidity: ---%';

  // Direct API call to OpenWeatherMap
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    console.log(`Fetching weather for: ${city}`);
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "City not found");
    }

    const data = await response.json();
    console.log("Weather data received:", data);

    // Extract weather information
    const temperature = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const conditions = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Capitalize first letter of conditions
    const capitalizedConditions = conditions.charAt(0).toUpperCase() + conditions.slice(1);

    // Update the HTML elements
    document.getElementById("cityName").textContent = city.charAt(0).toUpperCase() + city.slice(1);
    document.getElementById("temperature").textContent = `${temperature}°C`;
    document.getElementById("conditions").textContent = capitalizedConditions;
    document.getElementById("humidity").innerHTML = `<i class="fas fa-tint"></i> Humidity: ${humidity}%`;
    document.getElementById("weatherIcon").src = iconUrl;

    console.log(`✅ Weather loaded: ${city}, ${temperature}°C`);

  } catch (error) {
    console.error("❌ Error:", error.message);
    document.getElementById("cityName").textContent = "Not Found";
    document.getElementById("temperature").textContent = "--°C";
    document.getElementById("conditions").textContent = "City not found";
    document.getElementById("humidity").innerHTML = '<i class="fas fa-tint"></i> Humidity: --%';
    alert(`❌ Could not find "${city}". Please check the city name.`);
  }
}

// Initialize app when page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Weather App Started");

  // Load default city
  getWeatherForCity(defaultCity);

  // Get elements
  const searchInput = document.getElementById("citySearch");
  const searchBtn = document.getElementById("searchBtn");

  // Search button click
  searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
      getWeatherForCity(city);
      searchInput.value = "";
    } else {
      alert("Please enter a city name");
    }
  });

  // Enter key press
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const city = searchInput.value.trim();
      if (city) {
        getWeatherForCity(city);
        searchInput.value = "";
      } else {
        alert("Please enter a city name");
      }
    }
  });
});