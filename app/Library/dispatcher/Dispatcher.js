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

/**
 * 
 */

function complete(state, action) {
    //改成异步
    var changed = Persist.persist(action.persist, state);

    let result = {
        state,
        changed,
        key: action.key,
    }
    Observer.next(result);
}

function dispatch(key: string, payload: any) {
    var action = Action.getAction(key);
    return Provider.provide(action,payload).then(function(args){
        return Action.exec(action.controller,args);
    }).then(function(a){
        Observer.next(a)
    })
}
export default {
    dispatch,
}