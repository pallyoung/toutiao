import Dispatcher from './../dispatcher';
import TargetSet from './TargetSet' ;
import Action from './../action'
import logger from './../logger';

function middleWare(exec){
    return function(action,payload){
        var target = payload.target||null;
        return exec(action,payload.payload||payload)
            .then(function(result){
                result.target = target;
                return result;
            });
    }
}
Action.applyMiddleWare(logger)

Action.applyMiddleWare(middleWare)

export default {
    dispatch:Dispatcher.dispatch
}