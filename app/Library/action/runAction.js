'use strict'

import util from './../util';

var {
    then
} = util;


/**
 * 
 * 
 * @param {any} controller 
 * @param {any} args
 */
function runAction(controller, args) {
    let state = controller.apply(null, args);
    return then(state);
}
export default runAction;