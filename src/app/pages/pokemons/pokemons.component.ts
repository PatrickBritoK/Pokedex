import { Component, OnInit  } from '@angular/core';
import { Pokemon } from '../Interfaces/PokemonInterface';
import { PokemonDetails } from '../Interfaces/PokemonInterface';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredList: Pokemon[] = [];
  selectedPokemonDetails: PokemonDetails | null = null;
  searchQuery: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ results: Pokemon[] }>('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .subscribe(data => {
        this.pokemonList = data.results;
        this.filteredList = data.results;
      });
  }

  search(): void {
    if (!this.searchQuery) {
      this.filteredList = this.pokemonList;
    } else {
      this.filteredList = this.pokemonList.filter(pokemon => pokemon.name.includes(this.searchQuery));
    }
  }
  

  selectPokemon(pokemon: Pokemon): void {
    this.http.get<PokemonDetails>(pokemon.url)
      .subscribe(data => {
        const abilities = data.abilities.map(ability => ({ ability: { name: ability.ability.name } }));
        const types = data.types.map(type => ({ type: { name: type.type.name } }));
        
        this.selectedPokemonDetails = {
          name: data.name,
          height: data.height,
          abilities: abilities,
          types: types,
          sprites: data.sprites,
        };
      });
  }
  
  }
  


