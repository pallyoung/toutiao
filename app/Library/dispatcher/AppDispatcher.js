'use strict'
import Provider from './../provider';
import Persist from './../persist';
import action from './../action';
import Observer from './../Observer';

import util from './../util';

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
        RegExp.$1.split(',').forEach((arg)=>{
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
function runActions(actions, payload, id) {
    if (actions) {
        actions.forEach(function (action) {
            setTimeout(() => {
                try {
                    exec(action, payload, id)
                } catch (e) {
                    console.log(e)
                }
            }, 0)
        });
    }

}

function dispatch(key: string, payload: any) {
    try {
        var id = IDGenerator();
        var actions = action.getActions(key);
        runActions(actions, payload, id);
        return id;
    } catch (e) {
        //
        console.error(e);
    }
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
    providerList = Provider.provide(argumentList,payload);
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
function interceptor() {

}
export default {
    dispatch,
}