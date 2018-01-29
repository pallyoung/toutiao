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




function getArgs(argumentList, payload) {
    getArgumentList(action.controller);
    let args = [];
    /**
     * todo:需要优化
     * 处理成异步
     */
    args = Provider.provide(argumentList, payload);
    return args;
}


var id = 0;

const APP_DISPATCHER = id;
function dispatch(key: string, payload: any) {
    return Action.exec(key, payload).then(function (result) {
        result.id = APP_DISPATCHER;
        Observer.next(result);
    })
}
/**
 * @warning
 * 谨慎使用，可能会被删除
 */
function getDispatcher() {
    var id = ++id;
    return function () {
        return dispatch.then(function(result){
            result.id = id;
            return id;
        })
    }
}
export default {
    dispatch,
}