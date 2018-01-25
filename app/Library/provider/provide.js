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
    var args = [];
    if (argumentList) {
        args =  argumentList.map(function (expression) {
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
    return args;

}


function provide(action, payload) {
    var provider = action.provider;
    var controller = action.controller;
    if (typeof provider === 'function') {
        return then(provider(payload,createProvider,getProvider));
    }else{
        try{
        var args = argsProvider(getArgumentList(controller), payload);
        
        console.log(args,1111)
        return then(args);
    }catch(e){
        console.log(e)
    }
    }
}


export default provide;