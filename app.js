//weclome for page $$
//description of what it does $$
//a couple of permanent images for landing page
//search bar $$
//result box for weather results
//potential pokemon list based off weather result.
//may add a database they can click and keep pokemon like the game 


//function to call both apis
async function getBoth() {
    await weatherFunction();
    await pokemonFunction();
}


//weathercapi call
async function weatherFunction() {

    const weatherApi = '885df44cffe885e5718d2bd8f918b530';
    const city = document.getElementById('city').value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`;

    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        //let weatherResult = document.createElement('ol');
        // weatherResult.innerHTML = [
        //     data.name,
        //     data.weather.icon,
        //     data.main.temp,
        //     data.weather.main,
        //     data.main.humidity,
        //     data.weather.description,
        //     data.wind.speed,
        // ]
        let weatherResult = document.createElement('ul');  //chats version
        
        function convertKelvin(kelvin) {
            return (kelvin - 273.15) * 9/5 + 32;
        }
        weatherResult.innerHTML = `
            <li>City: ${data.name}</li>
            <li>Description: ${data.weather[0].description}</li>
            <li>Temperature: ${data.main.temp} Kelvin</li>
            <li>Temperature: ${convertKelvin(data.main.temp)} Degrees</li>
            <li>Weather: ${data.weather[0].main}</li>
            <li>Humidity: ${data.main.humidity} Percent</li>
            <li>Wind Speed: ${data.wind.speed} MPH</li>
        `;
        weather.appendChild(weatherResult)
        })
    .catch(error => console.error('Error:', error))};


//pulling both pokemon apis
async function bothPokemon() {
    await pokemonFunction();
    await pokemonImage();
}
//pokemon api call
async function pokemonFunction() {

    const pokemonType = 'water';
    const pokemonUrl = `https://pokeapi.co/api/v2/type/${pokemonType}`;

    fetch(pokemonUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))};
  

//pokemon image api call

async function pokemonImage() {

    const pokemon = document.getElementById('pokemon');
    const pokemonValue = pokemon.value;
    const imageUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonValue}`;
    let pokemonResult = document.createElement('ul');
    let pokemon_div = document.getElementById(`pokemon_div`)
    fetch(imageUrl)
    .then(response => response.json())
    .then(data => {

        // const pokemonSprite = data.sprites.front_default;
        // const imgElement = document.getElementById('pokemonSprite')

        console.log(data)

        
        pokemonResult.innerHTML = `
        <li>Pokemon: ${data.name}</li>
        <li>ID: ${data.id}</li>
        <li>Type: ${data.types[0].type.name}</li>
        `;
        // let imgElement = document.getElementById('pokemonSprite')
        // imgElement.setAttribute('src', data.sprites.front_default)
        // pokemonResult.appendChild(imgElement)
        
        console.log(data.id)
        console.log(data.types[0].type.name)
        pokemon_div.appendChild(pokemonResult)
    })
    .catch(error => console.error('Error:', error))};

