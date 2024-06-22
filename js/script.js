// Capturar el botón y el select de los pokémon.
// Realizar el fetch a la API.
// Manipular el DOM y mostrar la información que necesito.

document.addEventListener('DOMContentLoaded', () => {
    const pokemonSelect = document.getElementById('pokemon-select');
    const obtainInformation = document.getElementById('get-pokemon');

    obtainInformation.addEventListener('click', () => {
        const selectedPokemon = pokemonSelect.value;
        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fallo en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                const container = document.querySelector('.container');
                const existingInfo = document.querySelector('.pokemon-info');
                if (existingInfo) {
                    existingInfo.remove();
                }
                
                const pokemonInfo = document.createElement('div');
                pokemonInfo.classList.add('pokemon-info');

                const name = document.createElement('h2');
                name.textContent = `Nombre: ${data.name}`;
                pokemonInfo.appendChild(name);

                const image = document.createElement('img');
                image.src = data.sprites.front_default;
                image.alt = data.name;
                pokemonInfo.appendChild(image);

                const height = document.createElement('p');
                height.textContent = `Altura: ${data.height}`;
                pokemonInfo.appendChild(height);

                const weight = document.createElement('p');
                weight.textContent = `Peso: ${data.weight}`;
                pokemonInfo.appendChild(weight);

                const types = document.createElement('p');
                types.textContent = `Tipos: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
                pokemonInfo.appendChild(types);

                container.appendChild(pokemonInfo);
            })
            .catch(error => console.error('Error en la operación requerida', error));
    });
});
