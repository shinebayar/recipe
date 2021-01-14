import Search from './model/Search'
import {element, createLoader, clearLoader} from './view/base'
import * as searchView from './view/searchView'

// Web app states:
//  - Search query and result
//  - Specific recipes
//  - Recipes that are liked
//  - Reserving ingredients of recipe

const state = {};

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
