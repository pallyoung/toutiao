'use strict'

import error from './../error';
import util from './../util';

var {
    then
} = util;
var errorHandle = error.handle;


/**
 * 
 * 
 * @param {any} controller 
 * @param {any} args
 */
function exec(controller, args) {
    let state = controller.apply(null, args);
    return then(state);
}

function runAction(controller, args) {
    //捕获所有异常
    try {
       return exec(controller, args) 
        .then((state)=>{
            return state;
        })
        .catch(e=>errorHandle(e));
    } catch (e) {
        errorHandle(e);
    }
}

export default runAction;