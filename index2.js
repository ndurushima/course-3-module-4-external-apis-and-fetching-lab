// index.js

// Fetch weather data from an API and return a JSON response in the expected format
async function fetchWeatherData(city) {
  try {
    const response = await fetch(`https://api.example.com/weather?q=${city}`); // URL is mocked in tests

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Display weather info inside the #weather-display div
function displayWeather(data) {
  const weatherDisplay = document.getElementById("weather-display");

  // Convert temperature from Kelvin to Celsius
  const temperatureCelsius = Math.round(data.main.temp - 273.15); // 298.15 → 25
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const cityName = data.name;

  const html = `
    <ul>
      <li>City: ${cityName}</li>
      <li>Temperature: ${temperatureCelsius}°C</li>
      <li>Humidity: ${humidity}%</li>
      <li>Condition: ${description}</li>
    </ul>
  `;

  weatherDisplay.innerHTML = html;
}

// Display an error message inside the #error-message div
function displayError(message) {
  const errorMessage = document.getElementById("error-message");
  if (!errorMessage) return;

  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

module.exports = { fetchWeatherData, displayWeather, displayError };
