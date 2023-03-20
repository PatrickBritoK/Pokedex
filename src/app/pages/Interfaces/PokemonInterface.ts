export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  height: number;
  types: Array <{type : { name:string}}>;
  abilities: Array<{ ability: { name: string } }>;
  sprites: Array<{front_default: string }>;
  
}
