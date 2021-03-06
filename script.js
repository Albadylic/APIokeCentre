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

let moveCount = 0;
const populateMoveData = obj => {
  const moveTitle = document.querySelectorAll(".pokeMoveTitle");
  const power = document.querySelectorAll(".pokeMovePower");

  moveTitle[moveCount].textContent = capitaliseString(obj.name);
  if (obj.power != null) {
    power[moveCount].textContent = obj.power;
  } else {
    power[moveCount].textContent = "N/A";
  }

  moveCount++;
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
      moveCount = 0;
      Promise.all([getMoves(myJSON.moves[0].move.url), getMoves(myJSON.moves[1].move.url), getMoves(myJSON.moves[2].move.url), getMoves(myJSON.moves[3].move.url), ])

      // for (i = 0; i < 4; i++) {
      //   getMoves(myJSON.moves[i].move.url);
      // }
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
