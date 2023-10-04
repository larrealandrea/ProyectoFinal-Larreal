Swal.fire({
    title: 'Bienvenido a nuestra pokedex',
    width: 600,
    padding: '3em',
    color: 'black',
    background: '#eee url(https://sweetalert2.github.io/#examplesimages/trees.png)',
    backdrop: `
      rgba(117, 116, 114, 0.4)
      url("https://sweetalert2.github.io/#examplesimages/nyan-cat.gif")
      left top
      no-repeat
    `
  })


let pokemonSeleccionado = {}

function mostrarPokemon(){

    let nombrePokemon = document.getElementById("nombrePokemon")
    let numeroPokemon = document.getElementById("numeroPokemon")
    let tipoPokemon = document.getElementById("tipoPokemon")
    let alturaPokemon = document.getElementById("alturaPokemon")
    let pesoPokemon = document.getElementById ("pesoPokemon")
    let pokemonImage = document.getElementById ("pokemonImage")


    tipoPokemon.innerHTML = ""

    nombrePokemon.innerHTML = pokemonSeleccionado.name
    numeroPokemon.innerHTML = `Id Pokemon:${pokemonSeleccionado.id}`
    alturaPokemon.innerHTML = `Height: ${pokemonSeleccionado.height}`
    pesoPokemon.innerHTML = `Weight: ${pokemonSeleccionado.weight}`

    pokemonImage.setAttribute("src", pokemonSeleccionado.sprites.other.dream_world.front_default)

    pokemonSeleccionado.types.forEach (tipo =>{
        let tipoTag = document.createElement("div")
        tipoTag.innerHTML = tipo.type.name
       
        tipoTag.classList.add('pokemon-tipo-tag', tipo.type.name)
        tipoPokemon.append (tipoTag)
    })

}


fetch ("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150")

        .then( response => response.json())
        .then (data =>{
            console.log (data)

            let listaNombres = document.getElementById("listaNombres")

            data.results.forEach(pokemon => { 

                let item = document.createElement("li")
                item.classList.add("listaPokebola")
                item.innerHTML = pokemon.name
                item.addEventListener("click", () =>{

                    fetch(pokemon.url)
                        .then(response => response.json())
                        .then(resJson => pokemonSeleccionado = resJson)
                        .then(mostrarPokemon)
                } )


                listaNombres.append(item)

        

            });
        })
