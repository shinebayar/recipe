import Search from './model/Search'
import {element} from './view/base'
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
        // 4. to execute search
        await state.search.doSearch();
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

