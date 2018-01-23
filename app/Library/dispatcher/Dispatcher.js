'use strict'
import Provider from './../provider';
import Persist from './../persist';
import Action from './../action';
import Observer from './../Observer';
import error from './../error';

import util from './../util';

var errorHandle = error.handle;

var id = 0;
function IDGenerator() {
    return ++id;
}

var {
    isPromise
} = util;
function getArgumentList(func): Array {
    var argsRegExp = /function\s*\w*\(([\s\S]*?)\)/g;
    if (argsRegExp.test(func.toString())) {
        /**
         * todo:可能有bug
         */
        let args = [];
        RegExp.$1.split(',').forEach((arg) => {
            args.push(arg.replace(/\s/g, ''));
        })
        return args;
    }
    return [];
}

function checkArguments(argumentsLength, providerLength, payload) {
    if (payload) {
        return argumentsLength === providerLength + 1;
    } else {
        return argumentsLength === providerLength;
    }
}
function runAction(action, payload, id) {
    try {
        exec(action, payload, id)
    } catch (e) {
        errorHandle(e);
    }

}

function dispatch(key: string, payload: any) {
    var id = IDGenerator();
    var action = Action.getAction(key);
    setTimeout(() => runAction(action, payload, id));
    return id;
}
/**
 * 
 * 
 * @param {any} actions 
 * @param {any} payload 
 */
function exec(action, payload, id) {
    let args = [];
    let argumentList = getArgumentList(action.controller);
    let providerList = [];
    // argumentList.forEach(function (expression) {
    //     expression = expression.replace(/\s/g, '');
    //     if (expression === 'payload') {
    //         args.push(payload);
    //     } else {
    //         providerList.push(expression);
    //     }
    // })
    providerList = Provider.provide(argumentList, payload);
    if (providerList) {
        args = args.concat(providerList);
    }
    let state = action.controller.apply(null, args);

    /**
     * 交给Observer 或者其他中间件
     */
    if (isPromise(state)) {
        state.then((data) => {
            complete(state, action, id)
        })
    } else {
        complete(state, action, id);
    }


}
/**
 * 
 */

function complete(state, action, id) {
    var changed = Persist.persist(action.persist, state);

    let result = {
        state,
        id,
        changed,
        key: action.key,
    }
    Observer.next(result);
}
var _errorHandler = function (error) {
    if (!_userErrorHandler(error)) {
        defaultErrorHandler(error);
    }
};
//默认error处理
function defaultErrorHandler(error) {
    throw new Error(error);
}

var _userErrorHandler = function () {
    return false;
}
function onError(handler: (error: Error) => boolean) {
    _errorHanlder = handler
}
function interceptor() {

}
export default {
    dispatch,
    onError
}