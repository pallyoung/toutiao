'use strict'

import util from './../util';

var {
    copy
} = util;
var container = {

}
function getProvider(name){
    return container[name];
}
function setProvider(name,provider){
    container[name] = provider;
}

export default {
    setProvider,
    getProvider
}