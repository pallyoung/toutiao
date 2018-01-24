import action from './action';
import dispatcher from './dispatcher';
import error from './error';
import provider from './provider';

module.exports =  {
    dispath:dispatcher.dispatch,
    createActions:action.createActions,
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