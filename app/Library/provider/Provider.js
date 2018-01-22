'use strict'

import StoreManager from './../store';


function storeOrPayload(expression: string,payload) {

    let store = StoreManager[expression];
    if (store) {
        store = store.get();
        // if (propName) {
        //     return (new Function('return store.' + propName)) ()
        // } else {
        //     return store;
        // }
        return store;

    } else if(payload){
        return payload;
    }else{
        return null;
    }
}

function provide(expressionList,payload) {
    let args = [];
    if (expressionList) {
        expressionList.forEach(function (expression) {
            args.push(storeOrPayload(expression,payload));
        })
    } 
    return args;
}

export default {
    provide
}