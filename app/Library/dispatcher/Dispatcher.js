'use strict'
import Action from './../action';
import util from './../util';


var {
    isPromise
} = util;



function dispatch(key: string, payload: any) {
    return Action.exec(key, payload)
}
export default {
    dispatch,
}