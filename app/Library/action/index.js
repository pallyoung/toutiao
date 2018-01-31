import createActions from './createActions';
import getAction from './getAction';
import runAction from './runAction';
import innerActions from './innerActions';
import error from './../error';

var errorHandle = error.handle;
function complete(state, action) {
    //改成异步
    if (action.persist) {
        exports.exec(innerActions.PROVIDER_PERSIST_ACTION, { persist: action.persist, state });
    }
    let result = {
        state,
        key: action.key,
    }
    return result;
}

function exec(key, payload) {
    var action = getActions(key);
    //捕获所有异常
    return (
        Provider.provide(action, payload)
            .then(function (args) {
                return exec(action.controller, args)
            })
            .then((state) => {
                return complete(state, action);
            })
            .catch(e => errorHandle(e))
    );
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