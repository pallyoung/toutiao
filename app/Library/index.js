import action from './action';
import dispatcher from './dispatcher';
import store from './store';
import Observer from './Observer'

module.exports =  {
    dispath:dispatcher.dispatch,
    createActions:action.createActions,
    createStore:function(config,complete){
        return store.create(config,complete)
    },
    setStorageTool:function(storageTool){
        return store.setStorageTool(storageTool);
    },
    Observer

}