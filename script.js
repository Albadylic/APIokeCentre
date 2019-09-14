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
  // Reset contentSpace
  const contentSpace = document.getElementById("pokeContent");
  clearContent(contentSpace);

  // Add Pokemon name and sprite
  const title = document.createElement("h3");
  const image = document.createElement("img");
  title.textContent = obj.name;
  title.classList.add("pokemonName");
  contentSpace.appendChild(title);
  image.src = obj.sprites.front_default;
  image.classList.add("pokemonSprite");
  contentSpace.appendChild(image);
};

const populateMoveData = obj => {
  const contentSpace = document.getElementById("pokeMoves");
  const power = document.createElement("p");
  console.log(obj.name, obj.power);
  const moveTitle = document.createElement("h3");
  moveTitle.textContent = obj.name;
  contentSpace.appendChild(moveTitle);
  if (obj.power != null) {
    power.textContent = obj.power;
  } else {
    power.textContent = "N/A";
  }

  contentSpace.appendChild(power);
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
