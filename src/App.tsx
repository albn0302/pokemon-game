import { useState, useEffect } from "react";
import GetPokemon from "./components/GetPokemon";
import { Pokemon } from "./components/GetPokemon";
import ModalOpen from "./components/ModalOpen";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [visible, setVisible] = useState<boolean>(false);
  const random = Math.floor(Math.random() * 1017);
  const [showModal, setShowModal] = useState<boolean>(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  async function fetchPokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
    const data = await res.json();
    console.log(data);
    setPokemon(data);
  }

  function ifCatched(exp: number) {
    const chance = Math.random();
    const catched = -0.0010909 * exp + 0.54909;
    return chance <= catched;
  }

  async function handleDb() {
    const res = await fetch("http://localhost:3000/api/pokemon", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: pokemon.name, id: pokemon.id }),
    });

    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="image">
      <GetPokemon data={pokemon} />
      <div className="flex justify-center items-center text-center">
        <button
          onClick={() =>
            setVisible(ifCatched(parseFloat(pokemon.base_experience)))
          }
          className="bg-red-600 px-6 py-2 border-b-2 border-red-700 rounded-md shadow-md"
        >
          Throw Ball!
        </button>
        {visible ? (
          <div className="bg-red-600 px-6 py-2 border-b-2 border-red-700 rounded-md shadow-md">
            <div>
              <button type="button" onClick={toggleModal}>
                Catch!
              </button>
              <ModalOpen open={showModal} onClose={toggleModal}>
                <div>
                  <button
                    onClick={() => {
                      handleDb();
                    }}
                  >
                    Catch this Pokemon!
                  </button>
                </div>
              </ModalOpen>
            </div>
          </div>
        ) : (
          <div className="bg-red-600 px-6 py-2 border-b-2 border-red-700 rounded-md shadow-md">
            Missed!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
