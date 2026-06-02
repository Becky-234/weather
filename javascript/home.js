// API - Now using environment variable through Vercel serverless function
// No more hardcoded API key visible to anyone!

const defaultCity = "Kampala";

// Function to fetch weather through our secure API endpoint
async function getWeatherForCity(city) {
  // Call our own serverless function instead of OpenWeather directly
  const url = `/api/weather?city=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `City "${city}" not found`);
    }

    const data = await response.json();

    if (!data || !data.main) {
      throw new Error("Invalid response format");
    }

    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const conditions = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Updating existing card
    document.getElementById("cityName").textContent = city;
    document.getElementById("temperature").textContent = `${temp}°C`;
    document.getElementById("conditions").textContent = conditions;
    document.getElementById("humidity").innerHTML = `<i class="fas fa-tint"></i> Humidity: ${humidity}%`;
    document.getElementById("weatherIcon").src = iconUrl;

  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(`Failed to fetch weather data for ${city}: ${error.message}`);
  }
}

// Load default city on page load
document.addEventListener("DOMContentLoaded", () => {
  getWeatherForCity(defaultCity);

  const searchInput = document.getElementById("citySearch");
  const searchBtn = document.getElementById("searchBtn");

  // Handle Enter key press
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      getWeatherForCity(e.target.value.trim());
      searchInput.value = "";
    }
  });

  // Handle button click
  searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim()) {
      getWeatherForCity(searchInput.value.trim());
      searchInput.value = "";
    }
  });
});