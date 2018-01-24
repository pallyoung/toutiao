import createActions from './createActions';
import getAction from './getActions';
import runAction from './runAction';

var exports = {
    createActions,
    getAction,
    exec:runAction,
    applyMiddleWare
}
function applyMiddleWare(middleWare){
    exports.exec = middleWare(exports.exec);
}


export default exports;