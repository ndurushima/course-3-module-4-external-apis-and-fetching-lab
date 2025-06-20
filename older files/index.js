// index.js

// Step 1: Fetch Data from the API
// - Create a function `fetchWeatherData(city)`
// - Use fetch() to retrieve data from the OpenWeather API
// - Handle the API response and parse the JSON
// - Log the data to the console for testing
function fetchWeatherData(city) {
  const apiKey = "a5af8be61b82d2c42f9d46aa6e30b765";

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then(response => {
        console.log(response)
        if (!response.ok) {
            return {error: "Please enter a valid city name"}
        }
        return response.json()

    })
    .then(locationData => {
        console.log(locationData)
        if (locationData.error) {
            throw "Please enter a valid city name"
        }
    //   if (locationData.length === 0) {
    //     throw new Error("City not found");
    //   }

      const { lat, lon } = locationData[0];

      return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`);
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("error").style.display = "none"
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      displayError(error)
    });

}
//fetchWeatherData("Dallas")

// Step 2: Display Weather Data on the Page
// - Create a function `displayWeather(data)`
// - Dynamically update the DOM with weather details (e.g., temperature, humidity, weather description)
// - Ensure the function can handle the data format provided by the API

function displayWeather(data) {
    const weatherDisplay = document.getElementById("weather-display");

    const temperature = data.current.temp;
    const humidity = data.current.humidity;
    const description = data.current.weather[0].description;

    const html = `
    <ul>
        <li class="red">Temperature: ${temperature}°C</li>
        <li>Humidity: ${humidity}</li>
        <li>Condition: ${description}</li>
    </ul>
    `
    weatherDisplay.innerHTML = html

    
    const listDetail = document.createElement("li")
    listDetail.textContent = `Temperature: ${temperature}°C`;
    listDetail.textContent = `Humidity: ${humidity}%`; 
    listDetail.textContent = `Condition: ${description}`;

    weatherDisplay.appendChild(listDetail);
}

// Step 3: Handle User Input
// - Add an event listener to the button to capture user input
// - Retrieve the value from the input field
// - Call `fetchWeatherData(city)` with the user-provided city name

document.getElementById("fetch-weather").addEventListener("click", () => {
    const cityInput = document.getElementById("city-input").value 
    console.log(cityInput)
    fetchWeatherData(cityInput)
    document.getElementById("city-input").value = ""
    
})


// Step 4: Implement Error Handling
// - Create a function `displayError(message)`
// - Handle invalid city names or network issues
// - Dynamically display error messages in a dedicated section of the page

function displayError(message) {
    const error = document.getElementById("error")
    error.innerHTML = `<h3>${message}</h3>`
}

// Step 5: Optimize Code for Maintainability
// - Refactor repetitive code into reusable functions
// - Use async/await for better readability and to handle asynchronous operations
// - Ensure all reusable functions are modular and clearly named

module.exports = { fetchWeatherData, displayWeather, displayError }