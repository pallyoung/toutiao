'use strict'


import StoreManager from './../store';


function persist(kv,state){
    if(!kv){
        return [];
    }
    var changed = [];
    for(let k in kv){
        let v = state[k];

        if(v){
            let storeName = kv[k];
            if(storeName&&StoreManager[storeName]){
                let store = StoreManager[storeName];
                store.set(v);
                changed.push(storeName);
            }
        }
        
    }
        
}

export default {
    persist
}