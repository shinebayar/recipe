import {nanoid} from 'nanoid'

export default class Ingredient{
    constructor(){
        this.ingredients = [];
    }

    addIngredients(ingredient){
        const newIngredient = {
            id: nanoid(),
            item: ingredient
        }

        this.ingredients.push(newIngredient);

        return newIngredient;
    }

    deleteIngredient(id){
        let foundIndex = this.ingredients.findIndex(el => el.id === id);
        this.ingredients.splice(foundIndex, 1);
    }
}