const apiKey = "ad8652e5e547d35b75900eeb0f868daa";
const defaultCity = "Kampala";

    // Function to fetch and update weather in the default card
    export const getWeatherByCity  =  async (city) => {
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