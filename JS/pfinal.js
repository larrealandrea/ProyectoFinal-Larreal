Swal.fire({
  title: "Bienvenido a nuestra pokedex",
  width: 600,
  padding: "3em",
  color: "black",
  background:
    "#eee url(https://sweetalert2.github.io/#examplesimages/trees.png)",
  backdrop: `
      rgba(117, 116, 114, 0.4)
      url("https://sweetalert2.github.io/#examplesimages/nyan-cat.gif")
      left top
      no-repeat
    `,
});
let loader = document.getElementById("loader");

function hideLoader() {
  loader.style.display = "none";
}

function showLoader() {
  loader.style.display = "block";
}

class Pokemon {
  constructor(pokeApi) {
    this.name = pokeApi.name;
    this.img = pokeApi.sprites.other.dream_world.front_default;
    this.id = pokeApi.id;
    this.height = pokeApi.height;
    this.weight = pokeApi.weight;
    this.types = pokeApi.types.map((t) => t.type.name);
  }
}

let pokemonSeleccionado = {};

let listaNombrePokemon = [];
let buscador = "";

let buscadorInput = document.getElementById("buscadorInput");
buscadorInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  buscador = e.target.value;
  mostrarLista();
});

showLoader();
fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
  .then((response) => response.json())
  .then((data) => {
    listaNombrePokemon = data.results;
  })
  .then(mostrarLista)
  .finally(hideLoader);

function mostrarLista() {
  let listaNombres = document.getElementById("listaNombres");
  listaNombres.innerHTML = "";
  listaNombrePokemon
    .filter((p) => !buscador || p.name.includes(buscador))
    .forEach((pokemon) => {
      let item = document.createElement("li");
      item.classList.add("listaPokebola");
      item.innerHTML = pokemon.name;
      item.addEventListener("click", () => {
        showLoader()
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((r) => new Pokemon(r))
          .then((resJson) => (pokemonSeleccionado = resJson))
          .then(mostrarPokemon)
          .finally(hideLoader)
      });

      listaNombres.append(item);
    });
}

function mostrarPokemon() {
  let nombrePokemon = document.getElementById("nombrePokemon");
  let numeroPokemon = document.getElementById("numeroPokemon");
  let tipoPokemon = document.getElementById("tipoPokemon");
  let alturaPokemon = document.getElementById("alturaPokemon");
  let pesoPokemon = document.getElementById("pesoPokemon");
  let pokemonImage = document.getElementById("pokemonImage");

  tipoPokemon.innerHTML = "";

  nombrePokemon.innerHTML = pokemonSeleccionado.name;
  numeroPokemon.innerHTML = `Id Pokemon:${pokemonSeleccionado.id}`;
  alturaPokemon.innerHTML = `Height: ${pokemonSeleccionado.height}`;
  pesoPokemon.innerHTML = `Weight: ${pokemonSeleccionado.weight}`;

  pokemonImage.setAttribute("src", pokemonSeleccionado.img);

  pokemonSeleccionado.types.forEach((tipo) => {
    let tipoTag = document.createElement("div");
    tipoTag.innerHTML = tipo;

    tipoTag.classList.add("pokemon-tipo-tag", tipo);
    tipoPokemon.append(tipoTag);
  });
}
