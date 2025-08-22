//API
const apiKey = "ad8652e5e547d35b75900eeb0f868daa";
const defaultCity = "Kampala";

    // Function to fetch and update weather in the default card
    async function getWeatherForCity(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`City "${city}" not found`);
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

        // Updating existing card
        document.getElementById("cityName").textContent = city;
        document.getElementById("temperature").textContent = `${temp}°C`;
        document.getElementById("conditions").textContent = conditions;
        document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
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