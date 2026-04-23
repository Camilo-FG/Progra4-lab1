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

        const nombresIntentar = [nombre.toLowerCase().trim()];
        if (!nombresIntentar[0].includes('-')) {
            nombresIntentar.push(nombresIntentar[0] + '-altered');
            nombresIntentar.push(nombresIntentar[0] + '-normal');
        }

        for (const nombreIntentar of nombresIntentar) {
            try {
                setError('');
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${nombreIntentar}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setPokemon(data);
                    return;
                }
            } catch (error) {
                console.error('Error al buscar Pokemon:', error);
            }
        }

        setPokemon(null);
        setError('No se encontró ese Pokémon. Revisa el nombre o intenta con variaciones como "-altered".');
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
                    <p><strong>ID:</strong> {pokemon.id}</p>
                    <p><strong>Altura:</strong> {pokemon.height}</p>
                    <p><strong>Peso:</strong> {pokemon.weight}</p>
                    <p><strong>Experiencia base:</strong> {pokemon.base_experience}</p>
                    <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
                    <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                    <h3>Estadísticas:</h3>
                    <ul>
                        {pokemon.stats.map(stat => (
                            <li key={stat.stat.name}><strong>{stat.stat.name}:</strong> {stat.base_stat}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}