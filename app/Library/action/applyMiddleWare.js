'use strict'

import runAction from './runAction';
function applyMiddleWare(middleWare){
    middleWare(runAction);
}

export default applyMiddleWare;