import Search from './model/Search';
import Recipe from './model/Recipe';
import {element, createLoader, clearLoader} from './view/base';
import * as searchView from './view/searchView';
import { renderRecipe, clearRecipe, highlightClickedRecipe } from './view/recipeView';

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
    renderRecipe(state.recipe);
}
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);