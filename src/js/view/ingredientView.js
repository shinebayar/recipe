import { element } from './base';

export const renderIngredient = perIngredient =>{
    let html = `
        <li class="shopping__item">
            <div class="shopping__count">
                <input type="number" value="500" step="100">
                <p>g</p>
            </div>
            <p class="shopping__description">${perIngredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    element.shoppingList.insertAdjacentHTML('afterbegin', html);
}

export const clearIngredient = () =>{
    element.shoppingList.innerHTML = '';
}