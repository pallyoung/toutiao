'use strict'

import error from './../error';
import util from './../util';


var errorHandle = error.handle;


/**
 * 
 * 
 * @param {any} controller 
 * @param {any} args
 */
function exec(controller, args) {
    let state = action.controller.apply(null, args);
    return then(state);
}

function runAction(controller, args) {
    //捕获所有异常
    try {
       return exec(action, args)
        .catch(e=>errorHandle(e))
        .then((state)=>{
            complete(state, action);
        });
    } catch (e) {
        errorHandle(e);
    }
}

export default runAction;