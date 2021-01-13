import { element } from "./base";

// private function
const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    // insert into <li> tag
    element.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearchInput = () =>{
    element.searchInput.value = '';
}
export const clearSearchResult = () =>{
    element.searchResultList.innerHTML = '';
}
export const getInput = () => element.searchInput.value;
export const renderRecipes = recipes => {
    // recipes.forEach(el => renderRecipe(el));
    recipes.forEach(renderRecipe);
}