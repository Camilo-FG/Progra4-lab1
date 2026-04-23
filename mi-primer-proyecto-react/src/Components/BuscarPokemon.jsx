import { useState } from 'react'

export default function BuscarPokemonA() {
    const [nombre, setNombre] = useState("");
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState("");

    const buscarPokemon = async () => {
        if (!nombre.trim()) {
            setError('Escribe el nombre de un Pokémon.');
            setPokemon(null);
            return;
        }

        try {
            setError('');
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase().trim()}`
            );
            if (!response.ok) {
                throw new Error('Pokemon no encontrado');
            }
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.error('Error al buscar Pokemon:', error);
            setPokemon(null);
            setError('No se encontró ese Pokémon. Revisa el nombre.');
        }
    };

    return(
        <>
            <h1>Buscar Pokémon</h1>
            <input 
                type="text"
                placeholder="Escribe un Pokémon"
                value={nombre}
                onChange={(e) => {
                    setNombre(e.target.value);
                    setError('');
                }}
            />

            <button onClick={buscarPokemon} disabled={!nombre.trim()}>Buscar</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                </div>
            )}
        </>
    )
}