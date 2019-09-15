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

// Capitalise Strings

const capitaliseString = str => {
  let arr = str.split(" ");
  arr.forEach((element, index) => {
    arr[index] = element.substring(0, 1).toUpperCase() + element.substring(1);
  });
  return arr.join(" ");
};

// Populate the DOM

const populatePokemon = obj => {
  // Add Pokemon name and sprite
  const title = document.querySelector("#pokemonName");
  const image = document.querySelector("#pokemonSprite");
  title.textContent = obj.name;
  image.src = obj.sprites.front_default;
};

let count = 0;
const populateMoveData = obj => {
  const moveTitle = document.querySelectorAll(".pokeMoveTitle");
  const power = document.querySelectorAll(".pokeMovePower");

  moveTitle[count].textContent = obj.name;
  if (obj.power != null) {
    power[count].textContent = obj.power;
  } else {
    power[count].textContent = "N/A";
  }

  count++;
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
      count = 0;
      for (i = 0; i < 4; i++) {
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
      populateMoveData(myJSON);
    });
};

// Event listen on button
document.getElementById("goButton").addEventListener("click", () => {
  searchWithFetch();
});
