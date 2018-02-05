import createActions from './createActions';
import getAction from './getAction';
import runAction from './runAction';
import innerActions from './innerActions';
import error from './../error';
import Provider from './../provider';

var errorHandle = error.handle;

function complete(state, key) {
    //改成异步
    let result = {
        state,
        key,
    }

    return result;
}
function providerPersist(persist, state) {
    if (persist) {
        exports.exec(innerActions.PROVIDER_PERSIST_ACTION, { persist: persist, state });
    }
    return state;
}

function exec(key, payload) {
    var action = getAction(key);
    //捕获所有异常
    return Provider.provide(action, payload)
        .then(args => runAction(action.controller, args))
        .then(state => providerPersist(action.persist, state))
        .then(state => complete(state, action.key))
        .catch(e => errorHandle(e));
}

function applyMiddleWare(middleWare) {
    exports.exec = middleWare(exports.exec);
}


var exports = {
    createActions,
    getAction,
    exec: exec,
    applyMiddleWare,
    PROVIDER_CHANGE_ACTION: innerActions.PROVIDER_CHANGE_ACTION
}
createActions(innerActions.actions);


export default exports;