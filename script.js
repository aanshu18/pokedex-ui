let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/`;
let pokemonImageUrl = "https://pokeres.bastionbot.org/images/pokemon/";
const pokemonCount = 250;

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};


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

    let pokeImageUrl = pokemonImageUrl + pokemon.id + ".png";

    let backgroundColorByType = colors[pokemon.types[0].type.name];
    pokeCard.style.backgroundColor = backgroundColorByType;
    let lightBackgroundImageColor = LightenDarkenColor(backgroundColorByType, 35);

    let innerHtml = `<img class="pokeImage" src=${pokeImageUrl} style="background-color:${lightBackgroundImageColor};"><div class="pokeIdContainer"><span class="pokeId">#${pokemon.id.toString().padStart(3,'0')}</div></span><h3 class="pokeText">${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</h3><h5 class="pokeType">type : ${pokemon.types[0].type.name}</h5>`;

    pokeCard.innerHTML = innerHtml;
    pokemonWindow.appendChild(pokeCard);
}

function LightenDarkenColor(col, amt) {

    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}