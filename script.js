const url = "https://pokeapi.co/api/v2/";

// Generate a random number between 0 and 150
const generateRandomNum = () => {
  return Math.floor(Math.random() * 151);
};

// Search for a Pokemon by pokedex number
const searchByNum = () => {
  const xhr = new XMLHttpRequest();
  var pokemonObj = "undefined";
  const numUrl = url + "pokemon/" + generateRandomNum();
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      pokemonObj = JSON.parse(xhr.responseText);
      populateDOM(pokemonObj);
    }
  };
  xhr.open("GET", numUrl);
  xhr.send();
};

// Populate the DOM

const populateDOM = obj => {
  // Reset contentSpace
  const contentSpace = document.getElementById("pokeContent");
  contentSpace.textContent = "";

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

const populateMoves = obj => {
  const contentSpace = document.getElementById("pokeMoves");
  contentSpace.textContent = "";
  const title = document.createElement("h2");
  title.textContent = "Moves: ";
  contentSpace.appendChild(title);

  const moveTitle = document.createElement("h3");
  moveTitle.textContent = obj.moves[0].move.name;
  contentSpace.appendChild(moveTitle);
};

// Fetch Request
const searchWithFetch = () => {
  const numUrl = url + "pokemon/" + generateRandomNum();
  return fetch(numUrl)
    .then(response => {
      return response.json();
    })
    .then(myJSON => {
      populateDOM(myJSON);
      return myJSON;
    })
    .then(myJSON => {
      populateMoves(myJSON);
    });
};

// Event listen on button
document.getElementById("goButton").addEventListener("click", () => {
  searchWithFetch();
});
