import action from './action';
import Dispatcher from './dispatcher';
import error from './error';
import provider from './provider';

var applyMiddleWare = action.applyMiddleWare;



module.exports =  {
    dispath:Dispatcher.dispatch,
    createActions:action.createActions,
    applyMiddleWare,
    injectProvider:provider.inject,
    useProvider:provider.use,
    setStorageTool:function(storageTool){
        //return store.setStorageTool(storageTool);
    },
    subscribe:function(callback){
        return Observer.subscribe(callback);
    },
    unsubscribe:function(callback){
        return Observer.unsubscribe(callback);
    },
    onError:error.onError
}