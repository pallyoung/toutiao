'use strict'
import Provider from './../provider';
import Observer from './../Observer';
import Action from './../action';
import util from './../util';

 
var id = 0;
function IDGenerator() {
    return ++id;
}

var {
    isPromise
} = util;




function getArgs(argumentList,payload){
    getArgumentList(action.controller);
    let args = [];
    /**
     * todo:需要优化
     * 处理成异步
     */
    args = Provider.provide(argumentList, payload);
    return args;
}



function dispatch(key: string, payload: any) {
    return Action.exec(key,payload).then(function(result){
        Observer.next(result);
    })
}
var id = 0;
function getDispatcher(){
    return {
        id:++id,
        dispatch:function(){
            var id = this.id;
        }
    }
}
export default {
    dispatch,
}