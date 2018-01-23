import action from './action';
import dispatcher from './dispatcher';
import store from './store';
import Observer from './Observer'
import error from './error';

module.exports =  {
    dispath:dispatcher.dispatch,
    createActions:action.createActions,
    createStore:function(config,complete){
        return store.create(config,complete)
    },
    setStorageTool:function(storageTool){
        return store.setStorageTool(storageTool);
    },
    Observer,
    onError:error.onError

}