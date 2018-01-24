'use strict'

import util from './../util';
import ProviderContainer from './ProviderContainer';
import ProviderCreator from './ProviderCreator';


var {
    isArray,
    getArgumentList,
    then
} = util;

var {
    createProvider
} = ProviderCreator;
var {
    getProvider
} = ProviderContainer;


function argsProvider(argumentList, payload) {
    var isPayloadUsed = false;
    if (argumentList) {
        return argumentList.map(function (expression) {
            let provider = ProviderContainer.getProvider(expression);
            if (provider) {
                return provider.get();
            } else if (payload && !isPayloadUsed) {
                /**
                 * payload 确保只传给第一个没匹配到的
                 */
                isPayloadUsed = true;
                return payload;
            } else {
                return null;
            }
        })
    }
}


function provide(action, payload) {
    var provider = action.provider;
    var controller = action.controller;

    if (typeof provider === 'function') {
        return then(provider(payload,createProvider,getProvider));
    }else{
        return then(argsProvider(getArgumentList(controller), payload));
    }
}


export default provide;