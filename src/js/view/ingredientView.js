import { element } from './base';

export const renderIngredient = perIngredient =>{
    let html = `
        <li class="shopping__item" data-itemID="${perIngredient.id}">
            <p class="shopping__description">${perIngredient.item}</p>
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

export const deleteIngredient = id =>{
    const item = document.querySelector(`[data-itemid=${id}]`);
    item.parentElement.removeChild(item);
}