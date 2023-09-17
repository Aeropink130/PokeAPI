/* 

con este script me conectaré a la pokeapi y obtendré los datos de los pokemones para mostrarlos en cards en el index.html usando bootstrap y fech api, el pokemon sera traído de manera aleatoria por su id, el cual se genera con la función Math.random() y se redondea con Math.floor() para que sea un numero entero de entre el 1 y 1010, el cual se le asigna a la variable idPokemon, la cual se concatena con la url de la pokeapi para traer los datos del pokemon, los cuales se muestran en el html con la función mostrarPokemon().

*/

// variables globales

const boton = document.getElementById("boton-pokemon");
let contenedorTarjetas = document.getElementById("contenedor-tarjetas");

boton.addEventListener("click", (e) => {
  e.preventDefault();
  traerPokemon();
});

function mostrarPokemon(data) {
  //necesitamos aguardar los tipos de pokemon en un array
  let tipos = [];
  data.types.forEach((type) => tipos.push(type.type.name));

  let tarjeta = document.createElement("div");
  tarjeta.className = "col-sm-12 col-md-6 col-lg-3 col-xl-3";
  tarjeta.innerHTML = `
    <div class="card">
  <img src="${data.sprites.front_default}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">id: ${data.id}</li>
    <li class="list-group-item">tipo: ${tipos}</li>
    <li class="list-group-item">Peso: ${data.weight}</li>
  </ul>
</div>
    `
  //agregamos la tarjeta al contenedor de tarjetas sin borrar las que ya estan una al lado de la otra
  contenedorTarjetas.appendChild(tarjeta);
}

function traerPokemon() {
  let idPokemon = Math.floor(Math.random() * 1010);
  fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    .then((res) => res.json())
    .then((data) => {
      mostrarPokemon(data);
    })
    .catch((error) => console.log(error));
}

