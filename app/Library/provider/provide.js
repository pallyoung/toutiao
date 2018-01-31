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


function dependencyLookup(list, payload) {
    var isPayloadUsed = false;
    var args = [];
    /**
     * 需要优化
    */
    if (list) {
        args =  list.map(function (key) {
            let provider = ProviderContainer.getProvider(key);
            if (provider) {
                return then(provider.get());
            } else if (payload && !isPayloadUsed) {

                /**
                 * payload 确保只传给第一个没匹配到的
                 */
                isPayloadUsed = true;
                return then(payload);
            } else {
                return then(null);
            }
        })
    }
    return Promise.all(args);

}

function dependencyFromProvider(list){
    var args = [];
    if(list){
        args = list.map(function(item){
           try{
               return then(item.get());
           }catch(e){
               return then(item)
           }
        });
    }
    return Promise.all(args);
}

function provide(action, payload) {
    var provider = action.provider;
    var controller = action.controller;
    if (typeof provider === 'function') {
        return dependencyFromProvider(provider(payload,createProvider,getProvider));
    }else{
        return dependencyLookup(getArgumentList(controller), payload);
    }
}

export default provide;