import React, { useState, useEffect } from "react";
import axios from "axios";
import bossImage from "./img/boss.png";
import "./css/App.css";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonNames = [
          "darkrai",
          "lucario",
          "garchomp",
          "empoleon",
          "cinderace",
          "incineroar",
          "decidueye",
          "greninja",
          "charizard",
          "mewtwo",
        ];

        const pokemonDataPromises = pokemonNames.map(async (pokeName) => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokeName}`
          );
          return response.data;
        });

        const resolvedPokemonData = await Promise.all(pokemonDataPromises);
        setPokemonData(resolvedPokemonData);
      } catch (error) {
        console.error("Error Pokemon Not Found:", error);
      }
    };

    fetchPokemonData();
  }, []);

  const handlePokemonChange = (event) => {
    const selectedPokemonIndex = event.target.value;
    setSelectedPokemon(pokemonData[selectedPokemonIndex]);
  };

  return (
    <div className="body">
      <div className="head">
      <h2 >Select a Pokemon:</h2>
      <select onChange={handlePokemonChange}>
        <option value="">Choose a Pokemon</option>
        {pokemonData.map((pokemon, index) => (
          <option key={index} value={index}>
            {pokemon.name}
          </option>
        ))}
      </select>
      </div>
      

      {selectedPokemon && (
        <div>
          <div className="flex1">
            <div className="l1">
              <h2 className="pokename1">Eternatus : Level 100</h2>
            </div>
            <img className="boss" src={bossImage} alt="Boss" />
          </div>

          <div className="flex2">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${selectedPokemon.id}.png`}
              alt={selectedPokemon.name}
              className="Pokemon"
            />
            <div className="l2">
            <h2 className="pokename2">{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)} : Level 100</h2>
            </div>
          </div>

          <div className="w">
            <h4>Moves:</h4>
            <div className="move">
              {selectedPokemon.moves.slice(0, 4).map((move, index) => (
                <div className="cmove" key={index}>
                  {move.move.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
