import  { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Buscador from "./Buscador";

function PokemonLandingPage() {
  const [topAttackPokemon, setTopAttackPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
          {timeout:10000}
        );
        const data = await response.json();
        const pokemonList = data.results;

        // Obtener detalles de estadísticas de ataque para cada Pokémon
        const pokemonDetails = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            return {
              name: data.name,
              attack: data.stats.find((stat) => stat.stat.name === "attack")
                .base_stat,
              image: data.sprites.front_default,
            };
          })
        );
        const sortedPokemon = pokemonDetails.sort(
          (a, b) => b.attack - a.attack
        );
        setTopAttackPokemon(sortedPokemon);
        setLoading(false);
      } catch (error) {
            console.error(error);
            setTopAttackPokemon([]);
            setLoading(false);
      }
    }
    fetchPokemonData();
  }, []);
  const handleSearch = (foundPokemon) => {
    console.log("Pokémon encontrado:", foundPokemon);
  };
  return (
    <div>
      <h1>Top Pokémones con Mayor Ataque</h1>
      <Buscador topAttackPokemon={topAttackPokemon} onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {topAttackPokemon.map((pokemon, index) => (
            <div key={index}>
              <Card border="success"  style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <Card.Body>
                  <Card.Title>
                    <h7>{pokemon.name.toUpperCase()}</h7>
                  </Card.Title>
                  <Card.Text>
                    <p>
                      Ataque:{" "}
                      <span style={{ color: "red" }}>{pokemon.attack}</span>
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default PokemonLandingPage;
