const url = "https://pokeapi.co/api/v2/";

// Generate a random number between 0 and 150
const generateRandomNum = () => {
  return Math.floor(Math.random() * 151);
};

// Clear a DOM element's text content
const clearContent = element => {
  element.textContent = "";
};

// Generate random Pokemon URL

const generateRandomURL = () => {
  return url + "pokemon/" + generateRandomNum();
};

// Populate the DOM

const populatePokemon = obj => {
  // Add Pokemon name and sprite
  const title = document.querySelector("#pokemonName");
  const image = document.querySelector("#pokemonSprite");
  title.textContent = obj.name;
  image.src = obj.sprites.front_default;
};

const populateMoveData = obj => {
  const moveTitle = document.querySelectorAll(".pokeMoveTitle");
  const power = document.querySelectorAll(".pokeMovePower");
  console.log(obj.name, obj.power);
  console.log(pokeArray.length);

  for (i = 0; i < pokeArray.length; i++) {
    moveTitle[i].textContent = pokeArray[i].name;
    if (pokeArray[i].power != null) {
      power[i].textContent = pokeArray[i].power;
    } else {
      power[i].textContent = "N/A";
    }
  }
};

// Fetch Request
const searchWithFetch = () => {
  return fetch(generateRandomURL())
    .then(response => {
      return response.json();
    })
    .then(myJSON => {
      populatePokemon(myJSON);
      return myJSON;
    })
    .then(myJSON => {
      for (i = 0; i < 4; i++) {
        pokeArray = [];
        getMoves(myJSON.moves[i].move.url);
      }
    });
};

const getMoves = movesUrl => {
  return fetch(movesUrl)
    .then(response => {
      return response.json();
    })
    .then(myJSON => {
      populateArray(myJSON);
      populateMoveData(myJSON);
    });
};

let pokeArray = [];

const populateArray = obj => {
  return pokeArray.push({ name: obj.name, power: obj.power });
};

// Event listen on button
document.getElementById("goButton").addEventListener("click", () => {
  searchWithFetch();
});
