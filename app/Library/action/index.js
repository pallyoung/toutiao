import createActions from './createActions';
import getAction from './getActions';
import runAction from './runAction';
import innerActions from './innerActions';

var exports = {
    createActions,
    getAction,
    exec:runAction,
    applyMiddleWare,
    PROVIDER_CHANGE_ACTION:innerActions.PROVIDER_CHANGE_ACTION
}

createActions(innerActions.actions);

function applyMiddleWare(middleWare){
    exports.exec = middleWare(exports.exec);
}


export default exports;