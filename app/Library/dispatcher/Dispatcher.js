'use strict'
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
            return result;
        })
    }
}
export default {
    dispatch,
}