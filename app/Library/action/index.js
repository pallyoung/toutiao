import createActions from './createActions';
import getAction from './getAction';
import runAction from './runAction';
import innerActions from './innerActions';
import error from './../error';
import Provider from './../provider';
import Observer from './../Observer';


var errorHandle = error.handle;

var run = function (action, payload) {
    return Provider.provide(action, payload)
        .then(args => runAction(action.controller, args))
        .then(state => setResult(state, action.key))
}

var id = 0;

function IDGenerator() {
    return ++id;
}

function providerPersist(persist, state) {
    if (persist) {
        exec(innerActions.PROVIDER_PERSIST_ACTION, { persist: persist, state });
    }
    return state;
}


function setResult(state, key) {
    let result = {
        state,
        key,
    }
    return result;
}

function pushToObserver(result) {
    Observer.next(result);
    return result;
}
function exec(key, payload) {
    var action = getAction(key);
    var id = IDGenerator();

    //捕获所有异常
    run(action, payload)
        .then(result => pushToObserver(result))
        .then((result) => providerPersist(action.persist, result.state))
        .catch(e => errorHandle(e))

    return id;
}

function applyMiddleWare(middleWare) {
    run = middleWare(run);
}


var exports = {
    createActions,
    getAction,
    exec: exec,
    applyMiddleWare,
    PROVIDER_PERSIST_ACTION: innerActions.PROVIDER_PERSIST_ACTION
}
createActions(innerActions.actions);


export default exports;