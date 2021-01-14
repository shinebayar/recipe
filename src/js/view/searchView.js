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

export const clearSearchInput = () => {
    element.searchInput.value = '';
}

export const clearSearchResult = () => {
    element.searchResultList.innerHTML = '';
    element.pageButtons.innerHTML = '';
}

export const getInput = () => element.searchInput.value;

// type ===> next, prev
// direction ===> left, right
const createPageBtn = (page, type, direction) => `
    <button class="btn-inline results__btn--${type}" data-goto="${page}">
        <span>Хуудас ${page}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>
    </button>
`;

const renderPagination = (currentPage, totalPages) => {
    let btnHTML;
    if(currentPage === 1 && totalPages > 1){
        // It is on first page, then show next page
        btnHTML = createPageBtn(2, 'next', 'right');
    }else if(currentPage < totalPages  ){
        // It is on middle page, then show next and previos pages
        btnHTML = createPageBtn(currentPage-1, 'prev', 'left');
        btnHTML += createPageBtn(currentPage+1, 'next', 'right');
    }else if(currentPage === totalPages){
        // It is on last page, then show previos page
        btnHTML = createPageBtn(currentPage-1, 'prev', 'left');
    }
    element.pageButtons.insertAdjacentHTML('afterbegin', btnHTML);
}

export const renderRecipes = (recipes, currentPage=1, resPerPage=10) => {
    // 1. render result for per page
    const start = (currentPage -1) * resPerPage;
    const end = currentPage * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    // 2. show pagination
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderPagination(currentPage, totalPages);
}