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
  fetch(generateRandomURL()).then(response => {
    // Our response will come back as a promise.
    // Console logging response will give us a difficult to read and decipher object
    // We must use the .json() method on our response to make this readable. Log it here:
    //
    //
    // Now you've logged the response, we'd like to pass this to our next .then() statement.
  });
};

const getMoves = movesUrl => {};

// Event listen on button
document.getElementById("goButton").addEventListener("click", () => {
  getPokemon();
});
