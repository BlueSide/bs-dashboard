import { Component } from "@angular/core";
import { DataComponent, DataSet, DataType } from "./DataComponent";

@Component({
    selector: 'pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})

export class PokemonComponent extends DataComponent
{
    private name: string;
    private types: any[];
    private abilities: any[];
    private moves: string[];
    private imageSrc: string;
    
    constructor()
    {
        super();

        let pokemonId = Math.floor((Math.random() * 150) + 1);
        
        let dataSet1 = {
            type: DataType.POKEMON,
            resource: "http://pokeapi.co/api/v2/pokemon/" + pokemonId,
            query: "http://pokeapi.co/api/v2/pokemon/" + pokemonId
        };

        this.addDataSet(dataSet1);
    }

    protected onUpdate(dataSet: DataSet)
    {
        console.log(dataSet);
        this.name = dataSet.data.name;
        this.types = dataSet.data.types;
        this.abilities = dataSet.data.abilities;
        this.imageSrc = dataSet.data.sprites.front_default;
    }
   
}
