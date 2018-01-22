'use strict'
class TargetSet{
    constructor(){
        this._set = {};
    }
    set(key,value){
        this._set[key] = value
    }
    get(key){
        var value = this._set[key];
        delete this._set[key];
        return value;
    }
}

var targetSet = new TargetSet();
export default targetSet;