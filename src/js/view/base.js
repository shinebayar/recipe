export const element = {
    searchForm : document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchResultDiv: document.querySelector('.results'),
    pageButtons: document.querySelector('.results__pages'),
    recipeDiv: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
}

export const elementStrings = {
    loader: 'loader'
}

export const createLoader = divName =>{
    let html = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    divName.insertAdjacentHTML('afterbegin', html);
}

export const clearLoader = () =>{
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}