// Solution here

// Some Helper Functions

// Generate a random number between 0 and 150
const generateRandomNum = () => {
  return Math.floor(Math.random() * 151);
};

// Generate random Pokemon URL

const url = "https://pokeapi.co/api/v2/pokemon/";
const generateRandomURL = () => {
  return url + generateRandomNum();
};

// Capitalise Strings

const capitaliseString = str => {
  let arr = str.split("-");
  arr.forEach((element, index) => {
    arr[index] = element.substring(0, 1).toUpperCase() + element.substring(1);
  });
  return arr.join(" ");
};

// Populate the DOM
// These functions will use the object returned from the fetch request
// They should be called within your .then statements

const populatePokemon = obj => {
  // Add Pokemon name and sprite
  const title = document.querySelector("#pokemonName");
  const image = document.querySelector("#pokemonSprite");
  title.textContent = capitaliseString(obj.name);
  image.src = obj.sprites.front_default;
};

let count = 0;
const populateMoveData = obj => {
  const moveTitle = document.querySelectorAll(".pokeMoveTitle");
  const power = document.querySelectorAll(".pokeMovePower");

  moveTitle[count].textContent = capitaliseString(obj.name);
  if (obj.power != null) {
    power[count].textContent = obj.power;
  } else {
    power[count].textContent = "N/A";
  }

  count++;
};

// Fetch Request
const getPokemon = () => {
  fetch(generateRandomURL())
    .then(response => {
      return response.json();
    })
    .then(myJSON => {
      populatePokemon(myJSON);
      return myJSON;
    })
    .then(myJSON => {
      // Now we are able to populate the DOM using the Pokemon's moves.
      // Congratulations! You are well on your way to becoming a Pokemon master!
      // Now, we'd like to repeat this functionality for the first four moves.
      // Write a function here that shall call the getMoves function for the first four moves.
      // Hint: notice the count variable, when should this be reset?

      getMoves(myJSON.moves[0].move.url);
    });
};

const getMoves = movesUrl => {
  fetch(movesUrl)
    .then(response => {
      return response.json();
    })
    .then(myJSON => {
      populateMoveData(myJSON);
    });
};

// Event listen on button
document.getElementById("goButton").addEventListener("click", () => {
  getPokemon();
});
