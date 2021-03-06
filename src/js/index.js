import Search from './model/Search';
import Recipe from './model/Recipe';
import Ingredient from './model/Ingredient';
import Like from './model/Like'
import {element, createLoader, clearLoader} from './view/base';
import * as searchView from './view/searchView';
import { renderRecipe, clearRecipe, highlightClickedRecipe } from './view/recipeView';
import * as ingredientView from './view/ingredientView';
import * as likeView from './view/likeView';

// Web app states:
//  - Search query and result
//  - Specific recipes
//  - Recipes that are liked
//  - Reserving ingredients of recipe

const state = {};

/* SEARCH CONTROLLER */
const controlSearch = async () => {
    // 1. to take keywords from web search
    const query = searchView.getInput();

    if(query) {
        // 2. to create new object of search
        state.search = new Search(query);
    
        // 3. to prepare window UI for search
        searchView.clearSearchInput();
        searchView.clearSearchResult();
        createLoader(element.searchResultDiv);
    
        // 4. to execute search
        await state.search.doSearch();
        clearLoader();
    
        // 5. to show search result on window
        if (state.search.result === undefined) alert('Хайлтанд илэрц байхгүй байна ...');
        else searchView.renderRecipes(state.search.result);
    }else{
        console.log('Own_warning: search query is false');
    }
}

element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

element.pageButtons.addEventListener('click', e => {
    let btn = e.target.closest('.btn-inline');
    if(btn){
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, parseInt(btn.dataset.goto, 10));
    }
});



/* RECIPE CONTROLLER */
const controlRecipe = async () =>{
    // 1. to split ID from URL
    const id = window.location.hash.replace('#', '');

    if(id){
        // 2. to create model of Recipe
        state.recipe = new Recipe(id);
    
        // 3. to prepare UI 
        clearRecipe();
        createLoader(element.recipeDiv);
        highlightClickedRecipe(id);
    
        // 4. to get Recipe
        await state.recipe.getRecipe();
    
        // 5. to calculate time and portion in Recipe
        state.recipe.calcTime();
        state.recipe.calcPortion();
    
        // 6. to render Recipe
        renderRecipe(state.recipe, state.likes.isLiked(id));
    }
}
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

window.addEventListener('load', e => {
    // create a model of liked ingredients when page is loaded
    if( state.likes === undefined ) state.likes = new Like();

    // to show like menu if there is a liked recipe
    likeView.toggleLikeMenu(state.likes.getNumberOfLikes());

    // to show liked list
    state.likes.likes.forEach(like => likeView.renderLike(like));
});


/* INGREDIENT CONTROLLER */
const controlIngredient = () =>{
    // 1. to create object of Ingredient model
    state.ingredient = new Ingredient;
    // window.abc = state.ingredient; // used for testing for temporary

    // to clear previos selected ingredients
    ingredientView.clearIngredient();

    // 2. to save ingredients to object of Ingredient model
    state.recipe.ingredients.forEach(el => {
        // 2.1. to insert ingredients into model
        const ingredient = state.ingredient.addIngredients(el);

        // 2.2. to render ingredients
        ingredientView.renderIngredient(ingredient);
    });
}
element.recipeDiv.addEventListener('click', e =>{
    if( e.target.matches('.recipe__btn, .recipe__btn *') ) { controlIngredient(); }
    else if( e.target.matches('.recipe__love, .recipe__love *') ){
        controlLike();
    }
});
element.shoppingList.addEventListener('click', e =>{
    const id = e.target.closest('.shopping__item').dataset.itemid;
    state.ingredient.deleteIngredient(id);
    ingredientView.deleteIngredient(id);
});

/* CONTROLLER LIKE */
const controlLike = () =>{
    // created model of like and declared at recipeControl

    // to find recipe id
    const recipeID = state.recipe.id;
    
    // check that recipe is liked
    if( state.likes.isLiked(recipeID) ){
        state.likes.deleteLike(recipeID);
        likeView.toggleLikeIcon(false);
        likeView.unrenderLike(recipeID);
    }else{
        const newLike = state.likes.addLike(recipeID, state.recipe.title, state.recipe.publisher, state.recipe.image_url);
        likeView.renderLike(newLike);
        likeView.toggleLikeIcon(true);
    }

    // hide or visible LikeMenu
    likeView.toggleLikeMenu(state.likes.getNumberOfLikes());
}