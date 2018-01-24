'use strict'
import Provider from './Provider';


class StorageProvider extends Provider{
    _synced:boolean;
    constructor(config){
        super(config);
    }
    get(){
        if(!this._synced){

        }
    }
    set(v){
        super.set(v);

    }
}
function setStorgaeTool(){
    
}

export default StorageProvider;