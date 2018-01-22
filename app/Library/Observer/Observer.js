'use strict'

class Observer{
    constructor(){
        this._callbacks = [];
    }
    next(data){
        this._callbacks.forEach((callback)=>{
            callback(data);
        })
    }
    subscribe(callback){
        this._callbacks.push(callback);
    }
    unsubscribe(callback){
        let callbacks = this._callbacks;
        for(let i = callbacks.length-1;i>=0;i--){
            if(callbacks[i]===callback){
                callbacks.splice(i,1);
                return;
            }
        }
    }
}

let observer = new Observer();
export default observer;