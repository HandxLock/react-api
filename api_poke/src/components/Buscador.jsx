/* eslint-disable react/prop-types */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import  { useState } from "react";
function Buscador({ topAttackPokemon, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundPokemon, setFoundPokemon] = useState(null);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleSearch = () => {
    const found = topAttackPokemon.find(
      (pokemon) => pokemon.name.toLowerCase() === searchTerm
    );
    if (found) {
      setFoundPokemon(found);
      onSearch(found);
    } else {
      setFoundPokemon(null);
    }
  }
  return (
    <div className="buscador">
      <h2>Buscar Pokémon por nombre</h2>
      <Form.Control
        type="text"
        placeholder="Nombre del Pokémon"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button variant="outline-success" onClick={handleSearch}>
        Buscar
      </Button>
      {foundPokemon && (
        <div >
          <Card style={{ width: "18rem", margin:"20px auto"}}>
            <Card.Img variant="top" src={foundPokemon.image} alt={foundPokemon.name} />
            <Card.Body>
              <Card.Title>
                <h7>{foundPokemon.name.toUpperCase()}</h7>
              </Card.Title>
              <Card.Text>
                <p>Ataque: {foundPokemon.attack}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Buscador;
