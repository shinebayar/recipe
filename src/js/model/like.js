export default class Like{
    constructor(){
        this.readFromLocalStorage();
        if (!this.likes) this.likes = [];
    }

    addLike(id, title, publisher, image){
        const likedItem = { id, title, publisher, image };
        this.likes.push(likedItem);

        // save to localStorage
        this.saveDataToLocalStorage();

        return likedItem;
    }

    isLiked(id){
        return this.likes.findIndex(el=> el.id === id) !== -1;
    }

    deleteLike(id){
        const foundIndex = this.likes.findIndex(el=> el.id === id);
        this.likes.splice(foundIndex,1);

        // override save to localStorage
        this.saveDataToLocalStorage();
    }

    getNumberOfLikes(){
        return this.likes.length;
    }

    saveDataToLocalStorage(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readFromLocalStorage(){
        this.likes = JSON.parse( localStorage.getItem('likes') );
    }
}