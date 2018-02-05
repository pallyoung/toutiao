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




function dispatch(key: string, payload: any) {
    var id = IDGenerator();

    Action.exec(key, payload).then((result) => Observer.next(result));
    return id;
}
export default {
    dispatch,
}