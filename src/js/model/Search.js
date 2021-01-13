require('@babel/polyfill');
import axios from 'axios'

export default class Search{
    constructor(query){
        this.query = query;
    }

    async doSearch(){
        try{
            const result = await axios("https://forkify-api.herokuapp.com/api/search?q=" + this.query);
            console.log("end bnuuu");
            console.log(result.data.recipes);
        }catch( error ){
            alert('Err: ' + error);
        }
    }
}