export default class Like{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, publisher, image){
        const likedItem = { id, title, publisher, image };
        this.likes.push(likedItem);
        return likedItem;
    }

    isLiked(id){
        return this.likes.findIndex(el=> el.id === id) !== -1;
    }

    deleteLike(id){
        const foundIndex = this.likes.findIndex(el=> el.id === id);
        this.likes.splice(foundIndex,1);
    }

    getNumberOfLikes(){
        return this.likes.length;
    }
}