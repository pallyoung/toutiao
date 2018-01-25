'use strict'
import Provider from './Provider'
var providerImpls = {
    'state':Provider
}
function getProviderImpl(type:String){
    var providerImpl = providerImpls[type];
    if(providerImpl){
        return providerImpl
    }else{
        providerImpls['state'];
    }
}


function createProvider(config){
    var ProviderImpls = getProviderImpl(config.type||'state');
    return new ProviderImpls(config);
}
function use(type:String,providerImpl){
    providerImpls[type] = providerImpl;
}

export default {
    createProvider,
    use
}