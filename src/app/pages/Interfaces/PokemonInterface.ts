export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  height: number;
  abilities: Array<{ ability: { name: string } }>;
}
