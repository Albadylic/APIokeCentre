const url = "https://pokeapi.co/api/v2/";

// Generate a random number between 0 and 150
const generateRandomNum = () => {
  return Math.floor(Math.random() * 151);
};

// Clear a DOM element's text content
const clearContent = element => {
  element.textContent = "";
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

const populateMoves = str => {
  const contentSpace = document.getElementById("pokeMoves");
  //   contentSpace.textContent = "";
  //   const title = document.createElement("h2");
  //   title.textContent = "Moves: ";
  //   contentSpace.appendChild(title);

  const moveTitle = document.createElement("h3");
  moveTitle.textContent = str;
  contentSpace.appendChild(moveTitle);
};

const populateMoveData = obj => {
  const contentSpace = document.getElementById("pokeMoves");
  const power = document.createElement("p");
  console.log(obj.power);
  power.textContent = obj.power;
  contentSpace.appendChild(power);
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
      for (i = 0; i < 3; i++) {
        populateMoves(myJSON.moves[i].move.name);
        getMoves(myJSON.moves[i].move.url);
      }
    });
};

const getMoves = url => {
  return fetch(url)
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
