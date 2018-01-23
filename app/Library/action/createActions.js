'use strict'
import ActionVendor from './ActionVendor';

type actionConfig = {
    key: string,
    provider?:Array,
    persist?:Array,
    controller?:Function

}
function createAction(config: actionConfig, controller) {
   /**
    * todo:需要优化
    */
    config.controller = config.controller || controller;
    if (typeof config.controller !== 'function') {
        throw new Error('illegal controller,the type of controller must be function,but got '+(typeof config.controller));
    }
    ActionVendor.putActionByKey(config.key, config);
}

function createActions(config){
    if(Array.isArray(config)){
        config.forEach(createAction);
    }else{
        createAction(config);
    }
}
export default createActions;