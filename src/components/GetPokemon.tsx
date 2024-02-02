import React from "react";

type Pokemon = {
  id: string;
  name: string;
  base_experience: string;
  sprites: {
    front_default: string;
  };
};

export default function GetPokemon({ data }: { data: Pokemon }) {
  if (!data.name) {
    return (
      <div className="flex justify-center items-center text-center">
        Loading...
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center items-center text-center flex-col">
        <h2 className="bg-red-600 px-6 py-2 border-b-2 border-red-700 rounded-md shadow-md">
          {data.id}
        </h2>
        <h2 className="bg-red-600 px-6 py-2 border-b-2 border-red-700 rounded-md shadow-md">
          {data.name}
        </h2>
        <h2 className="bg-red-600 px-6 py-2 border-b-2 border-red-700 rounded-md shadow-md">
          {data.base_experience}
        </h2>
        <img className="h-64 w-64 sprites" src={data.sprites.front_default} />
      </div>
    </div>
  );
}
