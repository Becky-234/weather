export default async function handler(req, res) {
    // Enable CORS for local development
    res.setHeader('Access-Control-Allow-Origin', '*');

    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: "City name is required" });
    }

    // Get API key from environment variables (SECURE - not exposed to client)
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        console.error("WEATHER_API_KEY environment variable is not set");
        return res.status(500).json({ error: "Server configuration error" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.message || "City not found"
            });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Weather API error:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
}