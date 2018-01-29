'use strict'

import error from './../error';
import util from './../util';
import Provider from './../provider';
import getActions from './getActions';

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
/**
 * 
 */

function complete(state, action) {
    //改成异步
    var changed = Provider.persist(action.persist, state);
    let result = {
        state,
        changed,
        key: action.key,
    }
    return result;
}

function runAction(key, payload) {
    var action = getActions(key);
    //捕获所有异常
    try {
        return Provider.provide(action, payload)
            .then(function (args) {
                var controller = action.controller;
                return exec(controller, args)
            })
            .then((state) => {
                return complete(state, action);
            })
            .catch(e => errorHandle(e));
    } catch (e) {
        errorHandle(e);
    }
}

export default runAction;