console.log("ciao");
const searchButton = document.getElementById("search");
const myPokedex = document.getElementById("pokedex");
const addPokemon = document.getElementById("add");
const textTeam = document.getElementById("text_team");
let currentDisplayedPokemon = null;
let currentPokemon = [];
let personalPokedex = [];
let inputPokemonNAme = document.getElementById("pokemonName");
searchButton.addEventListener("click", callPokemon);
inputPokemonNAme.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    callPokemon();
  }
});
function callPokemon() {
  const pokemonName = inputPokemonNAme.value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then((response) => {
      return response.json();
    })
    .then((pokemon) => {
      // console.log(pokemon.stats);
      const namePokemon = document.getElementById("name");
      const weigthPokemon = document.getElementById("weight");
      const heightPokemon = document.getElementById("height");
      const imagePokemon = document.getElementById("image");
      const statsPokemon = document.getElementById("stats");
      currentPokemon = pokemon;
      namePokemon.innerHTML = `<p>Nome: ${pokemon.name}</p>`;
      weigthPokemon.innerHTML = `<p>Peso: ${pokemon.weight} kg</p>`;
      heightPokemon.innerHTML = `<p>Altezza: ${pokemon.height} m</p>`;
      imagePokemon.innerHTML = `<img src='${pokemon.sprites.front_default}' alt='${pokemon.name}'/>`;
      statsPokemon.innerHTML = `<ul>
      <li><p>${pokemon.stats[0].stat.name}</p><progress value='${pokemon.stats[0].base_stat}' max=100></progress></li>
      <li><p>${pokemon.stats[1].stat.name}</p><progress value='${pokemon.stats[1].base_stat}' max=100></progress></li>
      <li><p>${pokemon.stats[2].stat.name}</p><progress value='${pokemon.stats[2].base_stat}' max=100></progress></li>
      <li><p>${pokemon.stats[3].stat.name}</p><progress value='${pokemon.stats[3].base_stat}' max=100></progress></li>
      <li><p>${pokemon.stats[4].stat.name}</p><progress value='${pokemon.stats[4].base_stat}' max=100></progress></li>
      <li><p>${pokemon.stats[5].stat.name}</p><progress value='${pokemon.stats[5].base_stat}' max=100></progress></li>
      </ul>`;
      addPokemon.classList.remove("hidden");
    });

  inputPokemonNAme.value = "";
}
function changeShiny() {
  console.log("shiny");
}
addPokemon.addEventListener("click", addToPokedex);
function addToPokedex() {
  if (personalPokedex.length < 10) {
    personalPokedex.push(currentPokemon);
    currentDisplayedPokemon = currentPokemon;
    renderPokedex();
  } else {
    window.alert(
      "Ci sono già dieci pokemon nel tuo Team, non abbiamo più spazio ! Decidi chi vuoi liberare"
    );
  }
}
function renderPokedex() {
  let pokedexList = "";

  for (i = 0; i < personalPokedex.length; i++) {
    pokedexList += `<li><img src='${personalPokedex[i].sprites.front_default}'/><h3>${personalPokedex[i].name} </h3><div class='box_button'><button class='show' onclick="showPokemon(${i})">Mostra</button> <button class='delete' onclick="removePokemon(${i})">Libera</button></div></li>`;
  }
  textTeam.classList.remove("hidden");
  myPokedex.innerHTML = pokedexList; // Assegna la lista al Pokedex
}

function showPokemon(index) {
  const selectedPokemon = personalPokedex[index];
  const namePokemon = document.getElementById("name");
  const weigthPokemon = document.getElementById("weight");
  const heightPokemon = document.getElementById("height");
  const imagePokemon = document.getElementById("image");
  const statsPokemon = document.getElementById("stats");

  namePokemon.innerHTML = `<p>Nome: ${selectedPokemon.name}</p>`;
  weigthPokemon.innerHTML = `<p>Peso: ${selectedPokemon.weight} kg</p>`;
  heightPokemon.innerHTML = `<p>Altezza: ${selectedPokemon.height} m</p>`;
  imagePokemon.innerHTML = `<img src='${selectedPokemon.sprites.front_default}' alt='${selectedPokemon.name}'/>`;
  statsPokemon.innerHTML = `<ul>
      <li><p>${selectedPokemon.stats[0].stat.name}</p><progress value='${selectedPokemon.stats[0].base_stat}' max=100></progress></li>
      <li><p>${selectedPokemon.stats[1].stat.name}</p><progress value='${selectedPokemon.stats[1].base_stat}' max=100></progress></li>
      <li><p>${selectedPokemon.stats[2].stat.name}</p><progress value='${selectedPokemon.stats[2].base_stat}' max=100></progress></li>
      <li><p>${selectedPokemon.stats[3].stat.name}</p><progress value='${selectedPokemon.stats[3].base_stat}' max=100></progress></li>
      <li><p>${selectedPokemon.stats[4].stat.name}</p><progress value='${selectedPokemon.stats[4].base_stat}' max=100></progress></li>
      <li><p>${selectedPokemon.stats[5].stat.name}</p><progress value='${selectedPokemon.stats[5].base_stat}' max=100></progress></li>
    </ul>`;

}

function removePokemon(index) {
  personalPokedex.splice(index, 1); // Rimuovi il Pokémon con l'indice specificato
  renderPokedex(); // Aggiorna il Pokedex dopo la rimozione
}
