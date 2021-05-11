let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/`;
let pokemonImageUrl = "https://pokeres.bastionbot.org/images/pokemon/";
const pokemonCount = 210;

let pokemonWindow = document.getElementById("poke-id");

async function getPokemon(id) {

    let pokemonResponse = await fetch(pokemonUrl + id);
    let pokemonJson = await pokemonResponse.json();

    return pokemonJson;
}

getAllPokemon();

async function getAllPokemon() {
    for (let i = 1; i <= pokemonCount; i++) {
        let pokemon = await getPokemon(i);
        console.log(pokemon);
        console.log(pokemon.name.toUpperCase());
        createPokemonCard(pokemon);
    }
}

function createPokemonCard(pokemon) {

    let pokeCard = document.createElement('div');
    pokeCard.className = "pokeClass";
    let innerHtml = `${pokemon.name.toUpperCase()}`;
    pokeCard.innerHTML = innerHtml;
    let pokeData = document.createElement('div');
    pokeData.className = "pokeText";
    pokeData.innerHTML = pokemon.id;
    pokeCard.appendChild(pokeData);
    pokemonWindow.appendChild(pokeCard);
}