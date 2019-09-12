const url = "https://pokeapi.co/api/v2/";

// Generate a random number between 0 and 150
const generateRandomNum = () => {
  return Math.floor(Math.random() * 151);
};

// Search for a Pokemon by pokedex number
const searchByNum = () => {
  const xhr = new XMLHttpRequest();
  const numUrl = url + "pokemon/" + generateRandomNum();
  var pokemonObj = "undefined";

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
  const contentSpace = document.getElementById("content");
  const title = document.createElement("h3");
  const image = document.createElement("img");
  title.textContent = obj.name;
  contentSpace.appendChild(title);
  image.src = obj.sprites.front_default;
  contentSpace.appendChild(image);
};
