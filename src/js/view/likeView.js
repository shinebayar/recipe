import { element } from "./base";

export const toggleLikeIcon = isLiked =>{
    const tagExt = isLiked ? '' : '-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#icon-heart${tagExt}`);
}

export const toggleLikeMenu = number =>{
    element.likeMenu.style.visibility = number === 0 ? 'hidden' : 'visible';
}

export const renderLike = newLike =>{
    let html = `
        <li>
            <a class="likes__link" href="#${newLike.id}">
                <figure class="likes__fig">
                    <img src="${newLike.image}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${newLike.title}</h4>
                    <p class="likes__author">${newLike.publisher}</p>
                </div>
            </a>
        </li>
    `;
    element.likeList.insertAdjacentHTML('beforeend', html);
}

export const unrenderLike = id =>{
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    el.parentElement.removeChild(el);
    console.log(el);        
}